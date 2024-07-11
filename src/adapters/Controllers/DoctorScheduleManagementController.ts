import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IDoctorScheduleManagementController from "../../interface/controler/IDoctorScheduleManagementController";
import IDoctorScheduleManagementUseCase from "../../interface/useCase/IDoctorScheduleManagementUseCase";

export default class DoctorScheduleManagementController
  implements IDoctorScheduleManagementController
{
  private doctorScheduleManagementUseCase: IDoctorScheduleManagementUseCase;

  constructor(
    doctorScheduleManagmementUseCase: IDoctorScheduleManagementUseCase
  ) {
    this.doctorScheduleManagementUseCase = doctorScheduleManagmementUseCase;
  }

  async addSchedules(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
       
    
        
      const{doctorId,startDate,startTime,endTime,intervals}=req.body
      
      const response= await this.doctorScheduleManagementUseCase.addDoctorSchedule(doctorId,startDate,startTime,endTime,intervals)
         
       



    } catch (error) {
        console.log(error)
    }
  }
}
