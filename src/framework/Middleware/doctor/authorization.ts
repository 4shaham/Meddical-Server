import { NextFunction, Request, Response } from "express";

import JwtService from "../../utils/jwtService";
import IRequest from "../../../interface/controler/Request";



const Jwtservice=new JwtService()


const authorization=async(req:IRequest,res:Response,next:NextFunction)=>{
      
      try {

         const token=req.cookies.doctorToken
         console.log(token,"doctor middleware")
         let verification=await Jwtservice.verify(token)
         req.doctorID=verification?.id
         next()

      } catch (error) {
         
         console.log("eroorr")
         return res.status(401).json({ message:'doctor token is expired', error: error });
      }
}

export default authorization