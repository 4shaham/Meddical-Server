import IBooking from "../../entity/bookingEntity";
import IDoctor from "../../entity/doctorEntity";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import IPrescription from "../../entity/prescriptionEntity";
import IUser from "../../entity/userEntity";

export interface ISlot {
    startTime: string;
    endTime: string;
    isBooked: boolean;  
    slotNumber:number,
}


export interface BookingDataWithUserData extends IBooking{
    userData:IUser
}



export default interface IDoctorScheduleManagmentRepositories{

    storeDoctorSchedule(doctorId:string,date:Date,consultationMethod:string,slots:ISlot[]):Promise<void>
    isDateExide(date:Date,id:string):Promise<IDoctorSchedule|null>
    fetchDoctorsAllSchedule(id:string):Promise<IDoctorSchedule|null[]>
    findDoctorSlotedBookedData(doctorId:string,date:Date):Promise<BookingDataWithUserData[]>
    storePrescription(description:string,medicines:Object[],recoverySteps:string[],patientId:string,patientName:string,doctorID:string,doctorName:string,slotId:string):Promise<IPrescription>
    getDoctorData(doctorId:string):Promise<IDoctor|null>
    PateintStatusChanged(bookingSlot:string):Promise<IBooking|null>
    storeScheduleInAlreadyAddedDate(scheduleId:string,slots:ISlot[]):Promise<void>
}