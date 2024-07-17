import { NextFunction, Request, Response } from "express";
import IUserAuthController from "../../interface/controler/IUserAuthController";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IuserUseCase from "../../interface/useCase/IUseruseCase";
import IAuthRequest from "../../interface/User/authRequest";
import { StatusCode } from "../../enums/statusCode";

class UserAuthController implements IUserAuthController {
  private userAuthUseCase: IuserUseCase;

  constructor(userAuthUseCase: IuserUseCase) {
    this.userAuthUseCase = userAuthUseCase;
  }

  /// user Register

  async register(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email, userName, age, gender, password, phoneNumber } = req.body;
      console.log(req.body);
      if (!email || !userName || !age || !gender || !password || !phoneNumber) {
        res.status(400).json({
          status: false,
          message: "All fields are required.",
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
      res.cookie("otpEmail", email, { maxAge: 3600000 });
      res.status(200).json({
        status: true, 
        message: "user Created successfully and Otp send successfully",
      });
    } catch (error) {
      console.log(error);
      res.json({ eremessage: error });
    }
  }

  // otp verification

  async otpVerification(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { otp,typeOfOtp} = req.body;
      const email = req.cookies.otpEmail;
      
      //  confirmationOfForgotOtp varable

      if (email == "") throw Error();

      const data = {
        email,
        otp,
        typeOfOtp,
      };
      console.log(typeOfOtp,"type of thath one");
      const status = await this.userAuthUseCase.verifyOtp(data);

      if (!status?.status) {
        res.status(401).json(status);
        return;
      }

      if (typeOfOtp == "forgotPassword") {
        res.cookie("otpEmail", "");
        res.cookie("updatePasswordEmail", email, { maxAge: 3600000 });
        res.status(200).json({
          message:"OTP verification successful of forgotPassword",
        });
        return;

      }

      res.cookie("token", status?.token,{maxAge:3600000});
      res.status(200).json(status);
      res.cookie("otpEmail", "");
      res.status(200).json({
        message: "OTP verification successful",
        token: status?.token,
      });
    } catch (err) {
      console.log(err);
    }
  }

  // login

  async login(
    req: Request,
    res: Response
  ): Promise<void> {
    try {

      const { email, password } = req.body;
      const data = {
        email,
        password,
      };


      let response = await this.userAuthUseCase.authenticateUser(data);

      if (!response?.status && response?.message == "otp is not verified") {
        res.status(403).json({ otpVerified: "false" });
        res.cookie("otpEmail", email, { maxAge: 3600000 });
      } else if (response?.status) {
        const { token } = response;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
        });
        res.status(200).json(response);
      } else {
        res.status(403).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // resend Otp

  async resendOtp(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const email = req.cookies.otpEmail;
      let response = await this.userAuthUseCase.resendOtp(email);

      if (response == "resendOtp sucussess") {
        res.cookie("otpEmail", email, { maxAge: 3600000 });
        res.json({ status: true });
      }
    } catch (error) {
      res.json({ error });
    }
  }

  // forget Password

  async forgotPassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.body;
      let response = await this.userAuthUseCase.validateForgotPassword(email);
      console.log(response);
      if (response == "this email user Is not here") {
        res
          .status(401)
          .json({ status: false, message: "This Email user not here" });
        return;
      }
      res.cookie("otpEmail", email, { maxAge: 3600000 });
      res.status(200).json({ status: true, message: "otp Send" });
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  
  async updatePassword(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      
      const { password } = req.body;
      const email = req.cookies.updatePasswordEmail;

      console.log("password", req.body);

      await this.userAuthUseCase.verifyingUpdatePassword(email, password);
      res.status(200).json({status:true,message:"password changed"});
    } catch (error) {
      console.log(error);
      res.json(error)
    }
  }

  // logoout

  async logOut(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      res.cookie("token", "", { httpOnly: true, expires: new Date() });
      res.status(200).json({ status: true });
    } catch (error) {
      res.json(error);
    }
  }

  async getToken(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const token = req.cookies.token;
      console.log(token, "shdfhdjfhd");
      const response = await this.userAuthUseCase.verifyToken(token);
      console.log(response, "token verified tesppoon");
      res.status(200).json(response);
    } catch (error) {
      res.status(401).json(error);
      console.log(error);
    }
  }

  // gogleAuth

  async googleAuth(
    req: Request,
    res: Response
  ): Promise<void> {
    try {


      const { email, userName, image } = req.body;
      let data = {
        email,
        userName,
        image,
      };

      let response = await this.userAuthUseCase.googleAuthenticateUser(data);

      console.log(email, userName, image, "hiiii");

      if (response?.message == "googleAuthenticated Successfully") {
        const { token } = response;
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
        });

        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }


  async getUserProfile(req: IAuthRequest, res: Response,next:NextFunction): Promise<void> {
      try {
        
         const userId:string=req.userId as string
         const data=await this.userAuthUseCase.verifyProfileData(userId)

         res.status(StatusCode.success).json({userData:data})

      } catch (error) {
         throw error
      }
  }







}

export default UserAuthController;
