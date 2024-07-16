import IBooking from "../../entity/bookingEntity";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";


export default interface IBookingRepositories{

        storeToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string,slotNumber:number):Promise<IBooking|null>
        verifyAvaliableSlot(scehduleId:string,slotNumber:number):Promise<IDoctorSchedule|null>
        updatedScheduledStatus(scheduleId:string,slotNumber:number,status:boolean):Promise<IDoctorSchedule|null>
        fetchBookingData(id:string):Promise<IBooking|null>
        canceledBookingStatus(bookingId:string):Promise<IBooking|null>
        fetchBookingdatasWithStatus(id:string,statusType:string):Promise<IBooking|null[]>
        updatedBookingDbCanceledStatus(id:string):Promise<IBooking|null>
}