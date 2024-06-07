import UserAuthRepository from "../adapters/repositories/UserAuthRepository";
import { loginBody, registerBody } from "../interface/controler/IUserAuthController";
import IuserUseCase from "../interface/useCase/IUseruseCase";
import HashingServices from "../framework/utils/hashingService";
import OtpService from "../framework/utils/otpService";
import JwtService from "../framework/utils/jwtService";

class UserAuthUseCase implements IuserUseCase {
  private userAuthRepository: UserAuthRepository;
  private hashingServices: HashingServices;
  private otpServices: OtpService;
  private jwtServices:JwtService

  constructor(
    userAuthRepository: UserAuthRepository,
    hashingServices: HashingServices,
    otpServices: OtpService,
    jwtServices:JwtService
  ) {
    this.userAuthRepository = userAuthRepository;
    this.hashingServices = hashingServices;
    this.otpServices = otpServices;
    this.jwtServices=jwtServices
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

      const otp: string = await this.otpServices.generateOtp();

      await this.userAuthRepository.saveOtp(data.email, otp);
      await this.otpServices.sendOtpEmail(data.email, otp,data.userName);
    } catch (error) {
      throw error;
    }
  }

  async authenticateUser(data: loginBody): Promise<string> {

    try {
      let values=await this.userAuthRepository.checkEmailExists(data.email)
    
      if(values){
 
      const status=await this.hashingServices.compare(data.password,values.password)
      
         if(!status){
            throw new Error("the passsword is not match")
         }

         let payload={
           userId:values._id,
           userName:values.userName
         }

       let token=await this.jwtServices.createToken(payload)
          
         return token
   
      }else{
        throw new Error("this email is not valid")
      }
    } catch (error) {
     
        console.log(error)
        return "eriu"

    }
    
    

  }
}

export default UserAuthUseCase;
