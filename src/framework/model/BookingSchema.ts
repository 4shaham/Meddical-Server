import mongoose, { Schema } from "mongoose";
import IBookingDb from "../../entity/bookingEntity";


const bookingSchema=new Schema({

    doctorId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    tokenNumber:{
        type:Number,
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


const BookingDb=mongoose.model<IBookingDb>("BookingDb",bookingSchema)


export default BookingDb
