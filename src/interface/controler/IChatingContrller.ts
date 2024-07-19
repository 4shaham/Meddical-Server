import { NextFunction, Request, Response } from "express";


export default interface IChatingContrller{
    createConversation(req:Request,res:Response,next:NextFunction):Promise<void>
    getConversation(req:Request,res:Response,next:NextFunction):Promise<void>
    messageing(req:Request,res:Response,next:NextFunction):Promise<void>
}