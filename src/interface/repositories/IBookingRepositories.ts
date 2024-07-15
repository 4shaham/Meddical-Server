import IBooking from "../../entity/bookingEntity";


export default interface IBookingRepositories{

        sotreToken(userId:string,doctorId:string,bookingDate:Date,typeOfConsaltation:string,schedulesId:string):Promise<IBooking|null>
     
}