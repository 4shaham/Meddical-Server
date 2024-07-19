import { Model } from "mongoose";
import ConversationEntity from "../../entity/conversationEntity";
import MessageEntity from "../../entity/messageEntity";
import IChatingRepositories from "../../interface/repositories/IChatingRepositories";
import mongoose, { ObjectId } from "mongoose";
const { ObjectId } = mongoose.Types;

export default class ChatingRepository implements IChatingRepositories {
  private converasation: Model<ConversationEntity>;
  private message: Model<MessageEntity>;

  constructor(
    converasation:Model<ConversationEntity>,
    message:Model<MessageEntity>
  ){
    (this.converasation = converasation), (this.message = message);
  }

  async storeConversation(
    doctorId: string,
    userId: string
  ): Promise<ConversationEntity> {
    try {
      const converasation = new this.converasation({
        members:[{
          doctorId:doctorId,
          userId:userId
        }],
      });
      return await converasation.save();
    } catch (error) {
      throw error;
    }
  }

  async getConversation(id:string): Promise<ConversationEntity|null[]> {
    try {
      // return await this.converasation.find({members:{$in:[id]}})
      return await this.converasation.find({$or:[{"members.userId":id},{"members.doctorId":id}]})
    } catch (error) {
      throw error;
    }
  }


  async storeMessage(conversationId:string,sender:string,message:string): Promise<MessageEntity> {
       try {
          const data = new this.message({
            conversationId:conversationId,
            sender:sender,
            text:message
          })
          return await data.save()

       } catch (error) {
         throw error
       }
  }


  async getMessage(conversationId: string): Promise<MessageEntity | null[]> {
       try {
         return await this.message.find({conversationId:conversationId})
       } catch (error) {
          throw error
       }
  }


  
    
  

}
