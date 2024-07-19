import ConversationEntity from "../../entity/conversationEntity"

export default interface IChatingUseCase{
    verifyCreateConverasation(senderId:string,receiverID:string):Promise<void>
    getConversationData(id:string):Promise<ConversationEntity|null[]>
    handleStoreMessage(converasationId:string,sender:string,message:string):Promise<void>
}