import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IAdminController from "../../interface/controler/IAdminController";
import IAdminUseCase from "../../interface/useCase/IAdminUseCase";

export default class AdminController implements IAdminController {
  private adminUseCase: IAdminUseCase;
  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async adminLogin(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      let adminEmail: string = process.env.ADMIN_EMAIL as string;
      let AdminPassword: string = process.env.ADMIN_PASSWORD as string;

      let response = await this.adminUseCase.verificationLogin(
        email,
        password,
        adminEmail,
        AdminPassword
      );
      if (response.status) {
        res.cookie("adminToken", response.token, { maxAge: 3600000 });
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async adminLogOut(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {

   try {
    res.cookie("adminToken", "", { httpOnly: true, expires: new Date() });
    res.status(200).json({ status: true });
   } catch (error) {
        console.log(error)    
   }
  }     
}
