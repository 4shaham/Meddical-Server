import { BlobOptions } from "buffer";
import { Document } from "mongoose";





export default interface IDoctor {
  _id: string;
  name: string;
  specialty: string;
  email: string;
  password: string;
  phoneNumber: string;
  approved: boolean;
  fees: number;
  image: string;
  isBlocked:boolean;
}
