import mongoose, { Schema } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";




const DoctorScheduleSchema: Schema = new Schema({
  doctorId: {
    type:Schema.Types.ObjectId,
  },
  date:{
    type:Date,
    required: true,
  },
  consultationType:{
    type:String
  },
  slots: [
    {
      startTime: {
        type:String,
        required: true,
      },
      endTime: {
        type:String,
        required: true,
      },
      isBooked: {
        type: Boolean,
      },
      slotNumber:{
        type:Number
      },
      tokenId:{
        type:mongoose.Types.ObjectId,
      }
    },
  ]
});

const DoctorSchedule=mongoose.model<IDoctorSchedule>("DoctorSchedule",DoctorScheduleSchema)

export default DoctorSchedule