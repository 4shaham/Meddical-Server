import mongoose, { Schema } from "mongoose";
import IKyc from "../../entity/kycEntity";



const KycSchema:Schema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    licenseNumber:{
        type:String
    },
    licenseImage:{
        type:String
    },
    yearsOfexperience:{
        type:Number,
        default:0
    },
    identityCardImage:{
        type:String
    },
    achievements:[{
        date:Date,
        description:String,
        title:String
    }],
    experiences:[{
        startDate:Date,
        hospitalName:String,
        responsibilities:String,
        endDate:Date
    }],
    step:{
        type:Number,
        default:0
    },
    status:{
        type:Boolean,
        default:false
    },
    appliedStatus:{
        type: String,
        enum: ["approved","applied","rejected","inProgress"], 
        default: "inProgress"
    },   
})



const Kyc = mongoose.model<IKyc>("Kyc",KycSchema);
export default Kyc;