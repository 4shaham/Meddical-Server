import { Jwt } from "jsonwebtoken";
import IAdminRepository, { SpecialityCount } from "../interface/repositories/IAdminRepositories";
import IAdminUseCase, {
  GetNewRequestData,
  invoiceData,
  IRestoreSpecalityResponse,
  PaymentHistroyData,
  Response,
  SpecalityResponse,
  UpdateSpecalityResponse,
  VerifyResponse,
} from "../interface/useCase/IAdminUseCase";
import IJwtService from "../interface/utils/IJwtService";
import { errorMonitor } from "events";
import ICloudinaryService from "../interface/utils/ICloudinaryService";
import ISpecality from "../entity/specalityEntity";
import IDoctor from "../entity/doctorEntity";
import { ObjectId } from "mongoose";
import IUser from "../entity/userEntity";
import { StatusCode } from "../enums/statusCode";
import Errors from "../erros/errors";

export default class AdminUseCase implements IAdminUseCase {
  private adminRepository: IAdminRepository;
  private jwtService: IJwtService;
  private cloudinaryService: ICloudinaryService;

  constructor(
    adminRepository: IAdminRepository,
    jwtService: IJwtService,
    cloudinaryServices: ICloudinaryService
  ) {
    this.adminRepository = adminRepository;
    this.jwtService = jwtService;
    this.cloudinaryService = cloudinaryServices;
  }

  async verificationLogin(
    email: string,
    password: string,
    AdminEmail: string,
    AdminPassword: string
  ): Promise<Response> {
    try {
      if (email == AdminEmail && AdminPassword == password){
        let token = this.jwtService.createToken({ id: email, role: "admin" });

        return {
          status: true,
          message: "sucessfull Login",
          token,
        };
      }

      return {
        status: false,
        message: "Invalid credentials",
      };
    } catch (error) {
      throw Error();
    }
  }

  async verifytoken(token: string): Promise<VerifyResponse> {
    try {
      let response = await this.jwtService.verify(token);
      console.log(response);
      if (response?.role == "admin") {
        return {
          status: true,
          decoded: response,
        };
      }
      return {
        status: false,
      };
    } catch (error) {
      throw error;
    }
  }

  async specalityManagment(
    image: string,
    specalityName: string
  ): Promise<SpecalityResponse> {
    try {
      let specality = await this.adminRepository.isExists(
        specalityName.toLowerCase()
      );

      if (specality) {
        return {
          status: false,
          message: "This Specality already used",
        };
      }

      let url = await this.cloudinaryService.uploadImage(image);

      if (url) {
        let newSavedData = await this.adminRepository.addSpecality(
          url,
          specalityName.toLowerCase()
        );

        if (newSavedData) {
          return {
            status: true,
            message: "Speciality added successfully",
          };
        }
      }

      return {
        status: false,
        message: "Error",
      };
    } catch (error) {
      throw Error();
    }
  }

  async getSpecality(): Promise<ISpecality[]> {
    try {
      return await this.adminRepository.specalitys();
    } catch (error) {
      throw Error();
    }
  }

  async getDataNewRequestDoctor(): Promise<GetNewRequestData | null[]> {
    try {
      return await this.adminRepository.getRequestedDoctor();
    } catch (error) {
      throw error;
    }
  }

  async getKycDoctorData(id: string): Promise<GetNewRequestData | null[]> {
    try {
      return await this.adminRepository.getKycDoctorParticularData(id);
    } catch (error) {
      throw error;
    }
  }

  async verifyDoctorKycStatusUpdate(
    email: string,
    status: string
  ): Promise<{ status: boolean; message: string }> {
    try {
      console.log(email, status);

      let data = await this.adminRepository.updateKycStatus(email, status);

      if (data?.appliedStatus == "approved") {
        console.log("changed status");
        let docotor = await this.adminRepository.updateDoctorKycStatus(email);
        console.log(docotor, "changed status");
      }

      return {
        status: true,
        message: "successfully updated status",
      };
    } catch (error) {
      throw error;
    }
  }

  async verifySpecialtyDeleted(id: string): Promise<void> {
    try {
      let data = await this.adminRepository.specalityDeleted(id);
    } catch (error) {
      throw error;
    }
  }

