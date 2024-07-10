import express, { Request, Response, Router } from "express";


const router: Router = express.Router();


// collection 


import Doctor from "../model/DoctorSchema";



import FetchGuestUserData from "../../adapters/controllers/FetchGuestUserData"
import FetchGuestUserDataRepository from "../../adapters/repositories/FetchGuestUserDataRepository";
import FetchGuestUserDataUseCase from "../../useCase/FetchGuestUserDataUseCase";


const fetchGuestUserDataRepository=new FetchGuestUserDataRepository(Doctor)
const fetchGuestUserDataUseCase=new FetchGuestUserDataUseCase(fetchGuestUserDataRepository)
const fetchGusetUserData=new FetchGuestUserData(fetchGuestUserDataUseCase)



router.get("/getDoctors",fetchGusetUserData.getDoctors.bind(fetchGusetUserData))





export default router