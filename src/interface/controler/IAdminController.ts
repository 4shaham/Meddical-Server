import { Request, Response } from "express";



export default interface IAdminController{

  adminLogin(req:Request,res:Response):Promise<void>
  adminLogOut(req:Request,res:Response):Promise<void>

}