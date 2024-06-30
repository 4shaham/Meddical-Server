import { Document } from "mongoose";

export default interface ISpecality extends Document {
    _id:string;
    image:string;
    name:string,
    isDeleted:boolean
}
