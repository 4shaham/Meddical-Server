import { Request, Response } from "express";
import UserAuthUseCase from "../../useCase/UserAuthUseCase";


class UserAuthController{

    private userAuthUseCase:UserAuthUseCase;  

    constructor(userAuthUseCase:UserAuthUseCase){
         this.userAuthUseCase=userAuthUseCase
    }

    async Register(req:Request,res:Response){
          const{email,password,gender,userName,age,phoneNumber}=req.body
       await this.userAuthUseCase.registerUser(email,password,age,gender,userName,phoneNumber)

    }

    async login(req:Request,res:Response){
     const{email,password}=req.body
     try{

        await this.userAuthUseCase.loginUser(email,password)

     }catch(error){

     }    

      

    }

    async verifyOrp(){
        
    }
    
  
}

export default UserAuthController




