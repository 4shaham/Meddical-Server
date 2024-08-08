import { Model } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import mongoose, { ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

import IFetchGuestUserDataRepository from "../../interface/repositories/IFetchGuestUserDataRepository";
import ISpecality from "../../entity/specalityEntity";
import { Mode } from "fs";

export default class FetchGuestUserDataRepository implements IFetchGuestUserDataRepository{

   private doctors:Model<IDoctor>
   private specality:Model<ISpecality>
   constructor(doctors:Model<IDoctor>,specality:Model<ISpecality>){
      this.doctors=doctors
      this.specality=specality
   }


   async doctorsData(): Promise<IDoctor | null[]> {
      try {
         
         return await this.doctors.find({isBlocked:false,otpVerified:true,approved:true})

      } catch (error) {
         throw error
      }  
  }

  async findDoctorProfileData(id:string): Promise<IDoctor | null> {
       try {
           
         const doctorId= new ObjectId(id)
         return await this.doctors.findOne({_id:doctorId,isBlocked:false,approved:true,otpVerified:true})
         console.log('doctorid',doctorId)
           
       } catch (error) {
          throw  error
       }   
  }


  async findAllSpecalityData(): Promise<ISpecality|null[]> {
       try {
         return await this.specality.find({isDeleted:false})
       } catch (error) {
         throw error
       }
  }

  async findGetDoctorWithSort(specality:string): Promise<IDoctor[]> {
       try {
   
        return await this.doctors.find({specialty:specality,isBlocked:false,otpVerified:true,approved:true})
 
    
       } catch (error) {
           throw error
       }
  } 


}