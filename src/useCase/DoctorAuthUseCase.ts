import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";



export default class DoctorAuthUseCase{
    


    private doctorAuthRepository: DoctorAuthRepository;
  constructor(doctorAuthRepository: DoctorAuthRepository) {
    this.doctorAuthRepository = doctorAuthRepository;
  }


}