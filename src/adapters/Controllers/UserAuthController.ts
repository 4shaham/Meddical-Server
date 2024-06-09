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
     
      if(!email||!userName||!age||!gender||!password||!phoneNumber){
        res.status(400).json({
          status: false,
          message: "All fields are required."
      });
      }

      const data = {
        email,  
        userName,
        age,
        gender,
        password,
        phoneNumber,
      };
      await this.userAuthUseCase.registerUser(data);
      res.json({status:true,message: "user Created successfully" });
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

      let response = await this.userAuthUseCase.authenticateUser(data);

      if(response?.status){

        const {token}=response
        res.cookie("token", token, { maxAge: 3600000 });    
        res.status(200).json(response)
       

      }else{

        res.status(401).json(response)

      }
      
    } catch (error) {
      console.log(error)
    }
  }
}

export default UserAuthController;
