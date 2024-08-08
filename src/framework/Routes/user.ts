import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


import UserRepository from "../../adapters/repositories/UserRepository";
import UserController from "../../adapters/controllers/userControllet";
import UserUseCase from "../../useCase/UserUseCase";


import Prescription from "../model/PrescriptionSchema";
import Payment from "../model/PaymentSchema";
import Users from "../model/UserSchema";

// middleware 
import authorizationMiddleware from "../Middleware/user/authorization";
import isUserBlockedMiddleware from "../Middleware/user/isUserBlocked";


import CloudinaryService from "../utils/cloudinaryService";
import HashingServices from "../utils/hashingService";

const cloudinaryService=new CloudinaryService()
const hashingService=new HashingServices()

const userRepository=new UserRepository(Prescription,Payment,Users)
const userUseCase=new UserUseCase(userRepository,cloudinaryService,hashingService)
const userController=new UserController(userUseCase)


router.get("/getPrescriptionData",authorizationMiddleware,isUserBlockedMiddleware,userController.getPrescriptionData.bind(userController))
router.get("/getTransactionHistory",authorizationMiddleware,isUserBlockedMiddleware,userController.getPaymentHistory.bind(userController))
router.get("/getInvoiceData",authorizationMiddleware,isUserBlockedMiddleware,userController.getInvoiceData.bind(userController))
router.put("/updateProfile",authorizationMiddleware,isUserBlockedMiddleware,userController.updateProfile.bind(userController))
router.patch("/profilePasswordUpdate",authorizationMiddleware,isUserBlockedMiddleware,userController.updatePasswordProfile.bind(userController))

export default router