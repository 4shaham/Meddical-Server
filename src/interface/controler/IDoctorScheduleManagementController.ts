import { NextFunction, Request, Response } from "express";
import IRequest from "./Request";



export default interface IDoctorScheduleManagementController{
    addSchedules(req:IRequest,res:Response,next:NextFunction):Promise<void>
    findPerticularDateSchedule(req:IRequest,res:Response,next:NextFunction):Promise<void>
    findBookingSlotWithDate(req:IRequest,res:Response,next:NextFunction):Promise<void>
    findAllScehdules(req:IRequest,res:Response,next:NextFunction):Promise<void>
}