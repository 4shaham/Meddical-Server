import { Model } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import IDoctorScheduleManagementRepositories, {
  ISlot,
} from "../../interface/repositories/IDoctorScheduleManagmentRepositories";
import mongoose, { ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

export default class DoctorScheduleManagementRepository
  implements IDoctorScheduleManagementRepositories
{
  private doctorSchedule: Model<IDoctorSchedule>;
  constructor(doctorSchedule: Model<IDoctorSchedule>) {
    this.doctorSchedule = doctorSchedule;
  }



  async storeDoctorSchedule(
    doctorId:string, date: Date, consultationMethod: string, slots: ISlot[]
  ): Promise<void> {
    try {
      console.log(doctorId,date,slots);
      
      const dId = new ObjectId(doctorId);

      const doctorSchedule = new this.doctorSchedule({
        doctorId:dId,
        date:date,
        consultationType:consultationMethod,
        slots:slots,
      });
      await doctorSchedule.save();
    } catch (error) {
      console.log('erehuheurhuerhuehrueh',error)
      throw error;
    }
  }

  async isDateExide(date:Date,id:string): Promise<IDoctorSchedule | null> {
    try {
      const doctorId=new ObjectId(id)
      return await this.doctorSchedule.findOne({date:date,doctorId:doctorId});
    } catch (error) {
      throw error;
    }
  }

  



} 
