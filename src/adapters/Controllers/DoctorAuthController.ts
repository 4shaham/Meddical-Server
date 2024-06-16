import { Request, Response } from "express";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";
import IDoctorUseCase from "../../interface/useCase/IDoctorUseCase";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

export default class DoctorAuthController implements IDoctorAuthController {
  private doctorAuthUseCase: IDoctorUseCase;
  constructor(doctorAuthUseCase: IDoctorUseCase) {
    this.doctorAuthUseCase = doctorAuthUseCase;
  }
  async register(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {

  }
  async login(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ):Promise<void> {

    try {
      const {email,Password}=req.body
      await this.doctorAuthUseCase.DoctorAuth(email,Password)

    } catch (error) {
      
    }
   
   

  }
}
