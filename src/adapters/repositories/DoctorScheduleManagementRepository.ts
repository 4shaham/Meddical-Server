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
    doctorId: string,
    date: Date,
    slots: Map<string, ISlot>
  ): Promise<void> {
    try {
      console.log(doctorId, date, slots);
      const dId = new ObjectId(doctorId);

      const doctorSchedule = new this.doctorSchedule({
        doctorId: dId,
        date: date,
        slots: slots,
      });

      await doctorSchedule.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async isDateExide(date: Date): Promise<IDoctorSchedule | null> {
             try {

              return this.doctorSchedule.findOne({date:date})
              
             } catch (error) {
               console.log(error)
               throw error
             }  
  }



}
