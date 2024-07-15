import IBookingRepositories from "../interface/repositories/IBookingRepositories";
import IBookingUseCase from "../interface/useCase/IBookingUseCase";


export default class BookingUseCase implements IBookingUseCase {

   private bookingRepositories:IBookingRepositories
   constructor(bookingRepositories:IBookingRepositories){
      this.bookingRepositories=bookingRepositories
   }


   async verifyCreateToken(userId:string,doctorId:string,bookingDate:Date,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number): Promise<void> {
       try {
         
        console.log(userId,doctorId,bookingDate,bookingDate,fees,typeOfConsaltation,schedulesId,slotNumber)
        const response=await this.bookingRepositories.sotreToken(userId,doctorId,bookingDate,typeOfConsaltation,schedulesId)    
       } catch (error) {
          throw error
       }
   }


}