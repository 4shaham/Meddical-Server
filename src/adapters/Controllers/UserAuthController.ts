import { Request, Response } from "express";
import UserAuthUseCase from "../../useCase/UserAuthUseCase";

class UserAuthController{

    private userAuthUseCase:UserAuthUseCase;  

    constructor(userAuthUseCase:UserAuthUseCase){
         this.userAuthUseCase=userAuthUseCase
    }

    async Register(req:Request,res:Response){
            console.log(req.body)
    }

    async login(req:Request,res:Response){
        const{email,password}=req.body
      
        
    }
    
  
}

export default UserAuthController




