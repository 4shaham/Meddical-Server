import { Request, Response } from "express";



export default interface IDoctorScheduleManagementController{
    addSchedules(req:Request,res:Response):Promise<void>
}