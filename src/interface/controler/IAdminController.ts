import { NextFunction, Request, Response } from "express";
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
  updateSpecality(req:Request,res:Response):Promise<void>;
  findDeletedSpecality(req:Request,res:Response):Promise<void>
  restoreSpecality(req:Request,res:Response):Promise<void>
  getPaymentHistory(req:Request,res:Response,next:NextFunction):Promise<void>
  getInvoiceData(req:Request,res:Response,next:NextFunction):Promise<void>
  getUsers(req:Request,res:Response,next:NextFunction):Promise<void>
  getDoctors(req:Request,res:Response,next:NextFunction):Promise<void>
  userBlocked(req:Request,res:Response,next:NextFunction):Promise<void>
  doctorBlocked(req:Request,res:Response,next:NextFunction):Promise<void>
  userUnBlocked(req:Request,res:Response,next:NextFunction):Promise<void>
  doctorUnBlocked(req:Request,res:Response,next:NextFunction):Promise<void>
  specalityChart(req:Request,res:Response,next:NextFunction):Promise<void>
}
