import express, { Request, Response, Router } from "express";

import DoctorAuthController from "../../adapters/Controllers/DoctorAuthController";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";
import DoctorAuthRepository from "../../adapters/repositories/DoctorAuthRepository";


// collection 
import Doctor from "../model/DoctorSchema";


// services 

import JwtService from "../utils/jwtService";

const jwtService=new JwtService()

const router: Router = express.Router();

const doctorAuthRepository=new DoctorAuthRepository(Doctor)
const doctorAuthUseCase=new DoctorAuthUseCase(doctorAuthRepository,jwtService)
const doctorAuthController=new DoctorAuthController(doctorAuthUseCase)




export default router;
