import { NextFunction, Request, Response } from "express"
import IUser from "../../entity/userEntity"
import IRequest from "./Request"


export default interface IDoctorAuthController{

   register(req:Request,res:Response,next:NextFunction):Promise<void>
   login(req:Request,res:Response,next:NextFunction):Promise<void>
   getKycinformation(req:Request,res:Response):Promise<void>
   storeKYCDataStep1(req:Request,res:Response):Promise<void>
   storeKYCDataStep2(req:Request,res:Response):Promise<void>
   otpVerification(req:Request,res:Response):Promise<void>
   resendOtp(req:Request,res:Response):Promise<void>
   logOut(req:Request,res:Response):Promise<void>
   getToken(req:Request,res:Response):Promise<void>
   getUserData(req:Request,res:Response,next:NextFunction):Promise<void>
   getDoctorProfileData(req:IRequest,res:Response,next:NextFunction):Promise<void>
   updateDoctorProfile(req:IRequest,res:Response,next:NextFunction):Promise<void>
   updatePassword(req:IRequest,res:Response,next:NextFunction):Promise<void>
}

// export interface doctorRegisterBody{
    // doctorName:String;
    // specialtie: String;
    // email:String;
    // licenseNumber:String;
    // Password:String;
    // PhoneNumber:String;
    // LicenseImage:String;
    // YearsOfExperience:Date;
    // Language: String[] | null;
    // Approved: Boolean | null;
    // CreatedAt: Timestamp | null;
    // UpdateAt: Timestamp | null;
    // achievements: {
    //    Date: Date | null;
    //    Description: String | null;
    //    Title: String | null;
    // }[];
    // experiences: {
    // }[];
    // AppliedStatus: String | null;
    // Fees: Double | null;
// }