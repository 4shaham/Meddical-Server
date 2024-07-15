

export default interface IBookingDb{
    doctorId:string,
    date:Date,
    tokenId:string,
    userId:string,
    conusultationType:"online"|"offline"
}