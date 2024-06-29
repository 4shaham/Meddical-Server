import express, { Request, Response, Router } from "express";

import DoctorAuthController from "../../adapters/Controllers/DoctorAuthController";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";
import DoctorAuthRepository from "../../adapters/repositories/DoctorAuthRepository";


// collection

import Doctor from "../model/DoctorSchema";
import Kyc from "../model/KycSchema";


// services 
import JwtService from "../utils/jwtService";
import CloudinaryService from "../utils/cloudinaryService";

const jwtService=new JwtService()
const clodinaryService=new CloudinaryService()

const router: Router = express.Router();

const doctorAuthRepository=new DoctorAuthRepository(Doctor,Kyc)
const doctorAuthUseCase=new DoctorAuthUseCase(doctorAuthRepository,jwtService,clodinaryService)
const doctorAuthController=new DoctorAuthController(doctorAuthUseCase)



router.post("/login",doctorAuthController.login.bind(doctorAuthController))
router.post("/register",doctorAuthController.register.bind(doctorAuthController))
router.post("/storeKycData1",doctorAuthController.storeKYCDataStep1.bind(doctorAuthController))
router.put("/storeKycData2",doctorAuthController.storeKYCDataStep2.bind(doctorAuthController))



export default router;
