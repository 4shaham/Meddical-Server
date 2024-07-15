import IBooking from "../../entity/bookingEntity";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";


export default interface IBookingRepositories{

        sotreToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string):Promise<IBooking|null>
        verifyAvaliableSlot(doctorID:string,bookingDate:Date,schedulesId:string):Promise<IDoctorSchedule|null>
}