import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IDoctorScheduleManagementController from "../../interface/controler/IDoctorScheduleManagementController";
import IDoctorScheduleManagementUseCase from "../../interface/useCase/IDoctorScheduleManagementUseCase";
import { StatusCode } from "../../enums/statusCode";




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
    req: Request,
    res: Response,
    next:NextFunction
  ): Promise<void> {
    try{             
      const{doctorId,date,startTime,endTime,intervals}=req.body
      const response= await this.doctorScheduleManagementUseCase.addDoctorSchedule(doctorId,date,startTime,endTime,intervals)   
      res.status(StatusCode.success).json({message:"successfully added"})
    }catch (error) {
        next(error)   
    }
  }

  async findPerticularDateSchedule(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {
            
             
             const date=req.query.date
             console.log('hiiiiiii',date)



         } catch (error) {
            console.log(error)
         }
  }

}
