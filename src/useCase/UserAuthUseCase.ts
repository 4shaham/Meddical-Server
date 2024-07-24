

import { googleAuthBody, loginBody, otpVerifyData, registerBody } from "../interface/controler/IUserAuthController";
import IuserUseCase, { VerifyTokenResponse, resObj } from "../interface/useCase/IUseruseCase";
import IhasingService from "../interface/utils/IHasingService";
import IuserRepositories from "../interface/repositories/IUserRepositories";
import IOtpServices from "../interface/utils/IOtpServices";
import IJwtService from "../interface/utils/IJwtService";
import IUser from "../entity/userEntity";


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

      const otp:string=await this.otpServices.generateOtp();
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
       console.log(values)
      if(values){
         
         if(!values.password){
            return {
              status:false,message:"this account for login only googleAuth"
            }
         }
                            // comparing passwrod
         const status=await this.hashingServices.compare(data.password,values.password)   
         if(!status){
            // return 403 eroor
            return {status:false,message:"the password is not match"}
         }
         
         if(values.otpVerified==false){
                  
          const otp:string=await this.otpServices.generateOtp();
          await this.userAuthRepository.saveOtp(values.email, otp);
          await this.otpServices.sendOtpEmail(values.email, otp,values.userName);
            
          return {status:false,message:"otp is not verified"}
           
         }


        // token data paylod
         let payload={
           id:values._id,
           userName:values.userName,
           role:"user"
         }
                    // it generate token
         let token=await this.jwtServices.createToken(payload)
      
        // success response send 
       return {token,status:true,message:"the login sucesss"}   
   
      }else{
        // return 403 eroor
        return {status:false,message:"this email is not valid"}
      }
    } catch (error) {
        throw error
    }
    
  }

  
  async verifyOtp(data: otpVerifyData): Promise<resObj|null> {

      try {
       console.log(data.email,data.otp)
       let otpDatas=await this.userAuthRepository.verifyOTP(data.email)
       console.log(otpDatas)
        console.log(data.typeOfOtp.trim())
        if(data.typeOfOtp.trim()=="userEmailVerification"){
           console.log('hiii')
        }
       
       if(otpDatas && otpDatas.otp == data.otp && data.typeOfOtp.trim()=="userEmailVerification"){  
      

        console.log("hiiiiiiiii shahama it is sucess ")

        let values=await this.userAuthRepository.updateOtpVerified(data.email)
        
        if(values){

          let payload={
            id:values?._id,
            userName:values?.userName,
            role:"user"
          }
                     // it generate token
          let token=await this.jwtServices.createToken(payload)

          return {status:true,message:"the Otp verification is completed",token}
           
        }
       
        
       
         
       }


       if(otpDatas && otpDatas.otp==data.otp && data.typeOfOtp.trim() == "forgotPassword"){
        return {status:true,message:"the Otp verification is completed"}
       }

       return {status:false,message:"the Otp verification is failed"}

      
        
      } catch (error) {
        throw Error() 
      }
        
   }


    async resendOtp(email: string): Promise<string | null> {
   
      try {
          
          let values=await this.userAuthRepository.checkEmailExists(email)
          
          if(values){
            const otp:string=await this.otpServices.generateOtp();
            await this.userAuthRepository.saveOtp(email, otp);
            await this.otpServices.sendOtpEmail(email,otp,values.userName);
            return "resendOtp sucussess" 
          } 

          return "resednOtp Not valid email"

      } catch (error) {

        throw error
        
      }
      

   }


   async validateForgotPassword(email: string): Promise<string> {
       
    try {
      
      let userData=await this.userAuthRepository.checkEmailExists(email)
      
      if(!userData){
          return "this email user Is not here"
      }

      const otp:string=await this.otpServices.generateOtp();
      await this.userAuthRepository.saveOtp(email,otp);
      await this.otpServices.sendOtpEmail(email,otp,userData.userName);
      return "otp send"
    } catch (error) {
      throw Error()
    }

   }

  
  async verifyingUpdatePassword(email: string, password: string): Promise<void> {
       
   try {

    const user=this.userAuthRepository.checkEmailExists(email)

    if(!user){
       throw Error()
    }

    const hashedPassword:string=await this.hashingServices.hashing(password)
    await this.userAuthRepository.changePassword(email,hashedPassword)
    
   } catch (error) {
      throw Error()
   }
   
  }
   
   async verifyToken(token: string):Promise<VerifyTokenResponse> {
         
    try {
        
      let response=this.jwtServices.verify(token)
      
      if(response?.role=="user"){
         
        return {

          status:true,
          decoded:response

        }

      }

      return {
        status:false,
      }
      
    } catch (error) {
        throw Error()
    }
   }


 async  googleAuthenticateUser(data: googleAuthBody): Promise<resObj | null> {
     try {


        let user=await this.userAuthRepository.checkEmailExists(data.email)
        console.log(user,"hiiiii user")
        if(!user){
          console.log("jiiiipan")
          await this.userAuthRepository.saveGooogleAuth(data.email,data.userName,data.image)
        }

        let Tuser=await this.userAuthRepository.checkEmailExists(data.email)

        let payload={
          id:Tuser?._id as string,
          userName:Tuser?.userName as string,
          role:"user"
        }

        // it generate token
        let token=await this.jwtServices.createToken(payload)

        return {status:true,message:"googleAuthenticated Successfully",token}
   
     } catch (error) {
       throw Error()
     }
   }


   async verifyProfileData(id: string): Promise<IUser | null> {
        try {
           
          return  await this.userAuthRepository.fetchPrfileData(id)

        } catch (error) {
           throw error
        }
   }

}

export default UserAuthUseCase;
