import { NextFunction, Request, Response } from "express";
import Doctor from "../../model/DoctorSchema";
import IRequest from "../../../interface/controler/Request";
import { StatusCode } from "../../../enums/statusCode";


export const isDoctorBlockedMiddleware=async(req:IRequest,res:Response,next:NextFunction)=>{
       try {
        
        const id=req.doctorID

        const doctor=await Doctor.findOne({_id:id})

        if(doctor?.isBlocked==true){

            res.clearCookie("doctorToken");
            res.status(StatusCode.UnAuthorized).json({message:"doctor is blocked"})
            return
            
        }
        next()

       } catch (error) {
           res.status(500).json({message:"internal server error"})
       }            
}