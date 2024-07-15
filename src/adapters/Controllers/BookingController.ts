import { NextFunction, Request, Response } from "express";
import IBookingController from "../../interface/controler/IBookingController";
import IBookingUseCase from "../../interface/useCase/IBookingUseCase";
import IAuthRequest from "../../interface/User/authRequest";


export default class BookingController implements IBookingController {

   private bookingUseCase:IBookingUseCase
   constructor(bookingUseCase:IBookingUseCase){
       this.bookingUseCase=bookingUseCase
   }


   async createTokenBooking(req:IAuthRequest, res: Response): Promise<void> {
       try {
          console.log(req.userId,"kooooooooooooooooooo",req.body)
          const {doctorId,BookedDate,Fees,TypeOfConsaltation,schedulesId}=req.body
       } catch (error) {
          console.log(req.userId)
       }
   }


}