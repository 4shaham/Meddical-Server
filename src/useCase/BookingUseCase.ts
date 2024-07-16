import { error } from "console";
import IBookingRepositories from "../interface/repositories/IBookingRepositories";
import IBookingUseCase, { VerfiyResponse } from "../interface/useCase/IBookingUseCase";
import authorizationMiddleware from "../framework/Middleware/user/authorization";
import IBooking from "../entity/bookingEntity";


export default class BookingUseCase implements IBookingUseCase {

   private bookingRepositories:IBookingRepositories
   constructor(bookingRepositories:IBookingRepositories){
      this.bookingRepositories=bookingRepositories
   }


   async verifyCreateToken(userId:string,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number): Promise<VerfiyResponse> {
       try {
      
   
        const isAvailable=await this.bookingRepositories.verifyAvaliableSlot(schedulesId,slotNumber)
        if(!isAvailable){
           console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
           throw error("this slot is not available it is already booked")
        }
        console.log(schedulesId)
        const storeBookingSlot=await this.bookingRepositories.storeToken(userId,isAvailable.doctorId,isAvailable.date,typeOfConsaltation,schedulesId,slotNumber)
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


}