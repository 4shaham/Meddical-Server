import mongoose, { Schema } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";




const DoctorScheduleSchema: Schema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
  },
  date:{
    type:Date,
    required: true,
  },
  slots:{
    type: Map,
  }
  // slots: [
  //   {
  //     startTime: {
  //       type: Date,
  //       required: true,
  //     },
  //     endTime: {
  //       type: Date,
  //       required: true,
  //     },
  //     isBooked: {
  //       type: Boolean,
  //     },
  //     patientId: {
  //       type: Schema.Types.ObjectId,
  //       default: null,
  //     },
  //     slotNumber:{
  //       type:Number
  //     }
  //   },
  // ],
});

const DoctorSchedule=mongoose.model<IDoctorSchedule>("DoctorSchedule",DoctorScheduleSchema)

export default DoctorSchedule

