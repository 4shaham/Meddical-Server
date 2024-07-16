import { Model } from "mongoose";
import IBooking from "../../entity/bookingEntity";
import IBookingRepositories from "../../interface/repositories/IBookingRepositories";
import { Mode } from "fs";
import mongoose, { ObjectId } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
const { ObjectId } = mongoose.Types;

export default class BookingRepository implements IBookingRepositories {
  private bookingDb: Model<IBooking>;
  private doctorSchedule: Model<IDoctorSchedule>;

  constructor(
    bookingDb: Model<IBooking>,
    doctorSchedule: Model<IDoctorSchedule>
  ) {
    this.bookingDb = bookingDb;
    this.doctorSchedule = doctorSchedule;
  }

  async storeToken(
    userId: string,
    doctorId: string,
    bookingDate: Date,
    typeOfConsaltation: string,
    schedulesId: string,
    slotNumber:number
  ): Promise<IBooking | null> {
    try {
      const data = new this.bookingDb({
        doctorId:new ObjectId(doctorId),
        date: bookingDate,
        userId:new ObjectId(userId),
        conusultationType: typeOfConsaltation,
        scheduleId:new ObjectId(schedulesId),
        slotNumber:slotNumber, 
      });
      return await data.save();
    } catch (error) {
      throw error;
    }
  }

  async verifyAvaliableSlot(
    scheduleId: string,
    slotNumber:number
  ): Promise<IDoctorSchedule | null> {
    try {
    
      return await this.doctorSchedule.findOne({
        _id:scheduleId,
        slots: {
          $elemMatch: {
            slotNumber:slotNumber,
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
    slotNumber:number,
    status:boolean
  ): Promise<IDoctorSchedule|null>{
    try {
      return await this.doctorSchedule.findOneAndUpdate({_id:scheduleId,"slots.slotNumber":slotNumber},{$set:{"slots.$.isBooked":status}},{new:true})
    } catch (error){
      throw error;
    }
  }


  async fetchBookingData(id: string): Promise<IBooking|null> {
     try {
        return await this.bookingDb.findOne({_id:id,isCanceled:false})
     } catch (error) {
        throw error
     }
  }

  async canceledBookingStatus(bookingId: string): Promise<IBooking | null> {
      try {
        return await this.bookingDb.findOneAndUpdate({_id:bookingId})
      } catch (error) {
         throw error
      }
  }

  async fetchBookingdatasWithStatus(id: string,statusType:string): Promise<IBooking | null[]> {
     try {

      const agg = [
        {
          '$match': {
            'userId':new ObjectId(id), 
            'tokenStatus':statusType
          }
        }, {
          '$lookup': {
            'from': 'doctorschedules', 
            'localField': 'scheduleId', 
            'foreignField': '_id', 
            'as': 'scheduleDatas'
          }
        }, {
          '$unwind': {
            'path': '$scheduleDatas'
          }
        }, {
          '$unwind': {
            'path': '$scheduleDatas.slots'
          }
        }
      ];
       let o = {}
      const a:any=await this.bookingDb.aggregate(agg)
      console.log(a)
      // if(a && a.scheduleDatas.slots.slotNumber){
      //    o=a.schedulesData.slots.find((val:any)=>{
      //     return val.slotNumber===a.slotNumber
      // })
      // }
     
      console.log(o,'Priyanjith kandupidtham')
      return await this.bookingDb.find({userId:id,tokenStatus:statusType,isCanceled:false})
      
    

     } catch (error) {
       throw error
     }
  }

  
  async updatedBookingDbCanceledStatus(id: string): Promise<IBooking | null> {
      try {
         return await this.bookingDb.findOneAndUpdate({_id:id},{$set:{isCanceled:true}})
      } catch (error) {
         throw error
      }
  }

}
