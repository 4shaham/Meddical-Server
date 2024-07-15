import mongoose, { Schema } from "mongoose";
import IBooking from "../../entity/bookingEntity";


const bookingSchema=new Schema({
    doctorId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    tokenId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    conusultationType:{
        type:String,
        enum:["online","offline"],
        required:true
    }
})


const BookingDb=mongoose.model<IBooking>("BookingDb",bookingSchema)


export default BookingDb
