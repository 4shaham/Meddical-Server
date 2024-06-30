// import ISpecality from "../../entity/specalityEntity";
import { Model } from "mongoose";
import ISpecality from "../../entity/specalityEntity";
import IAdminRepository from "../../interface/repositories/IAdminRepositories";
import IDoctor from "../../entity/doctorEntity";
import IKyc from "../../entity/kycEntity";
import mongoose, { ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

export default class AdminRepository implements IAdminRepository {
  private specality: Model<ISpecality>;
  private doctor: Model<IDoctor>;
  private kyc: Model<IKyc>;

  constructor(
    specality: Model<ISpecality>,
    doctor: Model<IDoctor>,
    kyc: Model<IKyc>
  ) {
    this.specality = specality;
    this.doctor = doctor;
    this.kyc = kyc;
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
      return await this.specality.find({ isDeleted: false });
    } catch (error) {
      throw Error();
    }
  }

  async specalityDeleted(id: string): Promise<ISpecality | null> {
    try {
      const specialityId = new ObjectId(id);
      return await this.specality.findByIdAndUpdate(
        { _id: specialityId },
        { $set: { isDeleted: true } }
      );
    } catch (error) {
      console.log(error, "shahams");
      throw error;
    }
  }

  // async getRequestedDoctor():Promise<IDoctor[]> {
  //      try {

  //       const data=this.doctor.find({})
  //       return data
  //      } catch (error) {

  //      }
  // }

  async getRequestedDoctor(): Promise<IDoctor[]> {
    try {
      const values = await this.kyc.aggregate([
        {
          $match: { appliedStatus: "applied" },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "email",
            foreignField: "email",
            as: "doctor",
          },
        },
      ]);

      console.log(values, "hiii");
      const data = await this.doctor.find();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
