import { Model } from "mongoose";
import IBooking from "../../entity/bookingEntity";
import IBookingRepositories from "../../interface/repositories/IBookingRepositories";
import { Mode } from "fs";
import mongoose, { ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

export default class BookingRepository implements IBookingRepositories {
  private bookingDb: Model<IBooking>;
  constructor(bookingDb: Model<IBooking>) {
    this.bookingDb = bookingDb;
  }


  async sotreToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string): Promise<IBooking | null> {
    try {
     
     const dId=new ObjectId(doctorId)
     const uId=new ObjectId(userId)
     const sId=new ObjectId(schedulesId)

     const data=new this.bookingDb({
        doctorId:dId,
        date:Date,
        tokenId:sId,
        userId:uId,
        conusultationType:typeOfConsaltation
     })   
     return await data.save() 
    }catch (error) {
      throw error;
    }
  }



}
