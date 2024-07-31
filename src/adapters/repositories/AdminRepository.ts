// import ISpecality from "../../entity/specalityEntity";
import { Model } from "mongoose";
import ISpecality from "../../entity/specalityEntity";
import IAdminRepository, {
  FetchPaymentData,
  GetNewRequestData,
  IUData,
} from "../../interface/repositories/IAdminRepositories";
import IDoctor from "../../entity/doctorEntity";
import IKyc from "../../entity/kycEntity";
import mongoose, { ObjectId } from "mongoose";
import PaymentEntity from "../../entity/paymentEntity";
import { invoiceData } from "../../interface/useCase/IAdminUseCase";
const { ObjectId } = mongoose.Types;

export default class AdminRepository implements IAdminRepository {
  private specality: Model<ISpecality>;
  private doctor: Model<IDoctor>;
  private kyc: Model<IKyc>;
  private payment: Model<PaymentEntity>;

  constructor(
    specality: Model<ISpecality>,
    doctor: Model<IDoctor>,
    kyc: Model<IKyc>,
    payment: Model<PaymentEntity>
  ) {
    this.specality = specality;
    this.doctor = doctor;
    this.kyc = kyc;
    this.payment = payment;
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

  async deletedSpecalitys(): Promise<ISpecality[]> {
    try {
      return await this.specality.find({ isDeleted: true });
    } catch (error) {
      throw error;
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

  async updateRestoreSpecalitys(id: string): Promise<ISpecality | null> {
    try {
      const specalityId = new ObjectId(id);
      return await this.specality.findByIdAndUpdate(
        { _id: specalityId },
        { $set: { isDeleted: false } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getRequestedDoctor(): Promise<GetNewRequestData | null[]> {
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
            as: "doctorDetails",
          },
        },
      ]);
      return values;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getKycDoctorParticularData(
    id: string
  ): Promise<GetNewRequestData | null[]> {
    try {
      const Kycid = new ObjectId(id);
      const values = await this.kyc.aggregate([
        {
          $match: { _id: Kycid },
        },
        {
          $lookup: {
            from: "doctors",
            localField: "email",
            foreignField: "email",
            as: "doctorDetails",
          },
        },
      ]);
      return values;
    } catch (error) {
      throw error;
    }
  }

  async updateKycStatus(email: string, status: string): Promise<IKyc | null> {
    try {
      return await this.kyc.findOneAndUpdate(
        { email: email },
        { $set: { appliedStatus: status } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async updateDoctorKycStatus(email: string): Promise<IDoctor | null> {
    try {
      return await this.doctor.findOneAndUpdate(
        { email: email },
        { $set: { approved: true } },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async getDataEditSpecality(specalityId: string): Promise<ISpecality | null> {
    try {
      const id = new ObjectId(specalityId);
      return await this.specality.findOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  async updateSpecality(id: string, data: IUData): Promise<ISpecality | null> {
    try {
      const specalityId = new ObjectId(id);
      return await this.specality.findByIdAndUpdate(
        { _id: specalityId },
        { $set: data },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  async fetchPaymentHistory(): Promise<FetchPaymentData[]> {
    try {
      const data=await this.payment.aggregate([
        {
          $match: {},
        },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctorData",
          },
        },
        {
          $unwind: {
            path: "$doctorData",
          },
        },
         {
          '$lookup': {
              'from': 'users', 
              'localField': 'userId', 
              'foreignField': '_id', 
              'as': 'userData'
          }
      },{
        $unwind: {
          path: "$userData",
        },
      },
      ]);
      
      console.log(data)
      return data
    } catch (error) {
      throw error;
    }
  }

  async getInvoiceData(id: string): Promise<invoiceData[]> {
      try {
        console.log(id,"loooooo")
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
