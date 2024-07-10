import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

import IFetchGuestUserDataController from "../../interface/controler/IFetchGuestUserDataController";
import IFetchGuestUserDataUseCase from "../../interface/useCase/IFetchGuestUserDataUseCase";

export default class FetchGuestUserData
  implements IFetchGuestUserDataController
{
  private fetchGuestUserDataUseCase: IFetchGuestUserDataUseCase;

  constructor(fetchGuestUserDataUseCase: IFetchGuestUserDataUseCase) {
    this.fetchGuestUserDataUseCase = fetchGuestUserDataUseCase;
  }

  async getDoctors(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      console.log("hiii shaham");

      let data = await this.fetchGuestUserDataUseCase.getDataDoctors();
      console.log(data);
      res.json(data)
    } catch (error) {
        console.log(error,"this is error")
    }
  }
}
