import { Document, ObjectId } from "mongoose";

export default interface IUserOtp extends Document {
  email: string | null;
  otp: string | null;
  _id: ObjectId;
  createdAt: Date;
}
