import { ObjectId } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import ISpecality from "../../entity/specalityEntity";
import IKyc from "../../entity/kycEntity";
import PaymentEntity from "../../entity/paymentEntity";
import exp from "constants";
import IUser from "../../entity/userEntity";
import IBooking from "../../entity/bookingEntity";



export interface GetNewRequestData extends IKyc{
    doctorDetails:IDoctor
 }

export interface IUData{
    name?:string,
    image?:string
 }


 export interface FetchPaymentData extends PaymentEntity{
    doctorData:IDoctor
    userData:IUser
 }

 export interface invoiceData extends PaymentEntity{
    userData:IUser,
    bookingData:IBooking
}

export default interface IAdminRepository{
    addSpecality(image:string,specalityName:string):Promise<ISpecality|null>
    isExists(speclaityName:string):Promise<ISpecality|null>
    specalitys():Promise<ISpecality[]>
    getRequestedDoctor():Promise<GetNewRequestData|null[]>
    getKycDoctorParticularData(id:string):Promise<GetNewRequestData|null[]>
    specalityDeleted(id:string):Promise<ISpecality|null>
    updateKycStatus(email:string,status:string):Promise<IKyc|null>
    updateDoctorKycStatus(email:string):Promise<IDoctor|null>
    getDataEditSpecality(specalityId:string):Promise<ISpecality|null>
    updateSpecality(id:string,data:IUData):Promise<ISpecality|null>
    deletedSpecalitys():Promise<ISpecality[]>
    updateRestoreSpecalitys(id:string):Promise<ISpecality|null>
    fetchPaymentHistory():Promise<FetchPaymentData[]>
    getInvoiceData(id:string):Promise<invoiceData[]>
    getUsers():Promise<IUser[]>
    getDoctors():Promise<IDoctor[]>
    userBlockedStatusUpdate(userId:string,status:boolean):Promise<IUser|null>
    doctorBlockedStatusUpdate(doctorId:string,status:boolean):Promise<IDoctor|null>

}