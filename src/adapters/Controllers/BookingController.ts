import { NextFunction, Request, Response } from "express";
import IBookingController from "../../interface/controler/IBookingController";
import IBookingUseCase from "../../interface/useCase/IBookingUseCase";
import IAuthRequest from "../../interface/User/authRequest";
import { StatusCode } from "../../enums/statusCode";
import Stripe from "stripe";
import { Session } from "express-session";
import IRequest from "../../interface/controler/Request";


const stripe = new Stripe('your-stripe-secret-key');


export default class BookingController implements IBookingController {
   

   private bookingUseCase:IBookingUseCase
   constructor(bookingUseCase:IBookingUseCase){
       this.bookingUseCase=bookingUseCase
   }


   async createTokenBooking(req:IAuthRequest, res: Response,next:NextFunction): Promise<void> {
       try {

          
         console.log('hiiii enterd checkong page of webHook',req.userId)
          
          await this.bookingUseCase.verifyWebHook(req)

         //  console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii',req.app.locals.datas,"loooo")      
         //  console.log('Retrieved bookingBody:', req.app.locals.datas);    
         //  const {fees,typeOfConsaltation,schedulesId,slotNumber}=req.app.locals.datas
         //  const userId:string=req.userId as string
          
         //  const response=await this.bookingUseCase.verifyCreateToken(userId,fees,typeOfConsaltation,schedulesId,slotNumber)
         //  console.log("isVerifieidddddddddddddddddd")
         //  res.status(StatusCode.success).json(response)
         // res.status(StatusCode.success).json({message:"hfjhdjfh"})
       
       }catch(error) {
          console.log("error")
          next(error) 
       }
   }

   async cancelTokenBooking(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
       try{
         const bookingID=req.query.tokenId  
         const response=await this.bookingUseCase.verifyCancelToken(bookingID as string)
         res.status(StatusCode.success).json({message:"cancelled succueesffuly"})
       } catch (error) {
          next(error)
       }
   }


   async findUserBooking(req:IAuthRequest, res: Response, next: NextFunction): Promise<void> {
       try {

         
         const userId:string=req.userId as string
         const statusType:string=req.query.statusType as string 
         console.log(userId,statusType);
         
         const data=await this.bookingUseCase.findBookingDataWithStatus(userId,statusType)
         res.status(StatusCode.success).json(data)
       } catch (error){
          console.log(error)
          next(error)
       }
   }
   
   
   async makePayment(req:Request, res: Response, next: NextFunction): Promise<void> {
        try {

          req.app.locals.datas=req.body                                                           
          const {fees,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime}=req.body  
          const data=await this.bookingUseCase.verifyPaymentCheckOut(fees)
          res.status(StatusCode.success).json({sessionId:data})
        } catch (error) {
           console.log(error,"dfhdhfjdf")
        }
   }




  async webhook(req:IAuthRequest, res: Response, next: NextFunction): Promise<void> {
      try {
     
          const data=req.app.locals.datas;
          const event = req.body; 
          const {userId,fees,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime}=data
          console.log(startTime,endTime,'hihhhhhhhhhhhhhhhhhhhh')
          const result=await this.bookingUseCase.verifyWebHook(req)
          if(result){
             console.log("hiiiii it is sucesss for the payment completed the store intd")
             await this.bookingUseCase.verifyCreateToken(userId,fees,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime)
             res.status(200).json({messag:true})
          }
          
          


         //  switch (event.type) {

         //   case 'payment_intent.succeeded':
         //      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiii shahm salmamsluduud')
         //      const paymentIntent=event.data.object;
         //      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
         //      // Then define and call a method to handle the successful payment intent.
         //      //  handlePaymentIntentSucceeded(paymentIntent);
         //     await this.bookingUseCase.verifyCreateToken(userId,fees,typeOfConsaltation,schedulesId,slotNumber)
         //     break; 

         //   case 'payment_method.attached':
         //     const paymentMethod = event.data.object;
         //     // Then define and call a method to handle the successful attachment of a PaymentMethod.
         //     // handlePaymentMethodAttached(paymentMethod);
         //     break;

         //   default:
         //     // Unexpected event type
         //     console.log(`Unhandled event type ${event.type}.`);

         // }
      } catch (error) {
         console.log(error)
         next (error)
      }
  }








}