  async editSpecalityData(specalityId: string): Promise<ISpecality | null> {
    try {
      return await this.adminRepository.getDataEditSpecality(specalityId);
    } catch (error) {
      throw error;
    }
  }
  async verifyUpdateSpecality(
    id: string,
    name: string | null,
    image: string | null
  ): Promise<UpdateSpecalityResponse> {
    try {
      let data = undefined;

      if (!id && !name && !image) {
        return {
          status: false,
          errMessage: "The id and name and image are required",
        };
      }

      if (!id) {
        return {
          status: false,
          errMessage: "The id is required",
        };
      }

      if (name) {

        let data = await this.adminRepository.isExists(name.toLowerCase());
        if (data) {
          return {
            status: false,
            errMessage: "This name already used",
          };
        }
        
      }

      if (name && image) {
        const url = await this.cloudinaryService.uploadImage(image);
        data = {
          name,
          image: url,
        };
        let updatedValues = await this.adminRepository.updateSpecality(
          id,
          data
        );
        console.log(updatedValues);
        return {
          status: true,
          message: "successesfully updated",
        };
      }

      if (name) {
        data = {
          name,
        };
        let updatedValues = await this.adminRepository.updateSpecality(
          id,
          data
        );
        console.log(updatedValues);
        return {
          status: true,
          message: "successes updated",
        };
      }

      if (image) {
        const url = await this.cloudinaryService.uploadImage(image);
        data = { image: url };
        let updatedValues = await this.adminRepository.updateSpecality(
          id,
          data
        );
        return {
          status: true,
          message: "successes updated",
        };
      }

      return {
        status: false,
      };
    } catch (error) {
      throw error;
    }
  }

  async getDataDeletedSpecality(): Promise<ISpecality[]> {
    try {
      return await this.adminRepository.deletedSpecalitys();
    } catch (error) {
      throw error;
    }
  }

  async updateRestoreSpecality(id: string): Promise<IRestoreSpecalityResponse> {
    try {
      let response = await this.adminRepository.updateRestoreSpecalitys(id);
      console.log(response?.isDeleted == false, "fhdfd", response?.isDeleted);
      if (response?.isDeleted == false) {
        console.log("hiiii");
        return {
          status: true,
          message: "restored successfully",
        };
      }
      return {
        status: false,
        message: "it is not updated",
      };
    } catch (error) {
      throw error;
    }
  }

  async isGetPaymentHistoryData(): Promise<PaymentHistroyData[]> {
    try {
      return await this.adminRepository.fetchPaymentHistory();
    } catch (error) {
      throw error;
    }
  }

  async isGetInvoiceData(id: string): Promise<invoiceData[]> {
    try {
      return await this.adminRepository.getInvoiceData(id);
    } catch (error) {
      throw error;
    }
  }

  async isGetUsers(): Promise<IUser[]> {
    try {
      return await this.adminRepository.getUsers();
    } catch (error) {
      throw error;
    }
  }

  async isGetDoctors(): Promise<IDoctor[]> {
    try {
      return await this.adminRepository.getDoctors();
    } catch (error) {
      throw error;
    }
  }

  async isUserBlocked(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new Errors("userId is required", StatusCode.badRequest);
      }

      const data = await this.adminRepository.userBlockedStatusUpdate(
        userId,
        true
      );

      if (data == null) {
        throw new Errors("user Blocked is not changed", StatusCode.badRequest);
      }
    } catch (error) {
      throw error;
    }
  }

  async isUserUnBlocked(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new Errors("userId is required", StatusCode.badRequest);
      }

      const data = await this.adminRepository.userBlockedStatusUpdate(
        userId,
        false
      );

      if (data == null) {
        throw new Errors(
          "user unBlocked is not changed",
          StatusCode.badRequest
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async isDoctorBlocked(doctorId: string): Promise<void> {
    try {
      if (!doctorId) {
        throw new Errors("doctorid is required", StatusCode.badRequest);
      }

      const data = await this.adminRepository.doctorBlockedStatusUpdate(
        doctorId,
        true
      );

      if (data == null) {
        throw new Errors(
          "doctor Blocked is not changed",
          StatusCode.badRequest
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async isDoctorUnBlocked(doctorId: string): Promise<void> {
    try {
      if (!doctorId) {
        throw new Errors("doctorid is required", StatusCode.badRequest);
      }

      const data = await this.adminRepository.doctorBlockedStatusUpdate(
        doctorId,
        false
      );

      if (data == null) {
        throw new Errors(
          "doctor unBlocked is not changed",
          StatusCode.badRequest
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getDataSpecalityChart(): Promise<SpecialityCount[]> {
         try {
          
        return  await this.adminRepository.getSpecalityChartData()

         } catch (error) {
            throw error
         }
  }


}
