import { NextFunction, Request, Response } from "express";
import JwtService from "../../utils/jwtService";



const jwtservice=new JwtService()

 const Autherisation=async(req:Request,res:Response,next:NextFunction)=>{

    try {
        const token=req.cookies.adminToken
        let verification= await jwtservice.verify(token)  // ineed imple token veryifht
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', error: error });
    }
   
  
}

export default Autherisation