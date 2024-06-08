import { Request, Response } from "express";
import IUserAuthController from "../../interface/controler/IUserAuthController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IuserUseCase from "../../interface/useCase/IUseruseCase";

class UserAuthController implements IUserAuthController {
  private userAuthUseCase:IuserUseCase;

  constructor(userAuthUseCase:IuserUseCase) {
    this.userAuthUseCase =userAuthUseCase;
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
      const { email, password } = req.body;

      const data = {
        email,
        password,
      };

      let token = await this.userAuthUseCase.authenticateUser(data);

      res.cookie("token", token, { maxAge: 3600000 });
      res.json({ message: "Login successful", token: token });
    } catch (error) {}
  }
}

export default UserAuthController;
