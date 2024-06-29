import { Request, Response } from "express";
import IDoctorAuthController from "../../interface/controler/IDoctorAuthController";
import IDoctorUseCase, { DatasKYCVerificationStep2 } from "../../interface/useCase/IDoctorUseCase";
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
      console.log("saved db");
      return response;
    } catch (error) {
      console.log(error, "jhh");
    }
  }

  async login(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>
  ): Promise<void> {
    try {
      const { email, Password } = req.body;
      console.log(req.body);
      let response = await this.doctorAuthUseCase.DoctorAuth(email, Password);
      res.json(response);
    } catch (error) {
      res.json(error);
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
    console.log("bodydata",req.body)
      
    const {yearsOfExperience,fullName,acheivemnts,image}=req.body
    const email="shahamsalam2123@gmail.com"
    let response=await this.doctorAuthUseCase.handleKYCVerificationStep2({yearsOfExperience,fullName,acheivemnts,identityCardImage:image,email})
    console.log(response)
      
    if(response.status){
      res.status(200).json(response)
    }else{
      res.status(401).json(response)
    }
    }catch(error){
       console.log(error)
       throw error
    }
  }

}
