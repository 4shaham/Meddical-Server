import { Model } from "mongoose"
import IDoctor from "../../entity/doctorEntity"
import IDoctorAuthRepositories from "../../interface/repositories/IDoctorAuthRepositories";


export default class DoctorAuthRepository implements IDoctorAuthRepositories {

   private doctors:Model<IDoctor>   ;
   constructor(doctors:Model<IDoctor>){
        this.doctors=doctors
   }


   async isDoctorExists(email: string): Promise<IDoctor|null> {
      
     try {

      let details=await this.doctors.findOne({email:email})
      return details
      
     } catch (error) {
       throw Error()
     }

   }

}