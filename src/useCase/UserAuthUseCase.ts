import UserAuthRepository from "../adapters/repositories/UserAuthRepository";
import { registerBody } from "../interface/controler/IUserAuthController";
import IuserUseCase from "../interface/useCase/IUseruseCase";

class UserAuthUseCase implements IuserUseCase {

  private userAuthRepository: UserAuthRepository;
  constructor(userAuthRepository: UserAuthRepository) {
    this.userAuthRepository = userAuthRepository;
  }
  
  

  async registerUser(data:registerBody): Promise<void> {

    try {

    let emailExists= await this.userAuthRepository.checkEmailExists(data.email)
    let phoneNumberExists=await this.userAuthRepository.checkPhoneNumberExists(data.phoneNumber)
    

    if(emailExists){
      throw new Error('Email already exists');
    }

    if(phoneNumberExists){
      throw new Error('This phone Number is already used')
    }

     await this.userAuthRepository.createUser(data)  
                 
    } catch (error) {
  
      throw error
       
    }
    


  } 

  
}
  
export default UserAuthUseCase;
