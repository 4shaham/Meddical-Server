// import IUser from "../../interface/collection/Iuser";
import IUser from "../../entity/userEntity";
import { Model } from "mongoose";
import IuserAuthRepositories from "../../interface/repositories/IUserAuthRepositories";
import { registerBody } from "../../interface/controler/IUserAuthController";
import IUserOtp from "../../interface/collection/IotpUser";


class UserAuthRepository implements IuserAuthRepositories {
  private users: Model<IUser>;
  private otp:Model<IUserOtp>;

  constructor(users: Model<IUser>,otp:Model<IUserOtp>) {
    this.users = users;
    this.otp=otp
  }




  async checkEmailExists(email: string): Promise<IUser | null> {
    try {
      return await this.users.findOne({ email: email });
    } catch (error) {
      throw new Error(`Failed to check if email exists: ${error}`);
    }
  }


  async checkPhoneNumberExists(phoneNumber:string): Promise<IUser | null> {
     try {
      return  await this.users.findOne({phoneNumber:phoneNumber})
     } catch (error) {
        throw new Error("fhfdfj")  
     }
     
  }

  
  async createUser(data: registerBody): Promise<IUser> {
    try {
      const user = new this.users(data);
      console.log("sucesss saved")
      return await user.save();
    } catch (error) {
      throw new Error(`Failed to check if email exists: ${error}`);
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
       throw error
    }
    
  }

 async verifyOTP(email: string): Promise<IUserOtp|null> {

  try{

    return await this.otp.findOne({email:email})

  }catch(error){
    throw Error()
  }
    

  }

   async updateOtpVerified(email: string): Promise<IUser | null> {
         
    try{
      return await this.users.findOneAndUpdate({email:email},{$set:{otpVerified:true}})
    }catch(err){
      throw Error()
    }
    
  }

 async changePassword(email: string, password: string): Promise<void> {

   try {

    const res= await this.users.updateOne({email:email},{$set:{password:password}})
    console.log(res)
   } catch (error) {

    throw Error()
    
   }
         
  

  }

 async saveGooogleAuth(email: string, userName: string, image: string): Promise<IUser> {
     try {
      
      const user = new this.users({
        email:email,
        otpVerified:true,
        userName:userName,
        image:image
      })

     return await user.save()
     

     } catch (error) {
        console.log(error)
        throw Error()
     }
  }


  async fetchPrfileData(id: string): Promise<IUser | null> {
       try {
         return await this.users.findOne({_id:id,otpVerified:true})
       } catch (error) {
         throw error
       }
  }


  

  



}

export default UserAuthRepository;
