import { Model } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import IDoctorScheduleManagementRepositories, {
  ISlot,
} from "../../interface/repositories/IDoctorScheduleManagmentRepositories";
import mongoose, { ObjectId } from "mongoose";
import IBooking from "../../entity/bookingEntity";

const { ObjectId } = mongoose.Types;

export default class DoctorScheduleManagementRepository
  implements IDoctorScheduleManagementRepositories
{
  private doctorSchedule: Model<IDoctorSchedule>;
  private bookingDb: Model<IBooking>;

  constructor(
    doctorSchedule: Model<IDoctorSchedule>,
    bookingDb: Model<IBooking>
  ) {
    this.doctorSchedule = doctorSchedule;
    this.bookingDb = bookingDb;
  }

  async storeDoctorSchedule(
    doctorId: string,
    date: Date,
    consultationMethod: string,
    slots: ISlot[]
  ): Promise<void> {
    try {
      console.log(doctorId, date, slots);

      const dId = new ObjectId(doctorId);

      const doctorSchedule = new this.doctorSchedule({
        doctorId: dId,
        date: date,
        consultationType: consultationMethod,
        slots: slots,
      });
      await doctorSchedule.save();
    } catch (error) {
      console.log("erehuheurhuerhuehrueh", error);
      throw error;
    }
  }

  async isDateExide(date: Date, id: string): Promise<IDoctorSchedule | null> {
    try {
      const doctorId = new ObjectId(id);
      return await this.doctorSchedule.findOne({
        date: date,
        doctorId: doctorId,
      });
    } catch (error) {
      throw error;
    }
  }

  async fetchDoctorsAllSchedule(id: string): Promise<IDoctorSchedule | null[]> {
    try {
      return await this.doctorSchedule.find({ doctorId: new ObjectId(id) });
    } catch (error) {
      throw error;
    }
  }

  async findDoctorSlotedBookedData(
    doctorId: string,
    date: Date
  ): Promise<IBooking[]> {
    try {
     

      const today = new Date();
      const dateString = today.toISOString().split("T")[0];


      const bookings = await this.bookingDb
        .find({ doctorId: doctorId, date:new Date(dateString)})
        .sort({ slotNumber: 1 });
      return bookings;

    }catch (error) {
      throw error;
    }

  }

  


}
