import IUser from "../../entity/userEntity";
import { Model } from "mongoose";

class UserAuthRepository {
  private users: Model<IUser>;

  constructor(users: Model<IUser>) {
    this.users = users;
  }

  // async findByEmail(email: string): Promise<IUser | null> {
  //   return await this.users.findOne({ email: email });
  // }

  async RegisterUser(
    email: string,
    password: string,
    age: number,
    gender: string,
    userName: string,
    phoneNumber: Number
  ): Promise<IUser | null> {
    try {
      const newUser = new this.users({
        email: email,
        password: password,
        age: age,
        gender: gender,
        userName: userName,
        phoneNumber: phoneNumber,
      });
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.log("eroore", error);
      return null;
    }
  }
}

export default UserAuthRepository;
