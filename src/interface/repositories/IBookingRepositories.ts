import IBooking from "../../entity/bookingEntity";
import ConversationEntity from "../../entity/conversationEntity";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import PaymentEntity from "../../entity/paymentEntity";


export default interface IBookingRepositories{

        storeToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string,slotNumber:number,startTime:string,endTime:string):Promise<IBooking|null>
        verifyAvaliableSlot(scehduleId:string,slotNumber:number):Promise<IDoctorSchedule|null>
        updatedScheduledStatus(scheduleId:string,slotNumber:number,status:boolean):Promise<IDoctorSchedule|null>
        fetchBookingData(id:string):Promise<IBooking|null>
        canceledBookingStatus(bookingId:string):Promise<IBooking|null>
        fetchBookingdatasWithStatus(id:string,statusType:string):Promise<IBooking[]>
        updatedBookingDbCanceledStatus(id:string):Promise<IBooking|null>
        storePaymentData(tokenId:string,doctorId:string,transactionId:string,userId:string,amount:number,paymentMethod:string):Promise<PaymentEntity>
        fetchSchedule(id:string):Promise<IDoctorSchedule|null>
        reschedulUpdateBookingDb(id:string,newSlotNumber:number):Promise<IDoctorSchedule|null>
        isExists(userId:string,doctorId:string):Promise<ConversationEntity|null>
        storeConverasation(userId:string,doctorId:string):Promise<ConversationEntity>
}