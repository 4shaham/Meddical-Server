import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import IAdminController from "../../interface/controler/IAdminController";
import IAdminUseCase from "../../interface/useCase/IAdminUseCase";
import { Z_BEST_SPEED } from "zlib";
import { error } from "console";
import { StatusCode } from "../../enums/statusCode";

export default class AdminController implements IAdminController {
  private adminUseCase: IAdminUseCase;
  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const adminEmail: string = process.env.ADMIN_EMAIL as string;
      const AdminPassword: string = process.env.ADMIN_PASSWORD as string;

      const response = await this.adminUseCase.verificationLogin(
        email,
        password,
        adminEmail,
        AdminPassword
      );

      if (response.status) {
        res.cookie("adminToken", response.token, { maxAge: 3600000 });
        res.status(200).json(response);
      } else {
        console.log("jiiiiiiiii");
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async adminLogOut(req: Request, res: Response): Promise<void> {
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
      console.log(token, "jiiii");
      let verificationResponse = await this.adminUseCase.verifytoken(token);

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

  async addSpecialty(req: Request, res: Response): Promise<void> {
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

  async deleteSpecality(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.specalityId;
      console.log(id, "hihiihihi");

      if (!id) {
        res.json({ status: false });
        return;
      }

      const data = await this.adminUseCase.verifySpecialtyDeleted(id as string);
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      // throw error;
    }
  }

  async findAllSpecality(req: Request, res: Response): Promise<void> {
    try {
      let response = await this.adminUseCase.getSpecality();
      res.json(response);
    } catch (error) {
      res.json(error);
      console.log(error);
    }
  }

  async updateDoctorKycStatus(req: Request, res: Response): Promise<void> {
    try {
      const { email, status } = req.body;
      console.log(email, "hi enterd updat kyc status routes");
      let response = await this.adminUseCase.verifyDoctorKycStatusUpdate(
        email,
        status
      );
      if (response.status) {
        res.status(200).json(response);
      }
    } catch (error) {
      // throw error;
    }
  }

  async getNewDoctorRequest(req: Request, res: Response): Promise<void> {
    try {
      console.log("hiiii enter getnew Doctors applied Route");
      let datas = await this.adminUseCase.getDataNewRequestDoctor();
      console.log(datas);
      res.status(200).json(datas);
    } catch (error) {
      console.log(error);
      // throw error;
    }
  }

  async getDoctorDataVerification(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.id;
      console.log("hiiii i am happy", id);

      if (id == null) {
        console.log("hii error");
        res.status(401).json({ error: "id is required" });
        return;
      }

      let responsedValues = await this.adminUseCase.getKycDoctorData(
        id as string
      );
      console.log(responsedValues, "values");
      res.status(200).json({ data: responsedValues });
    } catch (error) {
      console.log(error);
      // throw error
    }
  }

  async findEditSpecalityData(req: Request, res: Response): Promise<void> {
    try {
      const id = req.query.specalityId;

      if (id == null) {
        res.status(401).json({ error: "the query params is null" });
      }

      const data = await this.adminUseCase.editSpecalityData(id as string);

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSpecality(req: Request, res: Response): Promise<void> {
    try {
      
      const { image, name, id } = req.body;
      console.log(req.body);

      const response = await this.adminUseCase.verifyUpdateSpecality(
        id,
        name,
        image
      );
      console.log(response);

      if (response.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async findDeletedSpecality(req: Request, res: Response): Promise<void> {
    try {
      let data = await this.adminUseCase.getDataDeletedSpecality();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async restoreSpecality(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      const response = await this.adminUseCase.updateRestoreSpecality(
        id as string
      );

      if (response.status) {
        res.status(200).json(response);
        return;
      }

      res.status(401).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json("internal error");
    }
  }

  async getPaymentHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = await this.adminUseCase.isGetPaymentHistoryData();
      res.status(StatusCode.success).json({ transactionData: data });
    } catch (error) {
      next(error);
    }
  }

  async getInvoiceData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.query.id as string;

      const resposne = await this.adminUseCase.isGetInvoiceData(id);

      res.status(StatusCode.success).json({ invoiceData: resposne });
    } catch (error) {
      throw error;
    }
  }

  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.adminUseCase.isGetUsers();
      res.status(StatusCode.success).json({ users: users });
    } catch (error) {
      next(error);
    }
  }

  async getDoctors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const doctors = await this.adminUseCase.isGetDoctors();
      res.status(StatusCode.success).json({ doctors: doctors });
    } catch (error) {
      next(error);
    }
  }

  async userBlocked(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.body;

      await this.adminUseCase.isUserBlocked(userId)
      res.status(StatusCode.success).json({message:"successfully updated"})
    } catch (error) {
      next(error);
    }
  }

  async doctorBlocked(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { doctorId } = req.body;

      await this.adminUseCase.isDoctorBlocked(doctorId)
      res.status(StatusCode.success).json({message:"successfully updated"})

    } catch (error) {
      next(error);
    }
  }

  async userUnBlocked(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.body;

      await this.adminUseCase.isUserUnBlocked(userId)
      res.status(StatusCode.success).json({message:"successfully updated"})
    } catch (error) {
      next(error);
    }
  }

  
  async doctorUnBlocked(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          
          const {doctorId}=req.body
          
          await this.adminUseCase.isDoctorUnBlocked(doctorId)
          res.status(StatusCode.success).json({message:"successfully updated"})

        } catch (error) {
             next(error)
        }
  }



}
