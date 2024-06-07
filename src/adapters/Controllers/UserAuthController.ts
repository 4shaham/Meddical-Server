import { Request, Response } from "express";
import UserAuthUseCase from "../../useCase/UserAuthUseCase";
import IUserAuthController from "../../interface/controler/IUserAuthController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

class UserAuthController implements IUserAuthController {
  private userAuthUseCase: UserAuthUseCase;

  constructor(userAuthUseCase: UserAuthUseCase) {
    this.userAuthUseCase = userAuthUseCase;
  }

  async register(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const { email, userName, age, gender, password, phoneNumber } = req.body;
      const data = {
        email,
        userName,
        age,
        gender,
        password,
        phoneNumber,
      };
      await this.userAuthUseCase.registerUser(data);
      res.json({ message: "user Created successfully" });
    } catch (error) {
      console.log(error);
      res.json({ eremessage: error });
    }
  }

  async otpVerification(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async login(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {

    try {

      const {email,password}=req.body
  
      const data={
        email,
        password
      }

      console.log(data)

      this.userAuthUseCase.authenticateUser(data)
      
    } catch (error) {
      
    }

  }
}

export default UserAuthController;
