import { NextFunction, Request, Response } from "express";



import JwtService from "../../utils/jwtService";
import { error } from "console";


const jwtservice=new JwtService()

 const Autherisation=async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const token=req.cookies.adminToken
        let verification= await jwtservice.verify(token,process.env.JWT_SECRET_key as string)  // ineed imple token veryifht
         if(verification.error && !verification.decoded){
            res.status(401).json({message:"you are not login"})
         }
         next()
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
   
  
}

export default Autherisation