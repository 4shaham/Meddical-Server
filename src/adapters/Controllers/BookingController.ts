import { NextFunction, Request, Response } from "express";
import IBookingController from "../../interface/controler/IBookingController";
import IBookingUseCase from "../../interface/useCase/IBookingUseCase";
import IAuthRequest from "../../interface/User/authRequest";
import { StatusCode } from "../../enums/statusCode";


export default class BookingController implements IBookingController {
   

   private bookingUseCase:IBookingUseCase
   constructor(bookingUseCase:IBookingUseCase){
       this.bookingUseCase=bookingUseCase
   }


   async createTokenBooking(req:IAuthRequest, res: Response,next:NextFunction): Promise<void> {
       try {

          
          const {fees,typeOfConsaltation,schedulesId,slotNumber}=req.body
          const userId:string=req.userId as string
          const response=await this.bookingUseCase.verifyCreateToken(userId,fees,typeOfConsaltation,schedulesId,slotNumber)
          console.log("isVerifieidddddddddddddddddd")
          res.status(StatusCode.success).json(response)
      
       }catch(error) {
          next(error)
       }
   }

   async cancelTokenBooking(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {

       try{
         console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii bro')
         const bookingID=req.query.tokenId  
         const response=await this.bookingUseCase.verifyCancelToken(bookingID as string)
         res.status(StatusCode.success).json({message:"cancelled succueesffuly"})
       } catch (error) {
          console.log(error,"jiiiiiiiiiiiiii")
          next(error)
       }
   }


   async findUserBooking(req:IAuthRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         
         const userId:string=req.userId as string
         const statusType:string=req.query.statusType as string 

         const data=await this.bookingUseCase.findBookingDataWithStatus(userId,statusType)
         res.status(StatusCode.success).json(data)
       } catch (error) {
          console.log(error)
          next(error)
       }
   }
   


}