import { NextFunction, Request, Response } from "express";
import IPrescription from "../../entity/prescriptionEntity";

export default interface IUserUseCase{
   isGetDataPrescription(id:string):Promise<IPrescription|null>
}