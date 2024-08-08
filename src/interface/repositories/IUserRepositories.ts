import PaymentEntity from "../../entity/paymentEntity";
import IPrescription from "../../entity/prescriptionEntity";
import IUser from "../../entity/userEntity";
import { InvoiceData } from "../useCase/IUseUseCase";


export interface PrescriptionData extends IPrescription {
    userData:IUser[]
}

export interface UpdateData{
    userName:string,
    phoneNumber:string,
    age:number,
    gender:string,
    image?:string
}


export default interface IuserRepositories{
    findPrescriptionData(id:string):Promise<PrescriptionData[]>
    findPaymentHistory(id:string):Promise<PaymentEntity[]>
    getInoviceData(id:string):Promise<InvoiceData[]>
    updateUserProfile(userId:string,data:UpdateData):Promise<IUser|null>
    findUser(userId:string):Promise<IUser|null>
    updatePassword(userId:string,newPassword:string):Promise<IUser|null>
}