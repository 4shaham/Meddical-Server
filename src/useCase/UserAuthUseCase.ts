import UserAuthRepository from "../adapters/repositories/UserAuthRepository";

class UserAuthUseCase {

  private userAuthRepository: UserAuthRepository;

  constructor(userAuthRepository: UserAuthRepository) {
    this.userAuthRepository = userAuthRepository;
  }

  async loginUser(email:string,password:string){

     
    let user=await this.userAuthRepository.findByEmail(email);
    
    if(!user){
        console.log("the email is not valid")
    }

     console.log(user)
  }

  async registerUser(email:string,password:string,age:number,gender:string,userName:string,phoneNumber:Number) {

    try{
        
     if (!email || !password || !age || !gender || !userName || !phoneNumber) {
        throw new Error('Missing required fields');
     }
  
       
    let user=  await this.userAuthRepository.RegisterUser(email,password,age,gender,userName,phoneNumber)
    

    }catch(err){
         
          


    }

  }
}
  
export default UserAuthUseCase;
