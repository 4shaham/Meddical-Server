import { Request, Response } from "express";
import DoctorAuthUseCase from "../../useCase/DoctorAuthUseCase";

export default class DoctorAuthController {
  private doctorAuthUseCase: DoctorAuthUseCase;
  constructor(doctorAuthUseCase: DoctorAuthUseCase) {
    this.doctorAuthUseCase = doctorAuthUseCase;
  }
}
