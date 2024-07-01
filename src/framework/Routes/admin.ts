import express,{ Router } from "express";


const router:Router=express.Router()


import AdminController from "../../adapters/Controllers/AdminController";
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

import AutherisationMidlleware from "../Middleware/Admin/Autherisation";


const adminRepository=new AdminRepository(Specality,Doctor,Kyc)
const adminUseCase=new AdminUseCase(adminRepository,jwtService,cloudinaryServices)
const adminController=new AdminController(adminUseCase)
    

router.post("/login",adminController.adminLogin.bind(adminController))
router.post("/logout",AutherisationMidlleware,adminController.adminLogOut.bind(adminController))
router.get("/getToken",adminController.getToken.bind(adminController))
router.post("/addSpecalities",AutherisationMidlleware,adminController.addSpecialty.bind(adminController))
router.get("/findAllSpecaities",AutherisationMidlleware,adminController.findAllSpecality.bind(adminController))
router.get("/findAllNewRequestDoctor",adminController.getNewDoctorRequest.bind(adminController))
router.get("/findeKycVerificatioData",adminController.getDoctorDataVerification.bind(adminController))
router.patch("/deleteSpecality/:specalityId",adminController.deleteSpecality.bind(adminController))
router.patch("/doctorKycVerification",adminController.updateDoctorKycStatus.bind(adminController))


export default router


