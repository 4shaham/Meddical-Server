import { Request, Response, NextFunction } from "express"
import IUserUseCase from "../../interface/useCase/IUseUseCase"
import IUserController from "../../interface/controler/IUserController"
import { StatusCode } from "../../enums/statusCode"


export default class UserController implements IUserController {
            
 
  private userUseCase:IUserUseCase 

  constructor(userUseCase:IUserUseCase){
     this.userUseCase=userUseCase
  }
  

  async getPrescriptionData(req: Request, res: Response, next: NextFunction): Promise<void> {
       try {
         const id=req.query.id  
         const data=await this.userUseCase.isGetDataPrescription(id as string)
         res.status(StatusCode.success).json({prescriptionData:data})
       } catch (error) {
          next (error)
       }
  }

}