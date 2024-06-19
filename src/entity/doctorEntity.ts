import { Document } from "mongoose";

interface Achievements {
  data: Date;
  description: string;
  title: string;
}

enum AppliedStatus {
  Approved = "approved",
  Applied = "applied",
  Rejected = "rejected",
}

export default interface IDoctor {
  _id: string;
  name: string;
  specialist: string;
  email: string;
  licenseNumber: string;
  password: string;
  phoneNumber: string;
  licenseImage: string;
  yearsOfExperience: Date;
  languages: string[];
  approved: boolean;
  achievements: Achievements[];
  experiences: string[];
  appliedStatus: AppliedStatus;
  fees: number;
  image: string;
}
