

export default interface IBookingDb{
    doctorId:string,
    date:Date,
    tokenNumber:number,
    userId:string,
    conusultationType:"online"|"offline"
}