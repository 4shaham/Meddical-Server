// import ISpecality from "../../entity/specalityEntity";
import { Model } from "mongoose";
import ISpecality from "../../entity/specalityEntity";
import IAdminRepository from "../../interface/repositories/IAdminRepositories";

export default class AdminRepository implements IAdminRepository {
  private specality: Model<ISpecality>;

  constructor(specality: Model<ISpecality>) {
    this.specality = specality;
  }

  async addSpecality(
    image: string,
    specalityName: string
  ): Promise<ISpecality | null> {
    try {
      const data = new this.specality({
        image: image,
        name: specalityName,
      });
      return await data.save();
    } catch (error) {
      throw Error();
    }
  }

  async isExists(speclaityName: string): Promise<ISpecality | null> {
    try {
      const specality = this.specality.findOne({ name: speclaityName });
      return specality;
    } catch (error) {
      throw Error();
    }
  }

   async specalitys(): Promise<ISpecality[]> {
       try {
             
       return await this.specality.find()

       } catch (error) {
         throw Error()
       }  
  }


}
