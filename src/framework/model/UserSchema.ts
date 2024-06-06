
import mongoose, {Schema,Model } from "mongoose";
import { userCollection,userDocument } from "../../interface/collection/userInterface";


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
        type:Number,
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
    status:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true 
})


const Users:userCollection=mongoose.model<userDocument>('Users',UserSchema)

export default Users






  