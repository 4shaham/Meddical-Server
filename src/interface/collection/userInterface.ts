import { Document, Model, ObjectId } from "mongoose";

export interface userDocument{
    _id:ObjectId;
    email: string | null;
    userName: string | null;
    phoneNumber: number | null;
    password: string | null;
    age: number | null;
    gender: string | null;
    image?: string|null;
    status: boolean | null;
}

export interface userCollection extends Model<userDocument>{

}