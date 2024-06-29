import { token } from "morgan";
import DoctorAuthRepository from "../adapters/repositories/DoctorAuthRepository";
import IDoctorUseCase, {DatasKYCVerificationStep1,DatasKYCVerificationStep2,DatasOfDoctorRegistration, ResponseKycFirstStep } from "../interface/useCase/IDoctorUseCase";
import { LoginResponse } from "../interface/useCase/IDoctorUseCase";
import IJwtService from "../interface/utils/IJwtService";
import ICloudinaryService from "../interface/utils/ICloudinaryService";
import IDoctorAuthRepositories from "../interface/repositories/IDoctorAuthRepositories";

export default class DoctorAuthUseCase implements IDoctorUseCase {

  private doctorAuthRepository:IDoctorAuthRepositories
  private jwtServices:IJwtService
  private cloudinaryServices:ICloudinaryService

  constructor(doctorAuthRepository: DoctorAuthRepository,jwtServices:IJwtService,cloudinaryServices:ICloudinaryService) {
    this.doctorAuthRepository = doctorAuthRepository;
    this.jwtServices=jwtServices
    this.cloudinaryServices=cloudinaryServices
  }

  async registerDoctor(data:DatasOfDoctorRegistration): Promise<void> {
        
    try {

      console.log("hiiiiii")
      let doctor=await this.doctorAuthRepository.isDoctorExists(data.email)
      
     

      if(doctor){
       
        console.log("this email is already used")

        throw Error("email is already used")

        return 
        // {
        //   status:false
        //   message:"This Email is alredy used"
        // }
      }

      
     
     


      const url=await this.cloudinaryServices.uploadImage(data.image)

      console.log(url)

      let storedDb=await this.doctorAuthRepository.isRegesterd(data)
       
        
      console.log("storedDb",storedDb)
      
    
       

      
    } catch (error) {
      console.log(error)
      throw Error()

    }


  }

  async DoctorAuth(email: string, password: string): Promise<LoginResponse> {
    try {

     let doctor=await this.doctorAuthRepository.isDoctorExists(email)
     if(!doctor){
        return {
          status:false,
          message:"this Email is Doctor is not found"
        }
     }

     if(doctor.password != password){
       return {
        status:false,
        message:"password is not match"
       }
     }
     return {
      status:false,
      message:"password is not match"
     }

    //  if(doctor.appliedStatus == "rejected" ){
    //     return {
    //       status:false,
    //       message:"your request rejected"
    //     }
    //  }
     

    //  if(doctor.appliedStatus=="applied"){
    //      return {
    //       status:false,
    //       message:"your request will check"
    //      }
    //  }


    //  if(doctor?.approved==true && email==doctor.email && password==doctor.password){

    //       let payload={
    //         id:doctor._id,
    //         userName:doctor.name,
    //         role:"doctor"
    //       } 
    //                        // it generate token
    //       let token=await this.jwtServices.createToken(payload)
    //      return {
    //        status: true,
    //        message: "Doctor login is successfully",
    //        token:token
    //      };
    //  }else{
    //     return {
    //       status:false,
    //       message:"credentioal error"
    //     }
    //  }

    }catch (error) {
      throw Error();
    }

  }
  
  async handleKYCVerificationStep1(data:DatasKYCVerificationStep1): Promise<ResponseKycFirstStep> {
     try {
         
       console.log('hii helloo bro')
       if(data.email==""){
            return {
              status:false,
              errMessage:'credientioal err'
            }
       }

       if(data.licenseNumber==""){
        return {
          status:false,
          errMessage:'credientioal err'
        }
       }

       if(data.image==""){
        return {
          status:false,
          errMessage:'credientioal err'
        }
       }
        
     let isDoctor= await this.doctorAuthRepository.isDoctorExists(data.email)
     console.log(isDoctor)
     if(!isDoctor){
      return {
        status:false,
        errMessage:'This email account user is not here'
      }
     }

     let KycData=await this.doctorAuthRepository.kycStorStep1(data)
     console.log(KycData,"kiiiiiiiiii")

     return {
      status:true,
      message:"fist step successfully completed"
     }
     
     } catch (error){
        console.log(error,"jiiiiiii")
        throw error
     } 
  }
  

   async handleKYCVerificationStep2(data:DatasKYCVerificationStep2): Promise<ResponseKycFirstStep> {
          try {
           
           console.log(data.acheivemnts,"hiiii")
           let response=await this.doctorAuthRepository.kycStorStep2(data)

           if(response?.appliedStatus=="applied"){
            return {
              status:true,
              message:"completed kyc Verification Step"
            }
           }else{
              return {
                status:false,
                errMessage:"not completed"
              }
           }

          } catch (error) {

             throw error

          }
  }



 
}
