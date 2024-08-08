import { NextFunction, Request, Response } from "express";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";
import IDoctorUseCase, {
  DatasKYCVerificationStep2,
  DoctorUpdateProfileData,
} from "../../interface/useCase/IDoctorUseCase";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { StatusCode } from "../../enums/statusCode";
import IRequest from "../../interface/controler/Request";
import { error } from "console";
import Errors from "../../erros/errors";

export default class DoctorAuthController implements IDoctorAuthController {
  private doctorAuthUseCase: IDoctorUseCase;

  constructor(doctorAuthUseCase: IDoctorUseCase) {
    this.doctorAuthUseCase = doctorAuthUseCase;
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        name,
        specialty,
        email,
        password,
        phoneNumber,
        languages,
        fees,
        image,
      } = req.body;

      let data = {
        name,
        specialty,
        email,
        password,
        phoneNumber,
        fees,
        image,
      };
      let response = await this.doctorAuthUseCase.registerDoctor(data);

      if (response.status) {
        res.cookie("doctorOtpEmail", email, { maxAge: 3600000 });
        res.status(200).json(response);
        console.log("saved db");
      } else {
        res.status(404).json(response);
      }
    } catch (error) {
      console.log(error, "jhh");
      // throw error;
      next(error);
    }
  }

  async otpVerification(req: Request, res: Response): Promise<void> {
    try {
      const { otp } = req.body;
      const email = req.cookies.doctorOtpEmail;
      console.log(email, "hiiii");
      if (email == "") {
        res.status(401).json({ errMessage: "email error" });
        return;
      }

      const response = await this.doctorAuthUseCase.otpVerify(otp, email);

      if (response.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      // throw error;
    }
  }

  async resendOtp(req: Request, res: Response): Promise<void> {
    try {
      const email = req.cookies.doctorOtpEmail;
      if (email == "") {
        res.status(401).json({ errorMessage: "email error" });
      }
      let response = await this.doctorAuthUseCase.sendOtp(email);

      res.status(200).json(response);
    } catch (error) {
      throw error;
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      let response = await this.doctorAuthUseCase.DoctorAuth(email, password);

      if (response.status) {
        res.cookie("doctorToken", response.token, { maxAge: 3600000 });
        res.status(200).json(response);
        return;
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log("hiiii errorr");
      next(error);
    }
  }

  async getKycinformation(req: Request, res: Response): Promise<void> {
    try {
      console.log("hyy kyc informaiton controller ");
      const email = req.params.email;

      if (email == "") {
        res.status(401).json({
          message: "email is not here",
        });
        return;
      }

      let response = await this.doctorAuthUseCase.getKycStatus(email);

      if (response?._id) {
        res.status(200).json(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async storeKYCDataStep1(req: Request, res: Response): Promise<void> {
    try {
      let response = await this.doctorAuthUseCase.handleKYCVerificationStep1(
        req.body
      );

      if (response.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async storeKYCDataStep2(req: Request, res: Response): Promise<void> {
    try {
      console.log("bodydata", req.body);

      const { yearsOfExperience, fullName, acheivemnts, idCardImage, email } =
        req.body;
      let response = await this.doctorAuthUseCase.handleKYCVerificationStep2({
        yearsOfExperience,
        fullName,
        acheivemnts,
        identityCardImage: idCardImage,
        email,
      });
      console.log(response);

      if (response.status) {
        res.status(200).json(response);
      } else {
        res.status(401).json(response);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("doctorToken", "", { httpOnly: true, expires: new Date() });
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
    }
  }

  async getToken(req: Request, res: Response): Promise<void> {
    try {
      let token = req.cookies.doctorToken;
      console.log(token, "huhuhuhuh");
      let response = await this.doctorAuthUseCase.verifyToken(token);
      if (response.status) {
        res.status(200).json(response);
        return;
      }
      console.log("hello bro how ");
      res.status(401).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserData(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.query.id;
      const data = await this.doctorAuthUseCase.getUserProfileData(
        id as string
      );
      res.status(StatusCode.success).json({ userData: data });
    } catch (error) {
      next(error);
    }
  }

  async getDoctorProfileData(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = req.doctorID as string;

      const data = await this.doctorAuthUseCase.isGetDoctorProfileData(id);
      res.status(StatusCode.success).json({ profileData: data });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateDoctorProfile(
    req: IRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name, phoneNumber, fees, specialty, image } = req.body;
      const id: string = req.doctorID as string;

      if (!id || !name || !phoneNumber || !fees || !specialty) {
        throw new Errors("all field is required", StatusCode.badRequest);
      }

      let data:DoctorUpdateProfileData = {
        name,
        phoneNumber,
        fees,
        specialty,
      };

      if (image) {
        data.image = image as string; 
      }
      let response=await this.doctorAuthUseCase.isUpdateDoctorProfile(id,data);
      res.status(StatusCode.success).json({newData:response})
       
    } catch (error) {
      next(error);
    }
  }
  

  async updatePassword(req: IRequest, res: Response, next: NextFunction): Promise<void> {
       try {
        
           const {oldPassword,newPassword}=req.body  
           const id=req.doctorID as string  

           await this.doctorAuthUseCase.verifyUpdateDoctorPassword(id,oldPassword,newPassword)
           res.status(StatusCode.success).json({message:"successfully updated"})

       } catch (error) {
          next(error)
       }
  }











}
