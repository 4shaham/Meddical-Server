import { token } from "morgan";
import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";
import IDoctorUseCase, {
  DatasKYCVerificationStep1,
  DatasKYCVerificationStep2,
  DatasOfDoctorRegistration,
  RegesterResponse,
  ResponseKycFirstStep,
} from "../interface/useCase/IDoctorUseCase";
import { LoginResponse } from "../interface/useCase/IDoctorUseCase";
import IJwtService from "../interface/utils/IJwtService";
import ICloudinaryService from "../interface/utils/ICloudinaryService";
import IDoctorAuthRepositories from "../interface/repositories/IDoctorAuthRepositories";
import IhasingService from "../interface/utils/IHasingService";
import OtpService from "../framework/utils/otpService";
import IOtpServices from "../interface/utils/IOtpServices";

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

      this.OtpService.sendOtpEmail(data.email, otp, data.name);

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
          message: "this Email is Doctor is not found",
        };
      }

      if (doctor.password != password) {
        return {
          status: false,
          message: "password is not match",
        };
      }
      return {
        status: false,
        message: "password is not match",
      };

      //  if(doctor.appliedStatus == "rejected" ){
      //     return {
      //       status:false,
      //       message:"your request rejected"
      //     }
      //  }

      //  if(doctor.appliedStatus=="applied"){
      //      return {
      //       status:false,
      //       message:"your request will check"
      //      }
      //  }

      //  if(doctor?.approved==true && email==doctor.email && password==doctor.password){

      //       let payload={
      //         id:doctor._id,
      //         userName:doctor.name,
      //         role:"doctor"
      //       }
      //                        // it generate token
      //       let token=await this.jwtServices.createToken(payload)
      //      return {
      //        status: true,
      //        message: "Doctor login is successfully",
      //        token:token
      //      };
      //  }else{
      //     return {
      //       status:false,
      //       message:"credentioal error"
      //     }
      //  }
    } catch (error) {
      throw Error();
    }
  }

  async otpVerify(
    otp: string,
    email: string
  ): Promise<{ status: boolean; message: string }> {
    try {
      let otpData = await this.doctorAuthRepository.findOtpData(email);

      if (!otpData) {
        return {
          status: false,
          message: "the otp expired",
        };
      }

      if (otpData?.otp == otp) {
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
      throw error;
    }
  }

  async sendOtp(email: string): Promise<{ status: true }> {
    try {
      
      let otp:string=await this.OtpService.generateOtp()

      let otpData=await this.doctorAuthRepository.saveOtp(email,otp)

      await this.OtpService.sendOtpEmail(email,otp,email)
     
      return {status:true}

    } catch (error) {
      throw error
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

      let isDoctor = await this.doctorAuthRepository.isDoctorExists(data.email);
      console.log(isDoctor);
      if (!isDoctor) {
        return {
          status: false,
          errMessage: "This email account user is not here",
        };
      }

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
      let response = await this.doctorAuthRepository.kycStorStep2(data);

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
}
