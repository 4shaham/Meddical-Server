export interface Medicine {
  name: string;
  dosage: string;
  instructions?: string;
}

export default interface IPrescription {
  _id:string  
  date: Date;
  doctorId:string;
  doctorName: string;
  diagnosis:string
  pateintId:string;
  patientName: string;
  medicines: Medicine[];
  recoverySteps: string[];
  slotId:string
}
