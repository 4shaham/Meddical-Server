import { error } from "console";
import IBookingRepositories from "../interface/repositories/IBookingRepositories";
import IBookingUseCase, {
  VerfiyResponse,
} from "../interface/useCase/IBookingUseCase";
import authorizationMiddleware from "../framework/Middleware/user/authorization";
import IBooking from "../entity/bookingEntity";
import { IStripe } from "../interface/utils/IStripeService";
import Errors from "../erros/errors";
import { StatusCode } from "../enums/statusCode";

export default class BookingUseCase implements IBookingUseCase {
  private bookingRepositories: IBookingRepositories;
  private stripePayments: IStripe;

  constructor(
    bookingRepositories: IBookingRepositories,
    stripePayments: IStripe
  ) {
    this.bookingRepositories = bookingRepositories;
    this.stripePayments = stripePayments;
  }

  async verifyCreateToken(
    userId: string,
    fees: number,
    typeOfConsaltation: string,
    schedulesId: string,
    slotNumber: number,
    startTime: string,
    endTime: string
  ): Promise<VerfiyResponse> {
    try {
      const isAvailable = await this.bookingRepositories.verifyAvaliableSlot(
        schedulesId,
        slotNumber
      );
      if (!isAvailable) {
        console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
        throw error("this slot is not available it is already booked");
      }
      console.log(schedulesId);
      const storeBookingSlot = await this.bookingRepositories.storeToken(
        userId,
        isAvailable.doctorId,
        isAvailable.date,
        typeOfConsaltation,
        schedulesId,
        slotNumber,
        startTime,
        endTime
      );
      const response = await this.bookingRepositories.updatedScheduledStatus(
        schedulesId,
        slotNumber,
        true
      );
      return { status: true, message:"created successfully",slotId:storeBookingSlot?._id as string,doctorId:isAvailable.doctorId};
    } catch (error) {
      throw error;
    }
  }

  async verifyCancelToken(bookingID: string): Promise<void> {
    try {
      const isFindBookingData = await this.bookingRepositories.fetchBookingData(
        bookingID
      );
      if (isFindBookingData?.isCanceled != false) {
        throw error("this tokend is already deleted");
      }

      const updatedStatus =
        await this.bookingRepositories.updatedScheduledStatus(
          isFindBookingData.scheduleId,
          isFindBookingData.slotNumber,
          false
        );
      console.log(updatedStatus, "shahhamsh");

      // canceled Tokens

      await this.bookingRepositories.updatedBookingDbCanceledStatus(bookingID);
      return;
    } catch (error) {
      throw error;
    }
  }

  async findBookingDataWithStatus(
    id: string,
    statausType: string
  ): Promise<IBooking[]> {
    try {
      return await this.bookingRepositories.fetchBookingdatasWithStatus(
        id,
        statausType
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyPaymentCheckOut(fees: number): Promise<any> {
    try {
      const data = await this.stripePayments.makePayment(fees);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async verifyWebHook(req: any): Promise<boolean> {
    try {
      return await this.stripePayments.verifySucessOfWebhook(req);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async savePaymentData(
    tokenId: string,
    scheduleId: string,
    transactionId: string,
    userId: string,
    amount: number,
    paymentMethod: string,
    slotNumber:number
  ): Promise<void> {
    try {

    const scheduleData=await this.bookingRepositories.fetchSchedule(scheduleId)
    await this.bookingRepositories.storePaymentData(tokenId,scheduleData?.doctorId as string,transactionId,userId,amount,paymentMethod)


    } catch (error) {
        
      throw error

    }
  }


  async isRescheduling(slotId: string, slotNumber: number,scheduleId: string,newSlotNumber:number): Promise<void> {
      try {
         

        const isAvailable = await this.bookingRepositories.verifyAvaliableSlot(
          scheduleId,
          newSlotNumber
        );

        console.log("isAvailable",isAvailable)
        if(!isAvailable){
           throw new Errors("this slot is not available",StatusCode.badRequest)
        }
         
        await this.bookingRepositories.updatedScheduledStatus(scheduleId,slotNumber,false)
        await this.bookingRepositories.updatedScheduledStatus(scheduleId,newSlotNumber,true)

        await this.bookingRepositories.reschedulUpdateBookingDb(slotId,newSlotNumber)

        


      } catch (error) {
         throw error
      }   
  }


  async createConverasation(userId: string, doctorId: string): Promise<void> {
      try {

        const isData=await this.bookingRepositories.isExists(userId,doctorId)

        if(!isData){
            await this.bookingRepositories.storeConverasation(userId,doctorId)
        }

        
      } catch (error) {
         throw error
      }
  }


}
