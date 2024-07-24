import { NextFunction, Request, Response } from "express";
import IAuthRequest from "../User/authRequest";
import IRequest from "./Request";


export default interface IBookingController{

    createTokenBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    cancelTokenBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    findUserBooking(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    makePayment(req:Request,res:Response,next:NextFunction):Promise<void>
    webhook(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
}


