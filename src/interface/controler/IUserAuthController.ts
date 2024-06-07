import { Request, Response } from "express";


export default interface IUserAuthController{

    register(req:Request,res:Response):Promise<void>
    otpVerification(req:Request,res:Response):Promise<void>
    login(req:Request,res:Response):Promise<void>

}
  
export interface registerBody{
 
    email:string,
    userName:string,
    age:number,
    gender:string,
    password:string,
    phoneNumber:Number

}

export interface otpVerificationBody{
    email:string,
    otp:number
}

export interface loginBody{
    email:string,
    password:string
}

