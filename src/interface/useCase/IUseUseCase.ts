import { NextFunction, Request, Response } from "express";
import IPrescription from "../../entity/prescriptionEntity";
import { PrescriptionData } from "../repositories/IUserRepositories";
import PaymentEntity from "../../entity/paymentEntity";
import IUser from "../../entity/userEntity";
import IBooking from "../../entity/bookingEntity";

export interface  InvoiceData extends PaymentEntity {
   userData:IUser,
   bookingData:IBooking
}

export default interface IUserUseCase{
   isGetDataPrescription(id:string):Promise<PrescriptionData[]>
   isGetDataPayment(id:string):Promise<PaymentEntity[]>
   isGetInvoiceData(id:string):Promise<InvoiceData[]>
   verifyUpdateUserProfile(userId:string,userName:string,age:number,phoneNumber:string,gender:string,image?:string|null):Promise<void>
   verifyUpdatePassword(userId:string,oldPassword:string,newPassword:string):Promise<void>
   
}