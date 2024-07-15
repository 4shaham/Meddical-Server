

export default interface IBooking{
    doctorId:string,
    date:Date,
    tokenId:string,
    userId:string,
    conusultationType:"online"|"offline"
}