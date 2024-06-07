
import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import IUserOtp from '../../interface/collection/IotpUser';


const OtpSchema: Schema = new Schema({

  email: { type: String },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now }

});


OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });


const Otp = mongoose.model<IUserOtp>('Otp', OtpSchema);                

export default Otp;
