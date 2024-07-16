import IBooking from "../../entity/bookingEntity"


export  interface VerfiyResponse{
    status:boolean,
    message:string
}

export default interface IBookingUseCase{


    verifyCreateToken(userId:string,fees:number,typeOfConsaltation:string,schedulesId:string,slotNumber:number):Promise<VerfiyResponse>
    verifyCancelToken(bookingID:string):Promise<void>
    findBookingDataWithStatus(id:string,statausType:string):Promise<IBooking|null[]>

}
