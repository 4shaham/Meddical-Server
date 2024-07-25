import { NextFunction, Request, Response } from "express";
import IChatingContrller from "../../interface/controler/IChatingContrller";
import IChatingUseCase from "../../interface/useCase/IChatingUseCase";
import { StatusCode } from "../../enums/statusCode";

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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id:string=req.query.id as string;
      const data = await this.chatingUseCase.getConversationData(id);
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
      await this.chatingUseCase.handleStoreMessage(
        conversationId,
        senderId,
        text
      );
      res.status(StatusCode.success).json({message:"sucessfully stored the message"})

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
