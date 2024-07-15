import { Request, Response } from "express";


export default interface IBookingController{

    createTokenBooking(req:Request,res:Response):Promise<void>

}


