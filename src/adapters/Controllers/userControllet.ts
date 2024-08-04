import { Request, Response, NextFunction } from "express"
import IUserUseCase from "../../interface/useCase/IUseUseCase"
import IUserController from "../../interface/controler/IUserController"
import { StatusCode } from "../../enums/statusCode"
import IRequest from "../../interface/controler/Request"
import IAuthRequest from "../../interface/User/authRequest"


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

  async getPaymentHistory(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
       try {
          const id=req.userId

          const data=await this.userUseCase.isGetDataPayment(id as string)
          res.status(StatusCode.success).json({transactionData:data})

       } catch (error){
           next (error)
       }
  }


  async getInvoiceData(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
        try {
              
         const id:string=req.query.id as string

         const response=await this.userUseCase.isGetInvoiceData(id)

         res.status(StatusCode.success).json({invoiceData:response})

        } catch (error) {
           next(error)
        }
  }


  async updateProfile(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
       try {
         
         

       } catch (error) {
          next(error)
       }
  }



}