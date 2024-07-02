import { Request, Response } from "express";
import { ResolveSchemaOptions } from "mongoose";

export default interface IAdminController {
  adminLogin(req: Request, res: Response): Promise<void>;
  adminLogOut(req: Request, res: Response): Promise<void>;
  getToken(req: Request, res: Response): Promise<void>;
  addSpecialty(req: Request, res: Response): Promise<void>;
  findAllSpecality(req: Request, res: Response): Promise<void>;
  updateDoctorKycStatus(req: Request, res: Response): Promise<void>;
  getNewDoctorRequest(req: Request, res: Response): Promise<void>;
  getDoctorDataVerification(req:Request,res:Response):Promise<void>;
  deleteSpecality(req:Request,res:Response):Promise<void>;
  findEditSpecalityData(req:Request,res:Response):Promise<void>;
}
