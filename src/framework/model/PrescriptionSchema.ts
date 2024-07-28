import mongoose, { Model, Schema } from "mongoose";
import IPrescription from "../../entity/prescriptionEntity";

const prescription: Schema = new Schema({
  date:{
    type: Date,
    default:Date.now(),
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  pateintId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  pateintName:{
    type: String,
    required: true,
  },
  medicines: [
    {
      name:{
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      instructions: {
        type:String,
        default: "",
      },
    },
  ],
  recoverySteps: [
    {
      type: String,
    },
  ],
  slotId:{
    type:String,
    required:true
  }
});

const Prescription = mongoose.model<IPrescription>("Prescription",prescription);

export default Prescription;
