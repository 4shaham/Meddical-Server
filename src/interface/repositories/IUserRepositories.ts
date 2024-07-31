import PaymentEntity from "../../entity/paymentEntity";
import IPrescription from "../../entity/prescriptionEntity";
import IUser from "../../entity/userEntity";
import { InvoiceData } from "../useCase/IUseUseCase";


export interface PrescriptionData extends IPrescription {
    userData:IUser[]
}


export default interface IuserRepositories{
    findPrescriptionData(id:string):Promise<PrescriptionData[]>
    findPaymentHistory(id:string):Promise<PaymentEntity[]>
    getInoviceData(id:string):Promise<InvoiceData[]>
}