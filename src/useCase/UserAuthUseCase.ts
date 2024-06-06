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

    if(emailExists){
      throw new Error('Email already exists');
    }

    await this.userAuthRepository.createUser(data)
      
    } catch (error) {
       
    }
    


  } 

   
  // async loginUser(email:string,password:string){

       
  //   let user=await this.userAuthRepository.findByEmail(email);
    
  //   if(!user){
  //       console.log("the email is not valid")
  //   }

  //    console.log(user)
  // }

  // async registerUser(email:string,password:string,age:number,gender:string,userName:string,phoneNumber:Number) {

  //   try{
        
  //    if (!email || !password || !age || !gender || !userName || !phoneNumber) {
  //       throw new Error('Missing required fields');
  //    }
  
       
  //   let user=  await this.userAuthRepository.createUser(email,password,age,gender,userName,phoneNumber)
    

  //   }catch(err){
         
          


  //   }

  // }
}
  
export default UserAuthUseCase;
