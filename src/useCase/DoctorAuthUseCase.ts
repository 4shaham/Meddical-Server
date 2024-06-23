import { token } from "morgan";
import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";
import IDoctorUseCase from "../interface/useCase/IDoctorUseCase";
import { LoginResponse } from "../interface/useCase/IDoctorUseCase";
import IJwtService from "../interface/utils/IJwtService";

export default class DoctorAuthUseCase implements IDoctorUseCase {
  private doctorAuthRepository: DoctorAuthRepository;
  private jwtServices:IJwtService
  constructor(doctorAuthRepository: DoctorAuthRepository,jwtServices:IJwtService) {
    this.doctorAuthRepository = doctorAuthRepository;
    this.jwtServices=jwtServices
  }

  async registerDoctor(): Promise<void> {}

  async DoctorAuth(email: string, password: string): Promise<LoginResponse> {
    try {

     let doctor=await this.doctorAuthRepository.isDoctorExists(email)

     if(doctor?.approved==true && email==doctor.email && password==doctor.password){


         let payload={
           id:doctor._id,
           userName:doctor.name,
           role:"doctor"
         }
                    // it generate token
         let token=await this.jwtServices.createToken(payload)
      return {
        status: true,
        Message: "Doctor login is successfully",
        token:token
      };
     }

      return {
        status: true,
        Message: "shshahs",
      };
    } catch (error) {
      throw Error();
    }
  }

 
}
