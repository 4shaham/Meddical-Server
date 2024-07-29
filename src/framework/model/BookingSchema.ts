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
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    conusultationType:{
        type:String,
        enum:["online","offline"],
        required:true
    },
    scheduleId:{
        type:mongoose.Types.ObjectId,
         required:true
    },
    slotNumber:{
        type:Number,
        required:true 
    },
    tokenStatus:{
        type:String,
        default:"pending",
        enum: ["pending","visited"], 
    },
    startTime:{
        type:String,
    },
    endTime:{
        type:String
    },
    isCanceled:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true,
  })

const BookingDb=mongoose.model<IBooking>("BookingDb",bookingSchema)


export default BookingDb
