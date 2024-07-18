

export default interface ConversationEntity{
    _id:string,
    members:[{
        doctorId:string,
        userId:string,
    }]
}

