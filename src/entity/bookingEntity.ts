

enum TokenStatus{
    applied="applied",
    visted="visted"
}


export default interface IBooking{
    _id:string,
    doctorId:string,
    date:Date,
    userId:string,
    conusultationType:"online"|"offline",
    scheduleId:string,
    slotNumber:number,
    tokenStatus:TokenStatus,
    startTime:string
    endTime:string,
    isCanceled:boolean
}






