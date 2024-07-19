import ConversationEntity from "../../entity/conversationEntity"
import MessageEntity from "../../entity/messageEntity"

export default interface IChatingUseCase{
    verifyCreateConverasation(senderId:string,receiverID:string):Promise<void>
    getConversationData(id:string):Promise<ConversationEntity|null[]>
    handleStoreMessage(converasationId:string,sender:string,message:string):Promise<void>
    handleGetMessage(convrasationId:string):Promise<MessageEntity|null[]>
}