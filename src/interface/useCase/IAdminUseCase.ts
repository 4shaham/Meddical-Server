import { token } from "morgan"
import ISpecality from "../../entity/specalityEntity"
import IDoctor from "../../entity/doctorEntity"
import { ObjectId } from "mongoose"
import IKyc from "../../entity/kycEntity"
import PaymentEntity from "../../entity/paymentEntity"
import IUser from "../../entity/userEntity"
import IBooking from "../../entity/bookingEntity"

export interface SpecalityResponse{
    status:boolean,
    message:string
}


export interface Response{
    status:boolean,
    message:string,
    token?:string
}


export interface VerifyResponse{
    status:boolean,
    decoded?:object
}


export interface GetNewRequestData extends IKyc{
   doctorDetails:IDoctor
}

export interface UpdateSpecalityResponse{
    status: boolean;
    message?:string; 
    errMessage?:string;
}


export interface IRestoreSpecalityResponse{
    status:boolean,
    message:string
}

export interface PaymentHistroyData extends PaymentEntity{
    doctorData:IDoctor,
    userData:IUser
}

export interface invoiceData extends PaymentEntity{
    userData:IUser,
    bookingData:IBooking
}




export default interface IAdminUseCase{

    verificationLogin(email:string,password:string,AdminEmail:string,AdminPassword:string):Promise<Response>
    verifytoken(token:string):Promise<VerifyResponse>
    specalityManagment(image:string,specalityName:string):Promise<SpecalityResponse>
    getSpecality():Promise<ISpecality[]>
    getDataNewRequestDoctor():Promise<GetNewRequestData|null[]>
    getKycDoctorData(id:string):Promise<GetNewRequestData|null[]>
    verifySpecialtyDeleted(id:string):Promise<void>
    verifyDoctorKycStatusUpdate(email:string,status:string):Promise<{status:boolean,message:string}>
    editSpecalityData(specalityId:string):Promise<ISpecality|null>
    verifyUpdateSpecality(id:string,name:string|null,image:string|null):Promise<UpdateSpecalityResponse>
    getDataDeletedSpecality():Promise<ISpecality[]>
    updateRestoreSpecality(id:string):Promise<IRestoreSpecalityResponse>
    isGetPaymentHistoryData():Promise<PaymentHistroyData[]>
    isGetInvoiceData(id:string):Promise<invoiceData[]>
    isGetUsers():Promise<IUser[]>
    isGetDoctors():Promise<IDoctor[]>
}