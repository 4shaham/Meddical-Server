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
      const dId = new ObjectId(doctorId);

      const doctorSchedule = new this.doctorSchedule({
        doctorId: dId,
        date: date,
        slots: slots,
      });
      await doctorSchedule.save();
    } catch (error) {
      throw error;
    }
  }

  async isDateExide(date: Date): Promise<IDoctorSchedule | null> {
    try {
      return await this.doctorSchedule.findOne({ date: date });
    } catch (error) {
      throw error;
    }
  }
}
