import { Model } from "mongoose";
import IUserUseCase from "../../interface/useCase/IUseUseCase";
import IPrescription from "../../entity/prescriptionEntity";
import IuserRepositories from "../../interface/repositories/IUserRepositories";


export default class UserRepository implements IuserRepositories{
     
    private prescription:Model<IPrescription>

    constructor(prescription:Model<IPrescription>){
         this.prescription=prescription
    }

    
    async findPrescriptionData(id: string): Promise<IPrescription | null> {
          try {
            
            return await this.prescription.findOne({slotId:id})

          } catch (error) {
            throw error
          }
    }
    

}