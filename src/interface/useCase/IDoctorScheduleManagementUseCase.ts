import IBooking from "../../entity/bookingEntity"
import IDoctorSchedule from "../../entity/doctorScheduleEntity"


export interface intevalsValues{
       type:string,startTime:string, endTime:string 
}

export default interface IDoctorScheduleManagementUseCase {
      addDoctorSchedule(token:string,date:Date,consultationMethod:string,startTime:string,endTime:string,interval?:intevalsValues[]):Promise<void>
      findDoctorSchedulePerticularDate(date:Date,doctorId:string):Promise<IDoctorSchedule|null>
      findDoctorAllSchedule(id:string):Promise<IDoctorSchedule|null[]>
      findDoctorBookingData(doctorId:string,date:Date):Promise<IBooking[]>
      addPrescription(description:string,medicines:Object[],recoverySteps:string,patientId:string,patientName:string,doctorID:string,slotId:string):Promise<void>
      
}