import { token } from "morgan";
import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";
import IDoctorUseCase, {
  DatasKYCVerificationStep1,
  DatasKYCVerificationStep2,
  DatasOfDoctorRegistration,
  RegesterResponse,
  ResponseKycFirstStep,
  VerifyResponse,
} from "../interface/useCase/IDoctorUseCase";
import { LoginResponse } from "../interface/useCase/IDoctorUseCase";
import IJwtService from "../interface/utils/IJwtService";
import ICloudinaryService from "../interface/utils/ICloudinaryService";
import IDoctorAuthRepositories from "../interface/repositories/IDoctorAuthRepositories";
import IhasingService from "../interface/utils/IHasingService";
import OtpService from "../framework/utils/otpService";
import IOtpServices from "../interface/utils/IOtpServices";
import IKyc from "../entity/kycEntity";
import IUser from "../entity/userEntity";
import { error } from "console";
import Errors from "../erros/errors";
import { StatusCode } from "../enums/statusCode";

export default class DoctorAuthUseCase implements IDoctorUseCase {
  private doctorAuthRepository: IDoctorAuthRepositories;
  private jwtServices: IJwtService;
  private cloudinaryServices: ICloudinaryService;
  private hashingServices: IhasingService;
  private OtpService: IOtpServices;

  constructor(
    doctorAuthRepository: DoctorAuthRepository,
    jwtServices: IJwtService,
    cloudinaryServices: ICloudinaryService,
    hashingServices: IhasingService,
    OtpService: IOtpServices
  ) {
    this.doctorAuthRepository = doctorAuthRepository;
    this.jwtServices = jwtServices;
    this.cloudinaryServices = cloudinaryServices;
    this.hashingServices = hashingServices;
    this.OtpService = OtpService;
  }

  async registerDoctor(
    data: DatasOfDoctorRegistration
  ): Promise<RegesterResponse> {
    try {
      let doctor = await this.doctorAuthRepository.isDoctorExists(data.email);

      if (doctor) {
        return {
          status: false,
          errMessage: "This Email is alredy used",
        };
      }

      const url = await this.cloudinaryServices.uploadImage(data.image);

      // data.password=
      data.password = await this.hashingServices.hashing(data.password);
      const storedDb = await this.doctorAuthRepository.isRegesterd(data);

      const otp = this.OtpService.generateOtp();

      await this.doctorAuthRepository.saveOtp(data.email, otp);

      await this.OtpService.sendOtpEmail(data.email, otp, data.name);

      return {
        status: true,
        message: "Otp send successesfully",
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async DoctorAuth(email: string, password: string): Promise<LoginResponse> {
    try {
      let doctor = await this.doctorAuthRepository.isDoctorExists(email);
      if (!doctor) {
        return {
          status: false,
          Err: "This Email Doctor is not found",
        };
      }
      console.log(password, doctor.password);
      const status = await this.hashingServices.compare(
        password,
        doctor.password
      );

      if (!status) {
        return {
          status: false,
          Err: "password is not match",
        };
      }

      if (!doctor.otpVerified) {
        return {
          status: false,
          message: "otp is not verified",
        };
      }

      
      if(doctor.isBlocked==true){
         throw new Errors("doctor is blocked",StatusCode.forBidden)
      }


      if (doctor.approved == false) {
        return {
          status: false,
          message: "kyc status not completed",
        };
      }



      const tokendata = {
        id:doctor._id,
        userName: doctor.name,
        role: "doctor",
      };

      let token = await this.jwtServices.createToken(tokendata);

      const doctorData = {
        id:doctor._id,
        name:doctor.name,
        image:doctor.image,
        email:doctor.email,
      };

      return {
        status: true,
        doctor: doctorData,
        message: "login succussfully",
        token: token,
      };

    } catch (error) {

      console.log(error);
      throw error

    }
  }

  async otpVerify(
    otp: string,
    email: string
  ): Promise<{ status: boolean; message: string }> {
    try {
      let otpData = await this.doctorAuthRepository.findOtpData(email);
      console.log(otpData, email);

      if (!otpData) {
        return {
          status: false,
          message: "the otp expired",
        };
      }

      if (otpData?.otp == otp) {
        let data = await this.doctorAuthRepository.updateOtpVerified(email);

        return {
          status: true,
          message: "succussfully verified",
        };
      } else {
        return {
          status: false,
          message: "password is not match",
        };
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async sendOtp(email: string): Promise<{ status: true }> {
    try {
      let otp: string = await this.OtpService.generateOtp();

      let otpData = await this.doctorAuthRepository.saveOtp(email, otp);

      await this.OtpService.sendOtpEmail(email, otp, email);

      return { status: true };
    } catch (error) {
      throw error;
    }
  }

  async handleKYCVerificationStep1(
    data: DatasKYCVerificationStep1   
  ): Promise<ResponseKycFirstStep> {
    try {
      console.log("hii helloo bro");
      if (data.email == "") {
        return {
          status: false,
          errMessage: "credientioal err",
        };
      }

      if (data.licenseNumber == "") {
        return {
          status: false,
          errMessage: "credientioal err",
        };
      }

      if (data.image == "") {
        return {
          status: false,
          errMessage: "credientioal err",
        };
      }
      console.log(data.email)
      let isDoctor = await this.doctorAuthRepository.isDoctorExists(data.email);
      console.log(isDoctor,"hiiiii");
      if (!isDoctor) {
        return {
          status: false,
          errMessage: "This email account user is not here",
        };
      }

      const url = this.cloudinaryServices.uploadImage(data.image);

      let KycData = await this.doctorAuthRepository.kycStorStep1(data);
      console.log(KycData, "kiiiiiiiiii");

      return {   
        status: true,
        message: "fist step successfully completed",
      };
    } catch (error) {
      console.log(error, "jiiiiiii");
      throw error;
    }
  }
  

  async handleKYCVerificationStep2(
    data: DatasKYCVerificationStep2
  ): Promise<ResponseKycFirstStep> {
    try {
      console.log(data.acheivemnts, "hiiii");
      const url = this.cloudinaryServices.uploadImage(data.identityCardImage);
      let response = await this.doctorAuthRepository.kycStorStep2(data);
      console.log(response, "hiiii comon gipppp");
      if (response?.appliedStatus == "applied") {
        return {
          status: true,
          message: "completed kyc Verification Step",
        };
      } else {
        return {
          status: false,
          errMessage: "not completed",
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getKycStatus(email: string): Promise<IKyc | null> {
    try {
      console.log("hii entered kyc status get");
      let data = this.doctorAuthRepository.getKycDetails(email);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string): Promise<VerifyResponse> {
    try {
      console.log("tokenstatus", token);

      if (!token) {
        return {
          status: false,
        };
      }

      let response = await this.jwtServices.verify(token);
      let doctor = await this.doctorAuthRepository.isTokenDoctorData(
        response?.id as string
      );

      if (response?.role == "doctor" && doctor) {
        let data = {
          name: doctor.name,
          email: doctor.email,
          image: doctor.image,
        };
        console.log("verified");
        return {
          status: true,
          decoded: response,
          doctorData: data,
        };
      }
      console.log("errorn");
      return {
        status: false,
      };
    } catch (error) {
      console.log("erorn", error);
      throw error;
    }
  }

  async getUserProfileData(id: string): Promise<IUser> {
      try {

        if(!id){
            throw new Errors("the id is required",StatusCode.badRequest)
        }
        
        const data=await this.doctorAuthRepository.getUserProfileData(id)
         console.log(data);
         
        if(!data){
          throw error
        }
        return data

      } catch (error) {
         throw error
      }  
  }


}
