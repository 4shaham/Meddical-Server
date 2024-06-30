import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IAdminController from "../../interface/controler/IAdminController";
import IAdminUseCase from "../../interface/useCase/IAdminUseCase";
import { Z_BEST_SPEED } from "zlib";

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
      console.log(error);
    }
  }

  async getToken(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const token = req.cookies.adminToken;
      let verificationResponse = await this.adminUseCase.verifytoken(
        token,
        process.env.JWT_SECRET_key as string
      );

      if (verificationResponse.status) {
        res.status(200).json(verificationResponse);
      } else {
        res.status(401).json(verificationResponse);
      }
    } catch (error) {
      console.log(error);
      res.status(401).json(error);
    }
  }

  async addSpecialty(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const { specalityName, image } = req.body;

      console.log("req.boddyydyydyfydyf");
      let response = await this.adminUseCase.specalityManagment(
        image,
        specalityName
      );

      if (!response.status) {
        res.status(401).json(response);
        return;
      }
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }

  async deleteSpecality(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
   
    try {
    
      const id=req.params.specalityId
      console.log(id,"hihiihihi")
      if(!id){
        res.json({status:false})
        return 
      }

      const data=await this.adminUseCase.verifySpecialtyDeleted(id as string)
      res.status(200).json({status:true})

    } catch (error) {
       throw error
    }

  }

  async findAllSpecality(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      let response = await this.adminUseCase.getSpecality();
      console.log(response);
      res.json(response);
    } catch (error) {
      res.json(error);
    }
  }

  async updateDoctorApprove(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      console.log(req.query.doctorId);
    } catch (error) {
      throw error
    }
  }

  async getNewDoctorRequest(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      console.log("hiiii");
      let datas = await this.adminUseCase.getDataNewRequestDoctor();
    } catch (error) {}
  }
}
