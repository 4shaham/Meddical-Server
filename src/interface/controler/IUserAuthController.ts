import { Request, Response } from "express";


export default interface IUserAuthController{

    register(req:Request,res:Response):Promise<void>
     

}

export interface registerBody{
 
    email:string,
    userName:string,
    age:number,
    gender:string,
    password:Number,
    phoneNumber:Number

}