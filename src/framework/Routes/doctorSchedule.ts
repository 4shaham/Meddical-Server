
import express,{ Router } from "express";


const router:Router=express.Router()


// collection 
import DoctorSchedule from "../model/DoctorScheduleSchema";
import BookingDb from "../model/BookingSchema";
import Doctor from "../model/DoctorSchema";
import Prescription from "../model/PrescriptionSchema";

import DoctorScheduleManagementRepository from "../../adapters/repositories/DoctorScheduleManagementRepository";
import DoctorScheduleManagmentUseCase from "../../useCase/DoctorScheduleManagementUseCase";
import DoctorScheduleManagementController from "../../adapters/controllers/DoctorScheduleManagementController";

import authorization from "../Middleware/doctor/authorization";
import { isDoctorBlockedMiddleware } from "../Middleware/doctor/isBlocked";



import JwtService from "../utils/jwtService";


const jwtService=new JwtService()


const doctorScheduleManagementRepository=new DoctorScheduleManagementRepository(DoctorSchedule,BookingDb,Doctor,Prescription)
const doctorShceduleManagementUseCase=new DoctorScheduleManagmentUseCase(doctorScheduleManagementRepository,jwtService)
const doctorScheduleManagementController=new DoctorScheduleManagementController(doctorShceduleManagementUseCase)




 router.post("/addSchedule",authorization,isDoctorBlockedMiddleware,doctorScheduleManagementController.addSchedules.bind(doctorScheduleManagementController))
 router.get("/findDoctorBookingWithDate",authorization,isDoctorBlockedMiddleware,doctorScheduleManagementController.findBookingSlotWithDate.bind(doctorScheduleManagementController))
 router.get("/findDoctorSchedule",authorization,isDoctorBlockedMiddleware,doctorScheduleManagementController.findAllScehdules.bind(doctorScheduleManagementController))


 //prescription  
 router.post("/addPrescription",authorization,isDoctorBlockedMiddleware,doctorScheduleManagementController.createPrescription.bind(doctorScheduleManagementController))
 
 // userSide
 router.get("/findSchedulePerticularDate",doctorScheduleManagementController.findPerticularDateSchedule.bind(doctorScheduleManagementController))
 
export default router