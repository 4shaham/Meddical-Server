import { Model } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import IDoctorScheduleManagementRepositories, {
  BookingDataWithUserData,
  ISlot,
} from "../../interface/repositories/IDoctorScheduleManagmentRepositories";
import mongoose, { ObjectId } from "mongoose";
import IBooking from "../../entity/bookingEntity";
import IDoctor from "../../entity/doctorEntity";
import IPrescription from "../../entity/prescriptionEntity";

const { ObjectId } = mongoose.Types;

export default class DoctorScheduleManagementRepository
  implements IDoctorScheduleManagementRepositories
{
  private doctorSchedule: Model<IDoctorSchedule>;
  private bookingDb: Model<IBooking>;
  private doctor:Model<IDoctor>;
  private prescription:Model<IPrescription>;

  constructor(
    doctorSchedule: Model<IDoctorSchedule>,
    bookingDb: Model<IBooking>,
    doctor:Model<IDoctor>,
    prescription:Model<IPrescription>,
  ) {
    this.doctorSchedule = doctorSchedule;
    this.bookingDb = bookingDb;
    this.doctor=doctor;
    this.prescription=prescription
    
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
  ): Promise<BookingDataWithUserData[]> {
    
    try {
      const today = new Date();
      const dateString = today.toISOString().split("T")[0];

      const data = await this.bookingDb.aggregate([
        {
          '$match': {
            'doctorId': new ObjectId('669752a3f7656c05c4987d2f'), 
            'date': new Date(dateString)
          }
        },{
          '$lookup': {
            'from': 'users', 
            'localField': 'userId', 
            'foreignField': '_id', 
            'as': 'userData'
          }
        },{
          '$unwind': {
            'path': '$userData'
          }
        },{
          $sort:{
            "slotNumber":1
          }
        }
      ]);
      return data;
    } catch (error) {
      throw error;
    }
  }


  async getDoctorData(doctorId: string): Promise<IDoctor|null> {
     try {
        
      return await this.doctor.findOne({_id:doctorId})

     } catch (error) {
       throw error
     }
  }



  async storePrescription(description: string, medicines:Object[], recoverySteps:string[], patientId:string, patientName: string, doctorID: string, doctorName: string,slotId:string): Promise<IPrescription> {
      try{
        console.log(description,medicines,patientName,doctorID,patientId)
        const data= new this.prescription({
          doctorId:doctorID,
          doctorName:doctorName,
          pateintId:patientId,
          pateintName:patientName,
          medicines:medicines,
          recoverySteps:recoverySteps,
          slotId:slotId
        })   
       return await data.save()

      } catch (error) {
        console.log("error")
         throw error
      }

  }


  async PateintStatusChanged(bookingSlot: string): Promise<IBooking|null> {
      try {
        
      return  await this.bookingDb.findByIdAndUpdate({_id:bookingSlot},{$set:{tokenStatus:"visited"}},{new:true})

      } catch (error) {
         throw error
      }
  }






}
