import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";
import IDoctorUseCase from "../interface/useCase/IDoctorUseCase";
import { LoginResponse } from "../interface/useCase/IDoctorUseCase";


export default class DoctorAuthUseCase implements IDoctorUseCase{
    
  private doctorAuthRepository: DoctorAuthRepository;
  constructor(doctorAuthRepository: DoctorAuthRepository) {
    this.doctorAuthRepository = doctorAuthRepository;
  }

  async registerDoctor(): Promise<void> {
    
  }

  async DoctorAuth():Promise<LoginResponse> {
    try {

      

      return {
        status:true,
        Message:"shshahs"
      }
    }catch(error) {
       throw Error()
    }
  }
}