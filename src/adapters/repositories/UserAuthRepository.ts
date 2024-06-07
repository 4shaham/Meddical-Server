import IUser from "../../interface/collection/Iuser";
import { Model } from "mongoose";
import IuserRepositories from "../../interface/repositories/IUserRepositories";
import { registerBody } from "../../interface/controler/IUserAuthController";
import IUserOtp from "../../interface/collection/IotpUser";
import { Mode } from "fs";

class UserAuthRepository implements IuserRepositories {
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


  async checkPhoneNumberExists(phoneNumber: Number): Promise<IUser | null> {
     try {
      return  await this.users.findOne({phoneNumber:phoneNumber})
     } catch (error) {
        throw new Error("fhfdfj")  
     }
     
  }

  
  async createUser(data: registerBody): Promise<IUser> {
    try {
      const user = new this.users(data);
      return await user.save();
    } catch (error) {
      throw new Error(`Failed to check if email exists: ${error}`);
    }
  }

 



}

export default UserAuthRepository;
