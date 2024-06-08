import { Request, Response } from "express";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";
import IDoctorUseCase from "../../interface/useCase/IDoctorUseCase";

export default class DoctorAuthController implements IDoctorAuthController {
  private doctorAuthUseCase:IDoctorUseCase;
  constructor(doctorAuthUseCase:IDoctorUseCase) {
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
