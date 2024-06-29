import { Model } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import IDoctorAuthRepositories from "../../interface/repositories/IDoctorAuthRepositories";
import {
  DatasKYCVerificationStep1,
  DatasKYCVerificationStep2,
  DatasOfDoctorRegistration,
} from "../../interface/useCase/IDoctorUseCase";
import IKyc from "../../entity/kycEntity";

export default class DoctorAuthRepository implements IDoctorAuthRepositories {
  private doctors: Model<IDoctor>;
  private kyc: Model<IKyc>;

  constructor(doctors: Model<IDoctor>, kyc: Model<IKyc>) {
    this.doctors = doctors;
    this.kyc = kyc;
  }

  async isDoctorExists(email?: string): Promise<IDoctor | null> {
    try {
      let details = await this.doctors.findOne({ email: email });
      return details;
    } catch (error) {
      throw Error();
    }
  }

  async isRegesterd(data: DatasOfDoctorRegistration): Promise<IDoctor | null> {
    try {
      const doctor = new this.doctors({
        name: data.name,
        specialty: data.specialty,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        fees: data.fees,
        image: data.image,
      });

      return await doctor.save();
    } catch (error) {
      console.log(error);
      throw Error();
    }
  }

  async kycStorStep1(data: DatasKYCVerificationStep1): Promise<IKyc | null> {
    try {
      const doctor = new this.kyc({
        email: data.email,
        licenseNumber: data.licenseNumber,
        licenseImage: data.image,
        experiences: data.experiences,
        step: 1,
      });
      return await doctor.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async kycStorStep2(data: DatasKYCVerificationStep2): Promise<IKyc | null> {
    try {
      return await this.kyc.findOneAndUpdate(
        { email: data.email },
        {
          $set:{
            yearsOfExperience:data.yearsOfExperience,
            fullName:data.fullName,
            identityCardImage:data.identityCardImage,
            achievements:data.acheivemnts,
            appliedStatus:"applied",
            step:2
          },
        }
      );
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
