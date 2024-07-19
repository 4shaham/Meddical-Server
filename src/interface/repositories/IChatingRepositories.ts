import ConversationEntity from "../../entity/conversationEntity";
import MessageEntity from "../../entity/messageEntity";


export default interface IChatingRepositories{
      storeConversation(senderId:string,receiverID:string):Promise<ConversationEntity>
      getConversation(id:string):Promise<ConversationEntity|null[]>
      storeMessage(conversationId:string,sender:string,message:string):Promise<MessageEntity>
}