import express,{ Router } from "express";


const router:Router=express.Router()


import AdminController from "../../adapters/Controllers/AdminController";
import AdminRepository from "../../adapters/repositories/AdminRepository";
import AdminUseCase from "../../useCase/AdminUseCase";


import JwtService from "../utils/jwtService";
const jwtService=new JwtService()


const adminRepository=new AdminRepository()
const adminUseCase=new AdminUseCase(adminRepository,jwtService)
const adminController=new AdminController(adminUseCase)

router.post("/login",adminController.adminLogin.bind(adminController))







export default router


