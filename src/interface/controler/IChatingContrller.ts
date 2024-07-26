import { NextFunction, Request, Response } from "express";
import IAuthRequest from "../User/authRequest";
import IRequest from "./Request";


export default interface IChatingContrller{
    createConversation(req:Request,res:Response,next:NextFunction):Promise<void>
    getConversation(req:IAuthRequest,res:Response,next:NextFunction):Promise<void>
    doctorGetConversation(req:IRequest,res:Response,next:NextFunction):Promise<void>
    createMessage(req:Request,res:Response,next:NextFunction):Promise<void>
    getMessage(req:Request,res:Response,next:NextFunction):Promise<void>
}