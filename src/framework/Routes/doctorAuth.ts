import express, { Request, Response, Router } from "express";

import DoctorAuthController from "../../adapters/Controllers/DoctorAuthController";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";
import DoctorAuthRepository from "../../adapters/repositories/DoctorAuthRepository";


const router: Router = express.Router();

const doctorAuthRepository=new DoctorAuthRepository()
const doctorAuthUseCase=new DoctorAuthUseCase(doctorAuthRepository)
const doctorAuthController=new DoctorAuthController(doctorAuthUseCase)




export default router;
