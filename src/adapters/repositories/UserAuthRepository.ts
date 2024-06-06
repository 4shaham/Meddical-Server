import IUser from "../../interface/collection/Iuser";
import { Model } from "mongoose";
import IuserRepositories from "../../interface/repositories/IUserRepositories";
import { registerBody } from "../../interface/controler/IUserAuthController";

class UserAuthRepository implements IuserRepositories{
  private users: Model<IUser>;

  constructor(users: Model<IUser>) {
    this.users = users;
  }

  async createUser(data: registerBody): Promise<void> {
      try {
          
      

        const user=new this.users(data)
        const savedUser = await user.save();
        console.log(savedUser)


      } catch (error) {
        console.log(error)
      }
  }

 async checkEmailExists(email: string): Promise<string|null> {
     let a=await this.users.find({email:email})

     if(a){
        return "this email is already used"
     }
     return null
  }

  // async createUser(
   
  // ): Promise<void> {
  //   try {
  //     const newUser = new this.users({
  //       email: email,
  //       password: password,
  //       age: age,
  //       gender: gender,
  //       userName: userName,
  //       phoneNumber: phoneNumber,
  //     });
  //     const savedUser = await newUser.save();
  //     return savedUser;
  //   } catch (error) {
  //     console.log("eroore", error);
  //     return null;
  //   }
  // }
}

export default UserAuthRepository;
