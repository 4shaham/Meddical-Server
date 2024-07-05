import express, { Request, Response, Router } from "express";

import DoctorAuthController from "../../adapters/controllers/DoctorAuthController";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";
import DoctorAuthRepository from "../../adapters/repositories/DoctorAuthRepository";


// collection

import Doctor from "../model/DoctorSchema";
import Kyc from "../model/KycSchema";
import Otp from "../model/UserOtpSchema";


// services 
import JwtService from "../utils/jwtService";
import CloudinaryService from "../utils/cloudinaryService";
import HashingServices from "../utils/hashingService";
import OtpService from "../utils/otpService";


// middleware 
import authorization from "../Middleware/doctor/authorization";


const jwtService=new JwtService()
const clodinaryService=new CloudinaryService()
const hashingService=new HashingServices()
const otpService=new OtpService()


const router: Router = express.Router();


const doctorAuthRepository=new DoctorAuthRepository(Doctor,Kyc,Otp)
const doctorAuthUseCase=new DoctorAuthUseCase(doctorAuthRepository,jwtService,clodinaryService,hashingService,otpService)
const doctorAuthController=new DoctorAuthController(doctorAuthUseCase,)



router.post("/login",doctorAuthController.login.bind(doctorAuthController))
router.post("/register",doctorAuthController.register.bind(doctorAuthController))
router.patch("/otpVerification",doctorAuthController.otpVerification.bind(doctorAuthController))
router.post("/resendOtp",doctorAuthController.resendOtp.bind(doctorAuthController))
router.post("/storeKycData1",doctorAuthController.storeKYCDataStep1.bind(doctorAuthController))
router.put("/storeKycData2",doctorAuthController.storeKYCDataStep2.bind(doctorAuthController))
router.get("/getKycStatus/:email",doctorAuthController.getKycinformation.bind(doctorAuthController))
router.post("/logout",authorization,doctorAuthController.logOut.bind(doctorAuthController))
router.get("/getToken",doctorAuthController.getToken.bind(doctorAuthController))
  
export default router;
 