
import mongoose, {Schema,Model } from "mongoose";
import IUser from "../../entity/userEntity";


const UserSchema:Schema=new Schema({

    userName:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },  
    image:{
        type:String,
        default:null
    },
    status:{
        type:Boolean,
        default:false
    },
    otpVerified:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true 
})


const Users=mongoose.model<IUser>('Users',UserSchema)
  
export default Users
   





  