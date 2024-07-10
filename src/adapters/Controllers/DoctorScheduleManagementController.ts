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
        console.log('hiiii',req.body)
         
        // const startTime=req.body.startTime
        // const endTime=req.body.endTime


        //   const timeToMinutes = (time:any) => {
        //     const [hours, minutes] = time.split(':').map(Number);
        //     return hours * 60 + minutes;
        //   };
          
        //   // Convert startTime and endTime to total minutes
        //   const startMinutes = timeToMinutes(startTime);
        //   const endMinutes = timeToMinutes(endTime);
          
        //   // Calculate total available minutes
        //   const totalAvailableMinutes = endMinutes - startMinutes;
          
        //   // Convert totalAvailableMinutes back to HH:mm format for display or further use
        //   const availableHours = Math.floor(totalAvailableMinutes / 60);
        //   const availableMinutes = totalAvailableMinutes % 60;
        //   const availableTime = `${availableHours}:${availableMinutes}`;
          
        //   console.log('Available time:', availableTime);



    } catch (error) {
        
    }
  }
}
