import express,{ Router } from "express";


const router:Router=express.Router()


import AdminController from "../../adapters/controllers/AdminController";
import AdminRepository from "../../adapters/repositories/AdminRepository";
import AdminUseCase from "../../useCase/AdminUseCase";


// collection 

import Specality from "../model/SpecalitySchema";
import Doctor from "../model/DoctorSchema";
import Kyc from "../model/KycSchema";

// service 

import JwtService from "../utils/jwtService";
import CloudinaryService from "../utils/cloudinaryService";


const jwtService=new JwtService()
const cloudinaryServices=new CloudinaryService()



// middleware 

import authorizationMiddleware from "../Middleware/admin/authorization";



const adminRepository=new AdminRepository(Specality,Doctor,Kyc)
const adminUseCase=new AdminUseCase(adminRepository,jwtService,cloudinaryServices)
const adminController=new AdminController(adminUseCase)
    

router.post("/login",adminController.adminLogin.bind(adminController))
router.post("/logout",authorizationMiddleware,adminController.adminLogOut.bind(adminController))
router.get("/getToken",adminController.getToken.bind(adminController))
router.post("/addSpecalities",authorizationMiddleware,adminController.addSpecialty.bind(adminController))
router.get("/findAllSpecaities",authorizationMiddleware,adminController.findAllSpecality.bind(adminController))
router.get("/findAllNewRequestDoctor",authorizationMiddleware,adminController.getNewDoctorRequest.bind(adminController))
router.get("/findeKycVerificatioData",authorizationMiddleware,adminController.getDoctorDataVerification.bind(adminController))
router.patch("/deleteSpecality/:specalityId",authorizationMiddleware,adminController.deleteSpecality.bind(adminController))
router.patch("/doctorKycVerification",authorizationMiddleware,adminController.updateDoctorKycStatus.bind(adminController))
router.get("/getEditSpecalityData",authorizationMiddleware,adminController.findEditSpecalityData.bind(adminController))
router.put("/updateSpecality",authorizationMiddleware,adminController.updateSpecality.bind(adminController))
router.get("/deletedSpecalityData",authorizationMiddleware,adminController.findDeletedSpecality.bind(adminController))
router.patch("/restoreSpecality",authorizationMiddleware,adminController.restoreSpecality.bind(adminController))


export default router    
  

