import { Request, Response } from "express";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";
import IDoctorUseCase, {
  DatasKYCVerificationStep2,
} from "../../interface/useCase/IDoctorUseCase";
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
      throw error;
    }
  }

  async otpVerification(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
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
      throw error;
    }
  }

  async resendOtp(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
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

  async login(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {

      const {email,password} = req.body;
      let response = await this.doctorAuthUseCase.DoctorAuth(email,password);

      if (response.status) {
        res.cookie("adminToken", response.token,{maxAge:3600000});
        res.status(200).json(response);
        return;
      }else{
        res.status(401).json(response);
      }
    }catch(error){
      console.log(error);
      throw error;
    }
  }

  async getKycinformation(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      console.log("hyy kyc informaiton controller ");
      const email = req.params.email;
      let response = await this.doctorAuthUseCase.getKycStatus(email);

      if (response?._id) {
        res.status(200).json(response);
      }
    } catch (error) {
      throw error;
    }
  }

  async storeKYCDataStep1(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
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

  async storeKYCDataStep2(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      console.log("bodydata", req.body);

      const { yearsOfExperience, fullName, acheivemnts,image,email } = req.body;
      let response = await this.doctorAuthUseCase.handleKYCVerificationStep2({
        yearsOfExperience,
        fullName,
        acheivemnts,
        identityCardImage: image,
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
}
