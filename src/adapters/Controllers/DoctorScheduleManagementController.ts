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
    next: NextFunction
  ): Promise<void> {
    try {

      console.log(req.body)

      const { doctorId, date, startTime, endTime, intervals,consultationMethod} = req.body;
      const token=req.cookies.doctorToken
      const response =
        await this.doctorScheduleManagementUseCase.addDoctorSchedule(
          token,
          date,
          consultationMethod,
          startTime,
          endTime,
          intervals
        );
      res.status(StatusCode.success).json({ message: "successfully added" });
    } catch (error) {
      next(error);
    }
  }

  async findPerticularDateSchedule(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const date = req.query.date;
      const id = req.query.doctorId;

      const newDate = new Date(date as string);
      console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii')
      const schedule =
        await this.doctorScheduleManagementUseCase.findDoctorScedulePerticularDate(
          newDate,
          id as string
        );
      console.log(schedule);
      res.status(StatusCode.success).json(schedule);
    } catch (error) {
      console.log(error);
    }
  }




}
