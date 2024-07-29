

export default interface PaymentEntity{
    _id:string,
    tokenId:string,
    doctorId:string,
    transactionId:string,
    userId:string,
    amount:number,
    paymentMethod:string,
    createdAt:string,
    updateAt:string
}