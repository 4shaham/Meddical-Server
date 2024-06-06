import { Document, ObjectId } from "mongoose";

export default interface IUserOtp extends Document {
  Email: string | null;
  Number: string | null;
  _id: ObjectId;
  createdAt: Date;
}
