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

const userRepository=new UserRepository(Prescription,Payment,Users)
const userUseCase=new UserUseCase(userRepository)
const userController=new UserController(userUseCase)


router.get("/getPrescriptionData",authorizationMiddleware,isUserBlockedMiddleware,userController.getPrescriptionData.bind(userController))
router.get("/getTransactionHistory",authorizationMiddleware,isUserBlockedMiddleware,userController.getPaymentHistory.bind(userController))
router.get("/getInvoiceData",authorizationMiddleware,isUserBlockedMiddleware,userController.getInvoiceData.bind(userController))


export default router