import { NextFunction, Request, Response } from "express";




const DoctorAutherisation=async(req:Request,res:Response,next:NextFunction)=>{
      
      try {
         const token=req.cookies.doctortoken
         console.log(token,"doctor middleware")
         next()
      } catch (error) {
         console.log("eroorr")
      }
}

export default DoctorAutherisation