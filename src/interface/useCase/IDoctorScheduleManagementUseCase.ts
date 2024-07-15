import IDoctorSchedule from "../../entity/doctorScheduleEntity"


export interface intevalsValues{
       type:string,startTime:string, endTime:string 
}

export default interface IDoctorScheduleManagementUseCase {
      addDoctorSchedule(token:string,date:Date,consultationMethod:string,startTime:string,endTime:string,interval?:intevalsValues[]):Promise<void>
      findDoctorScedulePerticularDate(date:Date,doctorId:string):Promise<IDoctorSchedule|null>
}