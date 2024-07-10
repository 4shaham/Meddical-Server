
import express,{ Router } from "express";


const router:Router=express.Router()


// collection 
import DoctorSchedule from "../model/DoctorScheduleSchema";


import DoctorScheduleManagementRepository from "../../adapters/repositories/DoctorScheduleManagementRepository";
import DoctorScheduleManagmentUseCase from "../../useCase/DoctorScheduleManagementUseCase";
import DoctorScheduleManagementController from "../../adapters/controllers/DoctorScheduleManagementController";



const doctorScheduleManagementRepository=new DoctorScheduleManagementRepository(DoctorSchedule)
const doctorShceduleManagementUseCase=new DoctorScheduleManagmentUseCase(doctorScheduleManagementRepository)
const doctorScheduleManagementController=new DoctorScheduleManagementController(doctorShceduleManagementUseCase)


router.post("/addSchedule")



export default router