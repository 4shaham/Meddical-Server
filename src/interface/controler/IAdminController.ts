import { Request, Response } from "express";
import { ResolveSchemaOptions } from "mongoose";



export default interface IAdminController{

  adminLogin(req:Request,res:Response):Promise<void>
  adminLogOut(req:Request,res:Response):Promise<void>
  getToken(req:Request,res:Response):Promise<void>
  addSpecialty(req:Request,res:Response):Promise<void>
  findAllSpecality(req:Request,res:Response):Promise<void>
  updateDoctorApprove(req:Request,res:Response):Promise<void>
  
}