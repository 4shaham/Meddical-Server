import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


import UserAuthRepository from "./../../adapters/repositories/UserAuthRepository";
import UserAuthUseCase from "./../../useCase/UserAuthUseCase";
import UserAuthController from "../../adapters/controllers/UserAuthController";

// user collection and OtpCollection  

import Users from "../model/UserSchema";
import Otp from "../model/UserOtpSchema";


// utiles  

import HashingServices from "../utils/hashingService";
import OtpService from "../utils/otpService";
import JwtService from "../utils/jwtService";
import authorizationMiddleware from "../Middleware/user/authorization";


// utiles object creation 

const hashingServices=new HashingServices()
const otpServices=new OtpService()
const jwtServices=new JwtService()


// create a object and connect all controllers and  usecase and useRepositorys
const userAuthRepository = new UserAuthRepository(Users,Otp);
const userAuthUseCase = new UserAuthUseCase(userAuthRepository,hashingServices,otpServices,jwtServices);
const userAuthController = new UserAuthController(userAuthUseCase);


router.post("/register", userAuthController.register.bind(userAuthController));
router.post("/otpVerification",userAuthController.otpVerification.bind(userAuthController))
router.post("/login",userAuthController.login.bind(userAuthController))
router.post("/forgotPassword",userAuthController.forgotPassword.bind(userAuthController))
router.patch("/updatePassword",userAuthController.updatePassword.bind(userAuthController))
router.post("/resendOtp",userAuthController.resendOtp.bind(userAuthController))
router.post("/logOut",userAuthController.logOut.bind(userAuthController))
router.get("/getToken",userAuthController.getToken.bind(userAuthController))
router.post("/googleAuth",userAuthController.googleAuth.bind(userAuthController))
router.get("/profileData",authorizationMiddleware,userAuthController.getUserProfile.bind(userAuthController))


export default router;
 