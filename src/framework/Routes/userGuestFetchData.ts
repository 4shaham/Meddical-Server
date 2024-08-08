import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


// collection 


import Doctor from "../model/DoctorSchema";
import Specality from "../model/SpecalitySchema";



import FetchGuestUserData from "../../adapters/controllers/FetchGuestUserData"
import FetchGuestUserDataRepository from "../../adapters/repositories/FetchGuestUserDataRepository";
import FetchGuestUserDataUseCase from "../../useCase/FetchGuestUserDataUseCase";


const fetchGuestUserDataRepository=new FetchGuestUserDataRepository(Doctor,Specality)
const fetchGuestUserDataUseCase=new FetchGuestUserDataUseCase(fetchGuestUserDataRepository)
const fetchGusetUserData=new FetchGuestUserData(fetchGuestUserDataUseCase)



router.get("/getDoctors",fetchGusetUserData.getDoctors.bind(fetchGusetUserData))
router.get("/getDoctorProfile",fetchGusetUserData.getDoctorProfile.bind(fetchGusetUserData))
router.get("/getSpecality",fetchGusetUserData.findAllSpecality.bind(fetchGusetUserData))
router.get("/getDoctorWithSpecalitySort",fetchGusetUserData.findDoctorWithSort.bind(fetchGusetUserData))



export default router