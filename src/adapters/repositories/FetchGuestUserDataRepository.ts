import { Model } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import { Mode } from "fs";

import IFetchGuestUserDataRepository from "../../interface/repositories/IFetchGuestUserDataRepository";

export default class FetchGuestUserDataRepository implements IFetchGuestUserDataRepository{

   private doctors:Model<IDoctor>
   constructor(doctors:Model<IDoctor>){
      this.doctors=doctors
   }


   async doctorsData(): Promise<IDoctor | null[]> {
      try {
         
         return await this.doctors.find({isBlocked:false,otpVerified:true,approved:true})

      } catch (error) {
         throw error
      }  
  }


}