import IuserRepositories, { PrescriptionData } from "../interface/repositories/IUserRepositories"
import IUserUseCase, { InvoiceData } from "../interface/useCase/IUseUseCase"
import { StatusCode } from "../enums/statusCode"
import Errors from "../erros/errors";
import IPrescription from "../entity/prescriptionEntity";
import PaymentEntity from "../entity/paymentEntity";

export default class userUseCase implements IUserUseCase{
   
    private userRepository:IuserRepositories
    constructor(userRepository:IuserRepositories){
          this.userRepository=userRepository
    }


     async isGetDataPrescription(id: string): Promise<PrescriptionData[]> {
          try {
            
            if(id==""){
              throw new Errors("id is required",StatusCode.badRequest)
            }
            return await this.userRepository.findPrescriptionData(id)

          } catch (error) {
             throw error
          }    
    }
    

   async isGetDataPayment(id: string): Promise<PaymentEntity[]> {
         try {

          if(id==""||!id){
            throw new Errors("userId is required",StatusCode.badRequest)
          }
           return await this.userRepository.findPaymentHistory(id)
         } catch (error) {
            throw error
         }      
    }


    async isGetInvoiceData(id: string): Promise<InvoiceData[]> {
           try {

              return await this.userRepository.getInoviceData(id)
            
           } catch (error) {
               throw error
           }  
    }

}