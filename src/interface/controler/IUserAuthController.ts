import { NextFunction, Request, Response } from "express";
import IRequest from "./Request";
import IAuthRequest from "../User/authRequest";

export interface googleAuthBody{
  email:string,
  userName:string,
  image:string
}

export interface registerBody {
  email: string;
  userName: string;
  age: number;
  gender: string;
  password: string;
  phoneNumber: string;
}

export interface otpVerificationBody {
  email: string;
  otp: number;
}

export interface loginBody {
  email: string;
  password: string;
}

export interface tokenData {
  id:string;
  userName?:string;
  role:string
}

export interface otpVerifyData {
  otp: string;
  email: string;
  typeOfOtp:string
}

export default interface IUserAuthController {
  register(req: Request, res: Response): Promise<void>;
  otpVerification(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  forgotPassword(req: Request, res: Response): Promise<void>;
  updatePassword(req: Request, res: Response): Promise<void>;
  resendOtp(req:Request,res:Response):Promise<void>;
  logOut(req:Request,res:Response):Promise<void>;
  getToken(req:Request,res:Response):Promise<void>;
  googleAuth(req:Request,res:Response):Promise<void>
  getUserProfile(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
}


