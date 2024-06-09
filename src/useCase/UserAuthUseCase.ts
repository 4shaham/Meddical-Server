

import { loginBody, registerBody } from "../interface/controler/IUserAuthController";
import IuserUseCase, { resObj } from "../interface/useCase/IUseruseCase";
import IhasingService from "../interface/utils/IHasingService";
import IuserRepositories from "../interface/repositories/IUserRepositories";
import IOtpServices from "../interface/utils/IOtpServices";
import IJwtService from "../interface/utils/IJwtService";


class UserAuthUseCase implements IuserUseCase {
  private userAuthRepository:IuserRepositories;
  private hashingServices:IhasingService;
  private otpServices:IOtpServices;
  private jwtServices:IJwtService

  constructor(
    userAuthRepository:IuserRepositories,
    hashingServices:IhasingService,
    otpServices:IOtpServices,
    jwtServices:IJwtService
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

  async authenticateUser(data: loginBody): Promise<resObj|null> {

    try {

                       // this will check the email user is valid or notvalid
      let values=await this.userAuthRepository.checkEmailExists(data.email)
    
      if(values){
 
                            // comparing passwrod
         const status=await this.hashingServices.compare(data.password,values.password)   
         if(!status){
            // return 401 eroor
            return {status:false,message:"the password is not match"}
         }


        // token data paylod
         let payload={
           userId:values._id,
           userName:values.userName
         }
                    // it generate token
         let token=await this.jwtServices.createToken(payload)
      
        // success response send 
       return {token,status:true,message:"the login sucesss"}   
   
      }else{
        // return 401 eroor
        return {status:false,message:"this email is not valid"}
      }
    } catch (error) {
        throw error
    }
    
  }
}

export default UserAuthUseCase;
