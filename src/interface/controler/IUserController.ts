import { NextFunction, Request, Response } from "express";


export default interface IUserController{
    getPrescriptionData(req:Request,res:Response,next:NextFunction):Promise<void>
}