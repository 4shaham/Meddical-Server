
import express,{ Router } from "express";


const router:Router=express.Router()


// collection 
import DoctorSchedule from "../model/DoctorScheduleSchema";


import DoctorScheduleManagementRepository from "../../adapters/repositories/DoctorScheduleManagementRepository";
import DoctorScheduleManagmentUseCase from "../../useCase/DoctorScheduleManagementUseCase";
import DoctorScheduleManagementController from "../../adapters/controllers/DoctorScheduleManagementController";


import JwtService from "../utils/jwtService";

const jwtService=new JwtService()


const doctorScheduleManagementRepository=new DoctorScheduleManagementRepository(DoctorSchedule)
const doctorShceduleManagementUseCase=new DoctorScheduleManagmentUseCase(doctorScheduleManagementRepository,jwtService)
const doctorScheduleManagementController=new DoctorScheduleManagementController(doctorShceduleManagementUseCase)




 router.post("/addSchedule",doctorScheduleManagementController.addSchedules.bind(doctorScheduleManagementController))
 router.get("/findSchedulePerticularDate",doctorScheduleManagementController.findPerticularDateSchedule.bind(doctorScheduleManagementController))

 

export default router