import { Document} from "mongoose";

export default interface IDoctor extends Document {
    _id: string;
    name: string | null;
    specialist: string | null;
    email: string | null;
    licenseNumber: string | null;
    password: string | null;
    phoneNumber: string | null;
    licenseImage: string | null;
    yearsOfExperience: Date | null;
    languages: string[] | null;
    approved: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    achievements: {
      date: Date | null;
      description: string | null;
      title: string | null;
    }[];
    experiences: any[]; 
    appliedStatus: string | null;
    fees: number | null;
  }