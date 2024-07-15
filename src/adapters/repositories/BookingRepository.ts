import { Model } from "mongoose";
import IBooking from "../../entity/bookingEntity";
import IBookingRepositories from "../../interface/repositories/IBookingRepositories";
import { Mode } from "fs";
import mongoose, { ObjectId } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
const { ObjectId } = mongoose.Types;

export default class BookingRepository implements IBookingRepositories {
  private bookingDb: Model<IBooking>;
  private doctorSchedule:Model<IDoctorSchedule>

  constructor(bookingDb: Model<IBooking>,doctorSchedule:Model<IDoctorSchedule>){
      this.bookingDb = bookingDb;
      this.doctorSchedule=doctorSchedule
  }


  async sotreToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string): Promise<IBooking | null> {
    try {
     
     const dId=new ObjectId(doctorId)
     const uId=new ObjectId(userId)
     const sId=new ObjectId(schedulesId)

     const data=new this.bookingDb({
        doctorId:dId,
        date:bookingDate,
        tokenId:sId,
        userId:uId,
        conusultationType:typeOfConsaltation
     })   
     return await data.save() 
    }catch (error) {
      throw error;
    }
  }

  async verifyAvaliableSlot(doctorID: string, bookingDate:Date, schedulesId: string): Promise<IDoctorSchedule|null> {
      try {
        console.log(typeof(bookingDate))

        const dId=new ObjectId(doctorID)
        return await this.doctorSchedule.findOne({doctorId:dId,date:bookingDate, slots: {
            $elemMatch: {
              _id: new ObjectId(schedulesId) 
            }
        }})
      } catch (error) {
         throw error
      }
  }


}
