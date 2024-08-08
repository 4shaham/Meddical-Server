import IuserRepositories, {
  PrescriptionData,
  UpdateData,
} from "../interface/repositories/IUserRepositories";
import IUserUseCase, { InvoiceData } from "../interface/useCase/IUseUseCase";
import { StatusCode } from "../enums/statusCode";
import Errors from "../erros/errors";
import IPrescription from "../entity/prescriptionEntity";
import PaymentEntity from "../entity/paymentEntity";
import ICloudinaryService from "../interface/utils/ICloudinaryService";
import IhasingService from "../interface/utils/IHasingService";
import IUser from "../entity/userEntity";

export default class userUseCase implements IUserUseCase {
  private userRepository: IuserRepositories;
  private cloudinaryService: ICloudinaryService;
  private hashingServvice: IhasingService;

  constructor(
    userRepository: IuserRepositories,
    cloudinaryService: ICloudinaryService,
    hashingService: IhasingService
  ) {
    (this.userRepository = userRepository),
      (this.cloudinaryService = cloudinaryService);
    this.hashingServvice = hashingService;
  }

  async isGetDataPrescription(id: string): Promise<PrescriptionData[]> {
    try {
      if (id == "") {
        throw new Errors("id is required", StatusCode.badRequest);
      }
      return await this.userRepository.findPrescriptionData(id);
    } catch (error) {
      throw error;
    }
  }

  async isGetDataPayment(id: string): Promise<PaymentEntity[]> {
    try {
      if (id == "" || !id) {
        throw new Errors("userId is required", StatusCode.badRequest);
      }
      return await this.userRepository.findPaymentHistory(id);
    } catch (error) {
      throw error;
    }
  }

  async isGetInvoiceData(id: string): Promise<InvoiceData[]> {
    try {
      return await this.userRepository.getInoviceData(id);
    } catch (error) {
      throw error;
    }
  }

  async verifyUpdateUserProfile(
    userId: string,
    userName: string,
    age: number,
    phoneNumber: string,
    gender: string,
    image?: string | null
  ): Promise<void> {
    try {
      if (!userId || !userName || !age || !gender) {
        throw new Errors("all field is required", StatusCode.forBidden);
      }

      let data: UpdateData = {
        userName: userName,
        phoneNumber: phoneNumber,
        age: age,
        gender: gender,
      };

      if (image) {
        const uploadImage = await this.cloudinaryService.uploadImage(image);
        data.image = uploadImage;
      }
      const response = await this.userRepository.updateUserProfile(
        userId,
        data
      );
      console.log(response, "lol");
    } catch (error) {
      throw error;
    }
  }

  async verifyUpdatePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const user: IUser | null = await this.userRepository.findUser(userId);

      if (!user) {
        throw new Errors("user id is not valid", StatusCode.badRequest);
      }

      let status = await this.hashingServvice.compare(
        oldPassword,
        user.password
      );

      if (!status) {
        throw new Errors("password is not correct", StatusCode.badRequest);
      }
      
      let hashedPassword:string=await this.hashingServvice.hashing(newPassword)
      await this.userRepository.updatePassword(userId,hashedPassword)

    } catch (error) {
      throw error;
    }
  }
}
