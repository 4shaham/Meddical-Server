import { Document } from "mongoose";

export default interface IUser extends Document {

    _id: string;
    email: string ;
    userName: string;
    phoneNumber: number;
    password: string;
    age: number;
    gender: string;
    status: boolean;
    image?:string;
    otpVerified:boolean;

}

