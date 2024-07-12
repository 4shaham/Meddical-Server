

export interface intevalsValues{
       type:string,startTime:string, endTime:string 
}

export default interface IDoctorScheduleManagementUseCase {
      addDoctorSchedule(doctorId:string,date:Date,startTime:string,endTime:string,interval?:intevalsValues[]):Promise<void>
}