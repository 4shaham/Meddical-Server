import ConversationEntity from "../../entity/conversationEntity";
import MessageEntity from "../../entity/messageEntity";


export default interface IChatingRepositories{
      storeConversation(doctorId:string,userId:string):Promise<ConversationEntity>
      getConversation(id:string):Promise<ConversationEntity|null[]>
      storeMessage(conversationId:string,sender:string,message:string):Promise<MessageEntity>
      getMessage(conversationId:string):Promise<MessageEntity|null[]>
}