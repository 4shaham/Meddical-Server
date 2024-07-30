import { Model } from "mongoose";
import IBooking from "../../entity/bookingEntity";
import IBookingRepositories from "../../interface/repositories/IBookingRepositories";
import { Mode } from "fs";
import mongoose, { ObjectId } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import PaymentEntity from "../../entity/paymentEntity";
const { ObjectId } = mongoose.Types;

export default class BookingRepository implements IBookingRepositories {
  private bookingDb: Model<IBooking>;
  private doctorSchedule: Model<IDoctorSchedule>;
  private payment: Model<PaymentEntity>;

  constructor(
    bookingDb: Model<IBooking>,
    doctorSchedule: Model<IDoctorSchedule>,
    payment: Model<PaymentEntity>
  ) {
    this.bookingDb = bookingDb;
    this.doctorSchedule = doctorSchedule;
    this.payment = payment;
  }

  async storeToken(
    userId: string,
    doctorId: string,
    bookingDate: Date,
    typeOfConsaltation: string,
    schedulesId: string,
    slotNumber: number,
    startTime: string,
    endTime: string
  ): Promise<IBooking | null> {
    try {
      console.log(startTime, endTime);

      const data = new this.bookingDb({
        doctorId: new ObjectId(doctorId),
        date: bookingDate,
        userId: new ObjectId(userId),
        conusultationType: typeOfConsaltation,
        scheduleId: new ObjectId(schedulesId),
        slotNumber: slotNumber,
        startTime: startTime,
        endTime: endTime,
      });
      return await data.save();
    } catch (error) {
      throw error;
    }
  }

  async verifyAvaliableSlot(
    scheduleId: string,
    slotNumber: number
  ): Promise<IDoctorSchedule | null> {
    try {
      return await this.doctorSchedule.findOne({
        _id: scheduleId,
        slots: {
          $elemMatch: {
            slotNumber: slotNumber,
            isBooked:false,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updatedScheduledStatus(
    scheduleId: string,
    slotNumber: number,
    status: boolean
  ): Promise<IDoctorSchedule | null> {
    try {
      return await this.doctorSchedule.findOneAndUpdate(
        { _id: scheduleId, "slots.slotNumber": slotNumber },
        { $set: { "slots.$.isBooked": status } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async fetchBookingData(id: string): Promise<IBooking | null> {
    try {
      return await this.bookingDb.findOne({ _id: id, isCanceled: false });
    } catch (error) {
      throw error;
    }
  }

  async canceledBookingStatus(bookingId: string): Promise<IBooking | null> {
    try {
      return await this.bookingDb.findOneAndUpdate({ _id: bookingId });
    } catch (error) {
      throw error;
    }
  }

  async fetchBookingdatasWithStatus(
    id: string,
    statusType: string
  ): Promise<IBooking[]> {
    try {

      let data = await this.bookingDb.find({
        userId: id,
        tokenStatus: statusType,
        isCanceled: false,
      }).sort({ createdAt: -1 });

      console.log("dahdhf",data);
      return data
      // return await this.bookingDb.find({
      //   userId: id,
      //   tokenStatus: statusType,  
      //   isCanceled: false,
      // });
    } catch (error) {
      throw error;
    }
  }

  async updatedBookingDbCanceledStatus(id: string): Promise<IBooking | null> {
    try {
      return await this.bookingDb.findOneAndUpdate(
        { _id: id },
        { $set: { isCanceled: true } }
      );
    } catch (error) {
      throw error;
    }
  }

  async storePaymentData(
    tokenId:string,
    doctorId:string,
    transactionId: string,
    userId: string,
    amount: number,
    paymentMethod:string
  ): Promise<PaymentEntity> {
    try {

    console.log(doctorId,"dkfdjfdjfkdjfkd",transactionId,paymentMethod)

      const data = new this.payment({
        tokenId:new ObjectId(tokenId),
        doctorId:doctorId,
        transactionId:transactionId,
        userId:new ObjectId(userId),
        amount:amount,
        paymentMethod
      });
      return await data.save();


    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  
  async fetchSchedule(id: string): Promise<IDoctorSchedule | null> {
      try {
        
      return  await this.doctorSchedule.findOne({_id:id})

      } catch (error) {
         throw error
      }
  }
  

  async reschedulUpdateBookingDb(id: string, newSlotNumber: number): Promise<IDoctorSchedule|null> {
       try {
        return await this.bookingDb.findOneAndUpdate({_id:id},{$set:{slotNumber:newSlotNumber}})
       } catch (error) {
           throw error
       }
  }


}
