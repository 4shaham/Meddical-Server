import { Request, Response } from "express";
import IUserAuthController from "../../interface/controler/IUserAuthController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IuserUseCase from "../../interface/useCase/IUseruseCase";
import { stat } from "fs";


class UserAuthController implements IUserAuthController {
  private userAuthUseCase:IuserUseCase;

  constructor(userAuthUseCase:IuserUseCase) {
    this.userAuthUseCase =userAuthUseCase;
  }


  /// user Register

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
      res.json({status:true,message: "user Created successfully and Otp send successfully"});
    } catch (error) {
      console.log(error);
      res.json({ eremessage: error });
    }
  }


  // otp verification 
  
  async otpVerification(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {

    const {otp,email}=req.body  

    const data={
      email,
      otp
    }

    const status=await this.userAuthUseCase.verifyOtp(data)

    if(!status?.status){
        res.status(401).json(status)
    }
    
    
    
    res.cookie("token",status?.token,{ maxAge:3600000});    
    res.status(200).json(status)
     
     
    res.status(200).json({
      message: "OTP verification successful",
      token:status?.token
    }

  )
   
    } catch (err) {
      console.log(err);
    }
  }


  // login

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
      
      if(!response?.status && response?.message=="otp is not verified"){
           
          res.status(401).json({otpVerified:"false"})

      }else if(response?.status){

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
