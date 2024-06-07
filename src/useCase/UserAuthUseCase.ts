import UserAuthRepository from "../adapters/repositories/UserAuthRepository";
import { registerBody } from "../interface/controler/IUserAuthController";
import IuserUseCase from "../interface/useCase/IUseruseCase";
import HashingServices from "../framework/utils/hashingService";

class UserAuthUseCase implements IuserUseCase {
  private userAuthRepository: UserAuthRepository;
  private hashingServices: HashingServices;

  constructor(
    userAuthRepository: UserAuthRepository,
    hashingServices: HashingServices
  ) {
    this.userAuthRepository = userAuthRepository;
    this.hashingServices = hashingServices;
  }

  async registerUser(data: registerBody): Promise<void> {
    try {
      let emailExists = await this.userAuthRepository.checkEmailExists(
        data.email
      );
      let phoneNumberExists =
        await this.userAuthRepository.checkPhoneNumberExists(data.phoneNumber);

      if (emailExists && phoneNumberExists) {
        throw new Error("Email and phone Number is already used");
      }

      if (emailExists) {
        throw new Error("Email already exists");
      }

      if (phoneNumberExists) {
        throw new Error("This phone Number is already used");
      }

      let bcryptPassword = await this.hashingServices.hashing(data.password);
      data.password = bcryptPassword;

      await this.userAuthRepository.createUser(data);
    } catch (error) {
      throw error;
    }
  }

  
}

export default UserAuthUseCase;
