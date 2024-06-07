import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

import UserAuthRepository from "./../../adapters/repositories/UserAuthRepository";
import UserAuthUseCase from "./../../useCase/UserAuthUseCase";
import UserAuthController from "./../../adapters/Controllers/UserAuthController";

// user collection and OtpCollection  

import Users from "../model/UserSchema";
import Otp from "../model/UserOtpSchema";


// utiles  

import HashingServices from "../utils/hashingService";
import OtpService from "../utils/otpService";


// utiles object creation 

const hashingServices=new HashingServices()
const otpServices=new OtpService()


// create a object and connect all controllers and  usecase and useRepositorys
const userAuthRepository = new UserAuthRepository(Users,Otp);
const userAuthUseCase = new UserAuthUseCase(userAuthRepository,hashingServices,otpServices);
const userAuthController = new UserAuthController(userAuthUseCase);


router.post("/register", userAuthController.register.bind(userAuthController));
router.post("/otpVerification",userAuthController.otpVerification.bind(userAuthController))
router.post("/login",userAuthController.login.bind(userAuthController))

export default router;
