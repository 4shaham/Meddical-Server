import { Request, Response } from "express";






export default interface IFetchGuestUserDataController{
    getDoctors(req:Request,res:Response):Promise<void> 
}