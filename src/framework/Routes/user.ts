import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


import UserRepository from "../../adapters/repositories/UserRepository";
import UserController from "../../adapters/controllers/userControllet";
import UserUseCase from "../../useCase/UserUseCase";


import Prescription from "../model/PrescriptionSchema";


const userRepository=new UserRepository(Prescription)
const userUseCase=new UserUseCase(userRepository)
const userController=new UserController(userUseCase)


router.get("/getPrescriptionData",userController.getPrescriptionData.bind(userController))


export default router