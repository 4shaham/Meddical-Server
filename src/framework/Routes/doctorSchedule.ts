
import express,{ Router } from "express";


const router:Router=express.Router()


// collection 
import DoctorSchedule from "../model/DoctorScheduleSchema";


import DoctorScheduleManagementRepository from "../../adapters/repositories/DoctorScheduleManagementRepository";
import DoctorScheduleManagmentUseCase from "../../useCase/DoctorScheduleManagementUseCase";
import DoctorScheduleManagementController from "../../adapters/controllers/DoctorScheduleManagementController";


import JwtService from "../utils/jwtService";
import authorization from "../Middleware/doctor/authorization";

const jwtService=new JwtService()


const doctorScheduleManagementRepository=new DoctorScheduleManagementRepository(DoctorSchedule)
const doctorShceduleManagementUseCase=new DoctorScheduleManagmentUseCase(doctorScheduleManagementRepository,jwtService)
const doctorScheduleManagementController=new DoctorScheduleManagementController(doctorShceduleManagementUseCase)




 router.post("/addSchedule",authorization,doctorScheduleManagementController.addSchedules.bind(doctorScheduleManagementController))
 router.get("/findSchedulePerticularDate",doctorScheduleManagementController.findPerticularDateSchedule.bind(doctorScheduleManagementController))
 router.get("/findDoctorSchedule",authorization,doctorScheduleManagementController.findAllScehdules.bind(doctorScheduleManagementController))
 

export default router