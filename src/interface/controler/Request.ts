import { Request } from "express";


export default interface IRequest extends Request{
    doctorID?:string
}