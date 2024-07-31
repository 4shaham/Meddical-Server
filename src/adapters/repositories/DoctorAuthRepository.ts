import mongoose, { Model, isObjectIdOrHexString } from "mongoose";;
import IDoctor from "../../entity/doctorEntity";
import IDoctorAuthRepositories from "../../interface/repositories/IDoctorAuthRepositories";
import {
  DatasKYCVerificationStep1,
  DatasKYCVerificationStep2,
  DatasOfDoctorRegistration,
} from "../../interface/useCase/IDoctorUseCase";
import IKyc from "../../entity/kycEntity";
import IUserOtp from "../../interface/collection/IotpUser";
import IUser from "../../entity/userEntity";


export default class DoctorAuthRepository implements IDoctorAuthRepositories {
  private doctors: Model<IDoctor>;
  private kyc: Model<IKyc>;
  private otp:Model<IUserOtp>;
  private user:Model<IUser>;

  constructor(doctors: Model<IDoctor>, kyc: Model<IKyc>,otp:Model<IUserOtp>,user:Model<IUser>) {
    this.doctors = doctors;
    this.kyc = kyc;
    this.otp=otp
    this.user=user
  }

  async isDoctorExists(email?: string): Promise<IDoctor | null> {
    try {
      let details = await this.doctors.findOne({email:email });
      return details;
    } catch (error) {
      throw Error();
    }
  }

  async isRegesterd(data: DatasOfDoctorRegistration): Promise<IDoctor | null> {
    try {
      const doctor = new this.doctors({
        name: data.name,
        specialty: data.specialty,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        fees: data.fees,
        image: data.image,
      });

      return await doctor.save();
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  async kycStorStep1(data: DatasKYCVerificationStep1): Promise<IKyc | null> {
    try {
      const doctor = new this.kyc({
        email: data.email,
        licenseNumber: data.licenseNumber,
        licenseImage: data.image,
        experiences: data.experiences,
        step: 1,
      });
      return await doctor.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async kycStorStep2(data: DatasKYCVerificationStep2): Promise<IKyc | null> {
    try {
      
      console.log(data.yearsOfExperience,"hummmsmdf")

      return await this.kyc.findOneAndUpdate(
        { email: data.email },
        {
          $set:{
            yearsOfexperience:Number(data.yearsOfExperience),
            fullName:data.fullName, 
            identityCardImage:data.identityCardImage,
            achievements:data.acheivemnts,
            appliedStatus:"applied",
            step:2
          },
        },{
          new:true
        }
      );
    } catch (error) {
      console.log(error)
      throw error;
    }
  }

 async getKycDetails(email: string): Promise<IKyc|null> {
      try {
       return  await this.kyc.findOne({email:email})
      } catch (error) {
        throw error
      }    
  }

  async saveOtp(email: string, otp: string): Promise<void> {

    try {
      

      await this.otp.deleteMany({email:email})

      const data=new this.otp({
        email:email,
        otp:otp,
      })
      
      await data.save()
      
    } catch (error) {
       console.log(error,"'dfhdjhfjdfhjdhfj")
    }
    
  }

   async findOtpData(email: string): Promise<IUserOtp|null> {
        try {
          
          return await this.otp.findOne({email:email})

        } catch (error) {
           console.log(error)
           throw error
        }  
  }
  
  async updateOtpVerified(email: string): Promise<IDoctor|null>{
         
    try{
      return  await this.doctors.findOneAndUpdate({email:email},{$set:{otpVerified:true}})
    }catch(err){
      throw Error()
    }
    
  }
  
  async isTokenDoctorData(id: string): Promise<IDoctor | null> {
      try {
         return await this.doctors.findOne({_id:id})
      } catch (error) {
           throw error        
      }
  }

  
  async getUserProfileData(id: string): Promise<IUser | null> {
      try {
       return await this.user.findOne({_id:id})
      } catch (error) {
         throw error
      }  
  }


}
