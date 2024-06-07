import { Request, Response } from "express";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";

export default class DoctorAuthController implements IDoctorAuthController {
  private doctorAuthUseCase: DoctorAuthUseCase;
  constructor(doctorAuthUseCase: DoctorAuthUseCase) {
    this.doctorAuthUseCase = doctorAuthUseCase;
  }

  async register(
    req: globalThis.Request,
    res: globalThis.Response
  ): Promise<void> {

  }

  async login(
    req: globalThis.Request,
    res: globalThis.Response
  ): Promise<void> {
    
  }
}
