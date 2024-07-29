import { NextFunction, Request, Response } from "express";
import IPrescription from "../../entity/prescriptionEntity";
import { PrescriptionData } from "../repositories/IUserRepositories";
import PaymentEntity from "../../entity/paymentEntity";

export default interface IUserUseCase{
   isGetDataPrescription(id:string):Promise<PrescriptionData[]>
   isGetDataPayment(id:string):Promise<PaymentEntity[]>
}