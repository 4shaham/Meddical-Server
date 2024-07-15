
export default interface IBookingUseCase{


    verifyCreateToken(userId:string,doctorId:string,bookingDate:Date,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number):Promise<void>
    

}
