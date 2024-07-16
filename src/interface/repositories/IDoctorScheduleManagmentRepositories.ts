import IDoctorSchedule from "../../entity/doctorScheduleEntity";

export interface ISlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;  
    slotNumber:number,
}

export default interface IDoctorScheduleManagmentRepositories{
    storeDoctorSchedule(doctorId:string,date:Date,consultationMethod:string,slots:ISlot[]):Promise<void>
    isDateExide(date:Date,id:string):Promise<IDoctorSchedule|null>
    fetchDoctorsAllSchedule(id:string):Promise<IDoctorSchedule|null[]>
}