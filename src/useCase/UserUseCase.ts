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

export default class userUseCase implements IUserUseCase {
  private userRepository: IuserRepositories;
  private cloudinaryService: ICloudinaryService;

  constructor(
    userRepository: IuserRepositories,
    cloudinaryService: ICloudinaryService
  ) {
    (this.userRepository = userRepository),
      (this.cloudinaryService = cloudinaryService);
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

      let  data:UpdateData={
         userName:userName,
         phoneNumber:phoneNumber,
         age:age,
         gender:gender
      }
      


      if(image){
         const uploadImage= await this.cloudinaryService.uploadImage(image) 
         data.image=uploadImage
      }
      const response=await this.userRepository.updateUserProfile(userId,data);
      console.log(response,"lol");
      

    }catch (error) {
      throw error;
    }
  }
}
