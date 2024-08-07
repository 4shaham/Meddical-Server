import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import IFetchGuestUserDataController from "../../interface/controler/IFetchGuestUserDataController";
import IFetchGuestUserDataUseCase from "../../interface/useCase/IFetchGuestUserDataUseCase";
import { StatusCode } from "../../enums/statusCode";

export default class FetchGuestUserData
  implements IFetchGuestUserDataController
{
  private fetchGuestUserDataUseCase: IFetchGuestUserDataUseCase;

  constructor(fetchGuestUserDataUseCase: IFetchGuestUserDataUseCase) {
    this.fetchGuestUserDataUseCase = fetchGuestUserDataUseCase;
  }

  async getDoctors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.fetchGuestUserDataUseCase.getDataDoctors();
      res.json(data);
    } catch (error) {
      console.log(error, "this is error");
      next(error);
    }
  }

  async getDoctorProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.query.doctorId;
      console.log("hiiiiiiiiii");

      const doctorData =
        await this.fetchGuestUserDataUseCase.getDoctorProfileData(id as string);
      res.status(StatusCode.success).json({ data: doctorData });
    } catch (error) {
      console.log("error");
      next(error);
    }
  }

  async findAllSpecality(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const response = await this.fetchGuestUserDataUseCase.getSpecalityData();
      res.status(StatusCode.success).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
