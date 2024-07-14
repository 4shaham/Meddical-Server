import { NextFunction, Request, Response } from "express";



export default interface IDoctorScheduleManagementController{
    addSchedules(req:Request,res:Response,next:NextFunction):Promise<void>
    findPerticularDateSchedule(req:Request,res:Response,next:NextFunction):Promise<void>
   
}