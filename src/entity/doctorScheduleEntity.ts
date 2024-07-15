interface SlotsData {
  startTime: string;
  endTime: string;
  isBooked: boolean;
  slotNumber: number;
  tokenId?:string
}

export default interface IDoctorSchedule {
  _id: string;
  doctorId: string;
  date: Date;
  consultationType: string;
  slots: SlotsData[];
}
