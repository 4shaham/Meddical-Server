import { NextFunction, Request, Response } from "express";

import JwtService from "../../utils/jwtService";



const Jwtservice=new JwtService()


const authorization=async(req:Request,res:Response,next:NextFunction)=>{
      
      try {
         const token=req.cookies.doctorToken
         console.log(token,"doctor middleware")
         let verification=await Jwtservice.verify(token)
         next()
      } catch (error) {
         console.log("eroorr")
         return res.status(500).json({ message: 'Internal Server Error', error: error });
      }
}

export default authorization