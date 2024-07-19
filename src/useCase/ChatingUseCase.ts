import { error } from "console";
import IChatingRepositories from "../interface/repositories/IChatingRepositories";
import IChatingUseCase from "../interface/useCase/IChatingUseCase";
import Errors from "../erros/errors";
import { StatusCode } from "../enums/statusCode";
import ConversationEntity from "../entity/conversationEntity";
import MessageEntity from "../entity/messageEntity";


export default class ChatingUseCase implements IChatingUseCase {

    private chatingRepositories:IChatingRepositories
    constructor(chatingRepositories:IChatingRepositories){
        this.chatingRepositories=chatingRepositories
    }

  async verifyCreateConverasation(senderId: string, receiverID: string): Promise<void> {
       try {
           if(!senderId||!receiverID){
              throw new Errors("senderId and recieverId is required",StatusCode.badRequest)
           }
           await this.chatingRepositories.storeConversation(senderId,receiverID)
                    
       } catch (error) {
            throw error
       }
  }


  async getConversationData(id: string): Promise<ConversationEntity | null[]> {
        try {
           return await this.chatingRepositories.getConversation(id)
        } catch (error) {
             throw error
        }
  }


  async handleStoreMessage(converasationId:string,sender:string,message:string): Promise<void> {
       try {
          await this.chatingRepositories.storeMessage(converasationId,sender,message)
       } catch (error) {
            throw error      
       }
  }


  async handleGetMessage(convrasationId: string): Promise<MessageEntity | null[]> {
       try {
          return await this.chatingRepositories.getMessage(convrasationId)
       } catch (error) {
         throw error
       }
  }



}