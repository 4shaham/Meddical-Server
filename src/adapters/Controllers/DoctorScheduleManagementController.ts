import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IDoctorScheduleManagementController from "../../interface/controler/IDoctorScheduleManagementController";
import IDoctorScheduleManagementUseCase from "../../interface/useCase/IDoctorScheduleManagementUseCase";
import { StatusCode } from "../../enums/statusCode";
import IRequest from "../../interface/controler/Request";
import { Date } from "mongoose";

export default class DoctorScheduleManagementController
  implements IDoctorScheduleManagementController
{
  private doctorScheduleManagementUseCase:IDoctorScheduleManagementUseCase;
  constructor(
    doctorScheduleManagmementUseCase: IDoctorScheduleManagementUseCase
  ) {
    this.doctorScheduleManagementUseCase = doctorScheduleManagmementUseCase;
  }

  async addSchedules(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log(req.body);
      const {
        doctorId,
        date,
        startTime,
        endTime,
        interval,
        consultationMethod,
      } = req.body;
      const token = req.cookies.doctorToken;

      console.log("hshahshhshdhfd", interval);

      const response =
        await this.doctorScheduleManagementUseCase.addDoctorSchedule(
          token,
          date,
          consultationMethod,
          startTime,
          endTime,
          interval
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

      const schedule =
        await this.doctorScheduleManagementUseCase.findDoctorSchedulePerticularDate(
          newDate,
          id as string
        );
      res.status(StatusCode.success).json(schedule);
    } catch (error) {
      next(error);
    }
  }

  async findAllScehdules(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const responseData =
        await this.doctorScheduleManagementUseCase.findDoctorAllSchedule(
          req.doctorID as string
        );
      res.json({ data: responseData });
    } catch (error) {
      next(error);
    }
  }

  async findBookingSlotWithDate(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      
      // const date=new Date(Date.now())

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const id = req.doctorID;
      const responseData =
        await this.doctorScheduleManagementUseCase.findDoctorBookingData(
          id as string,
          tomorrow
        );
      res.status(StatusCode.success).json({ doctorSchedule: responseData });
    } catch (error) {
      next(error);
    }
  }


  // createPrescription 

  async createPrescription(req: IRequest, res: Response, next: NextFunction): Promise<void> {
       try {
        console.log("entered the routees of add Prescriition",req.body)
        const {description,medicines,recoverySteps,patientId,patientName,slotId}=req.body
        const doctorId=req.doctorID
        await this.doctorScheduleManagementUseCase.addPrescription(description,medicines,recoverySteps,patientId,patientName,doctorId as string,slotId)
        res.status(StatusCode.success).json({message:"successfull added Prescription"})
  
       } catch (error) {
          console.log(error)
          next(error)
       }
  }

  



}
