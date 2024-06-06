
import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import IUserOtp from '../../interface/collection/IotpUser';


const OtpSchema: Schema = new Schema({

  Email: { type: String },
  Number: { type: String },
  createdAt: { type: Date, default: Date.now }

});


OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Otp = mongoose.model<IUserOtp>('Otp', OtpSchema);                

export default Otp;
