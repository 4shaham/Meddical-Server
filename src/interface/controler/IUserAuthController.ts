import { Request, Response } from "express";

export default interface IUserAuthController {
  register(req: Request, res: Response): Promise<void>;
  otpVerification(req: Request, res: Response): Promise<void>;
  login(req: Request, res: Response): Promise<void>;
  forgetPassword(req: Request, res: Response): Promise<void>;
  updatePassword(req: Request, res: Response): Promise<void>;
  resendOtp(req:Request,res:Response):Promise<void>;
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
  userId: string;
  userName: string;
}

export interface otpVerifyData {
  otp: string;
  email: string;
}
