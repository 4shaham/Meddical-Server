import { Model } from "mongoose";
import IUserUseCase, { InvoiceData } from "../../interface/useCase/IUseUseCase";
import IPrescription from "../../entity/prescriptionEntity";
import IuserRepositories, { PrescriptionData } from "../../interface/repositories/IUserRepositories";
import mongoose, { ObjectId } from "mongoose";
import { log } from "console";
import PaymentEntity from "../../entity/paymentEntity";
const { ObjectId } = mongoose.Types;

export default class UserRepository implements IuserRepositories{
     
    private prescription:Model<IPrescription>
    private payment:Model<PaymentEntity>
  
    constructor(prescription:Model<IPrescription>,payment:Model<PaymentEntity>){
         this.prescription=prescription
         this.payment=payment
    }

    async findPrescriptionData(id: string): Promise<PrescriptionData[]> {
          try {
             
         const data= await this.prescription.aggregate([
              {$match:
                {"slotId":id}
              },{
                '$lookup': {
                  'from':'users', 
                  'localField':'pateintId', 
                  'foreignField':'_id', 
                  'as':'userData'
                }
              }
            ])

          console.log(data[0].userData,"agrregateData");
           return data

            // return await this.prescription.findOne({slotId:id})

          } catch (error) {
            throw error
          }
    }
    
    async findPaymentHistory(id: string): Promise<PaymentEntity[]> {
        try {
          return await this.payment.find({userId:id})
        } catch (error) {
            throw error
        }
    }

    
    async getInoviceData(id: string): Promise<InvoiceData[]> {
         try {
           
        return  await this.payment.aggregate([
            {
              '$match': {
                'tokenId': new ObjectId(id)
              }
            }
            ,{
              '$lookup': {
                'from':'users', 
                'localField':'userId', 
                'foreignField': '_id', 
                'as': 'userData'
              }
            },{
              '$unwind': {
                'path': '$userData'
              }
            }
            ,{
              '$lookup': {
                'from': 'bookingdbs', 
                'localField': 'tokenId', 
                'foreignField': '_id', 
                'as': 'bookingData'
              }
            },{
              '$unwind': {
                'path': '$bookingData'
              }
            }
          ])


         } catch (error) {
             throw error
         }
    }


}