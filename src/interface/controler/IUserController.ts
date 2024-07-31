import { NextFunction, Request, Response } from "express";
import IRequest from "./Request";
import IAuthRequest from "../User/authRequest";


export default interface IUserController{
    getPrescriptionData(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    getPaymentHistory(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    getInvoiceData(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
}