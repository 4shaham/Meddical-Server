

import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import IDoctor from '../../interface/collection/IDoctor';


const DoctorSchema: Schema = new Schema({
  name: { type: String },
  specialist: { type: String },
  email: { type: String },
  licenseNumber: { type: String },
  password: { type: String },
  phoneNumber: { type: String },
  licenseImage: { type: String },
  yearsOfExperience: { type: Date },
  languages: [{ type: String }],
  approved: { type: Boolean },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  achievements: [{
    date: { type: Date },
    description: { type: String },
    title: { type: String },
  }],
  experiences: [{}],
  appliedStatus: { type: String },
  fees: { type: Number },
});

const Doctor = mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;
