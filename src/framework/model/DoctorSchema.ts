import mongoose, { Schema, Document, ObjectId } from "mongoose";
import IDoctor from "../../entity/doctorEntity";

const DoctorSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  specialist: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required:true,
  },
  phoneNumber:{
    type: String,
    required: true,
  },
  licenseImage: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: Date,
    required:true
  },
  languages: [{
     type: String ,
     required:true
  }],
  approved:{ 
    type: Boolean,
    default:false
  },
  achievements: [
    {
      date: { type: Date },
      description: { type: String },
      title: { type: String },
    },
  ],
  experiences:[{type:String}],
  appliedStatus: {
    type: String,
    enum: ["approved", "applied", "rejected"], 
    default: "applied",
  },
  fees:{
    type: Number,
    required:true 
  },
  image:{
    type:String
  }
});

const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
