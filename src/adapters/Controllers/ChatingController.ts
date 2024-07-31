import { NextFunction, Request, Response } from "express";
import IChatingContrller from "../../interface/controler/IChatingContrller";
import IChatingUseCase from "../../interface/useCase/IChatingUseCase";
import { StatusCode } from "../../enums/statusCode";
import IRequest from "../../interface/controler/Request";
import IAuthRequest from "../../interface/User/authRequest";

export default class ChatingControllers implements IChatingContrller {
  private chatingUseCase: IChatingUseCase;
  constructor(chatingUseCase: IChatingUseCase) {
    this.chatingUseCase = chatingUseCase;
  }

  async createConversation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { doctorId, userId } = req.body;
      await this.chatingUseCase.verifyCreateConverasation(doctorId,userId);
      res
        .status(StatusCode.success)
        .json({ message: "successfully created conversation" });
    } catch (error) {
      next(error);
    }
  }

  async getConversation(
    req: IAuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log("shahahma getConverassaion")
      const id:string=req.userId as string;
      const data = await this.chatingUseCase.getConversationData(id);
      res.status(StatusCode.success).json({converasation:data});
    } catch (error) {  
      console.log(error)
      next(error);
    }
  }


  async doctorGetConversation(req: IRequest, res: Response, next: NextFunction): Promise<void> {
        try{
          const id:string=req.doctorID as string
          const data = await this.chatingUseCase.getConversationData(id);
          console.log(data)
          res.status(StatusCode.success).json({converasation:data});
        } catch (error) {
          next(error);
        }
  }

  async createMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {

      const { conversationId, senderId, text } = req.body;
    const data=await this.chatingUseCase.handleStoreMessage(
        conversationId,
        senderId,
        text
      );
      res.status(StatusCode.success).json({message:"sucessfully stored the message",newMessage:data})

    } catch (error) {
      next(error);
    }
  }

  async getMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
         try {

          const converasationId:string=req.query.converasationId as string
          const data=await this.chatingUseCase.handleGetMessage(converasationId)
          res.status(StatusCode.success).json({messages:data})
            
         } catch (error) {
             console.log('errorrr here is any error')
             next(error)
         }
  }


  
 


}
