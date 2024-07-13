import IDoctorSchedule from "../../entity/doctorScheduleEntity";
export interface ISlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;
    pateientId:null|string,
  }

export default interface IDoctorScheduleManagmentRepositories{
    storeDoctorSchedule(doctorId:string,date:Date,slots:Map<string,ISlot>):Promise<void>
    isDateExide(date:Date):Promise<IDoctorSchedule|null>
}