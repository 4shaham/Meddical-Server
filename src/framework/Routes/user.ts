import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


import UserRepository from "../../adapters/repositories/UserRepository";
import UserController from "../../adapters/controllers/userControllet";
import UserUseCase from "../../useCase/UserUseCase";


import Prescription from "../model/PrescriptionSchema";
import Payment from "../model/PaymentSchema";

// middleware 
import authorizationMiddleware from "../Middleware/user/authorization";

const userRepository=new UserRepository(Prescription,Payment)
const userUseCase=new UserUseCase(userRepository)
const userController=new UserController(userUseCase)


router.get("/getPrescriptionData",authorizationMiddleware,userController.getPrescriptionData.bind(userController))
router.get("/getTransactionHistory",authorizationMiddleware,userController.getPaymentHistory.bind(userController))

export default router