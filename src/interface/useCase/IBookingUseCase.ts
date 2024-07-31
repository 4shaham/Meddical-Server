import IBooking from "../../entity/bookingEntity"


export  interface VerfiyResponse{
    status:boolean,
    message:string,
    slotId:string,
    doctorId:string
}

export default interface IBookingUseCase{

    verifyCreateToken(userId:string,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number,startTime:string,endTime:string):Promise<VerfiyResponse>
    verifyCancelToken(bookingID:string):Promise<void>
    findBookingDataWithStatus(id:string,statausType:string):Promise<IBooking[]>
    verifyPaymentCheckOut(fees:number):Promise<string>
    verifyWebHook(req:any):Promise<boolean>
    savePaymentData(tokenId:string,scheduleId:string,transactionId:string,userId:string,amount:number,paymentMethod:string,slotNumber:number):Promise<void>
    isRescheduling(slotId:string,slotNumber:number,scheduleId:string,newSlotNumber:number):Promise<void>
    createConverasation(userId:string,doctorId:string):Promise<void>
}
