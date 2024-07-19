import { NextFunction, Request, Response } from "express"
import JwtService from "../utils/jwtService"

const jwtService=new JwtService()


const chatingAuthMiddleware= async(req:Request,res:Response,next:NextFunction)=>{
    //   try {

    //     const doctorToken=req.cookies.doctorToken
    //     const userToken=req.cookies.token

    //     const data;
        
    //     if(doctorToken){
    //         await jwt
    //     }

    //     const tokens= await jwtService.verify()


    //   } catch (error) {
    //       return res.status(401).json({"message"})
    //   }
}