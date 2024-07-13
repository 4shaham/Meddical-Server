import { NextFunction, Request, Response } from "express";






export default interface IFetchGuestUserDataController{
    getDoctors(req:Request,res:Response,next:NextFunction):Promise<void> 
    getDoctorProfile(req:Request,res:Response,next:NextFunction):Promise<void>
    findAllSpecality(req:Request,res:Response,next:NextFunction):Promise<void>
}