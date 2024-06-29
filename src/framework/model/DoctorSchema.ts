import mongoose, { Schema, Document, ObjectId } from "mongoose";
import IDoctor from "../../entity/doctorEntity";

const DoctorSchema: Schema = new Schema({
  
  name:{
    type: String,
    required: true,
  },
  specialty:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique:true
  },
  password:{
    type: String,
    required:true,
  },
  phoneNumber:{
    type: String,
    required: true,
  },
  approved:{ 
    type: Boolean,
    default:false
  },
  fees:{
    type: Number,
    required:true,
  },
  image:{
    type:String
  },
  isBlocked:{
    type:Boolean,
    default:false
  }
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
