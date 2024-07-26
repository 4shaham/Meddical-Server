import { error } from "console";
import IBookingRepositories from "../interface/repositories/IBookingRepositories";
import IBookingUseCase, { VerfiyResponse } from "../interface/useCase/IBookingUseCase";
import authorizationMiddleware from "../framework/Middleware/user/authorization";
import IBooking from "../entity/bookingEntity";
import { IStripe } from "../interface/utils/IStripeService";


export default class BookingUseCase implements IBookingUseCase {

   private bookingRepositories:IBookingRepositories
   private stripePayments:IStripe

   constructor(bookingRepositories:IBookingRepositories,stripePayments:IStripe){
      this.bookingRepositories=bookingRepositories
      this.stripePayments=stripePayments
   }


   async verifyCreateToken(userId:string,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number,startTime:string,endTime:string): Promise<VerfiyResponse> {
       try {
      
   
        const isAvailable=await this.bookingRepositories.verifyAvaliableSlot(schedulesId,slotNumber)
        if(!isAvailable){
           console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
           throw error("this slot is not available it is already booked")
        }
        console.log(schedulesId)
        const storeBookingSlot=await this.bookingRepositories.storeToken(userId,isAvailable.doctorId,isAvailable.date,typeOfConsaltation,schedulesId,slotNumber,startTime,endTime)
        const response=await this.bookingRepositories.updatedScheduledStatus(schedulesId,slotNumber,true)
        return {status:true,message:"created successfully"}
       } catch (error) {
          throw error
       }
   }


   async verifyCancelToken(bookingID: string): Promise<void> {

       try {
         const isFindBookingData=await this.bookingRepositories.fetchBookingData(bookingID)
         console.log('hiiiiiiiiii',isFindBookingData)
         if(isFindBookingData?.isCanceled!=false){
             throw error("this tokend is already deleted")
         }

         const updatedStatus=await this.bookingRepositories.updatedScheduledStatus(isFindBookingData.scheduleId,isFindBookingData.slotNumber,false)
         console.log(updatedStatus,"shahhamsh")

         // canceled Tokens 

         await this.bookingRepositories.updatedBookingDbCanceledStatus(bookingID)
         return
       } catch (error) {
          throw error
       }

   }


   async findBookingDataWithStatus(id: string, statausType: string): Promise<IBooking | null[]> {
        try {
         return await this.bookingRepositories.fetchBookingdatasWithStatus(id,statausType)
        } catch (error) {
               throw error
        }
   }

   async verifyPaymentCheckOut(fees:number): Promise<any>{
      try {
        const data=await this.stripePayments.makePayment(fees)
        return data
       }catch (error) {
          console.log(error)
       }
   }


   async verifyWebHook(req: any): Promise<boolean> {
         try {
         return await this.stripePayments.verifySucessOfWebhook(req)
         } catch (error) {
            console.log(error)
            throw error
         }
   }





}   