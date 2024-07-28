import IuserRepositories from "../interface/repositories/IUserRepositories"
import IUserUseCase from "../interface/useCase/IUseUseCase"
import { StatusCode } from "../enums/statusCode"
import Errors from "../erros/errors";
import IPrescription from "../entity/prescriptionEntity";

export default class userUseCase implements IUserUseCase{
   
    private userRepository:IuserRepositories
    constructor(userRepository:IuserRepositories){
          this.userRepository=userRepository
    }


     async isGetDataPrescription(id: string): Promise<IPrescription|null> {
          try {
            
            if(id==""){
              throw new Errors("id is required",StatusCode.badRequest)
            }
            return await this.userRepository.findPrescriptionData(id)

          } catch (error) {
             throw error
          }    
    }



}