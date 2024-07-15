import IBookingRepositories from "../interface/repositories/IBookingRepositories";
import IBookingUseCase from "../interface/useCase/IBookingUseCase";


export default class BookingUseCase implements IBookingUseCase {

   private bookingRepositories:IBookingRepositories
   constructor(bookingRepositories:IBookingRepositories){
      this.bookingRepositories=bookingRepositories
   }
    

}