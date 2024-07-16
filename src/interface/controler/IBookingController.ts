import { NextFunction, Request, Response } from "express";
import IAuthRequest from "../User/authRequest";


export default interface IBookingController{

    createTokenBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    cancelTokenBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    findUserBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    
}


