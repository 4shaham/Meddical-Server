import { NextFunction, Request, Response } from "express";
import Users from "../../model/UserSchema";
import IAuthRequest from "../../../interface/User/authRequest";
import IUser from "../../../entity/userEntity";
import { StatusCode } from "../../../enums/statusCode";

const isUserBlockedMiddleware=async(req:IAuthRequest,res:Response,next:NextFunction)=>{
    try {
        
     const userId=req.userId    
     const user:IUser|null=await Users.findOne({_id:userId})
     console.log(user)
     if(user?.isBlock){
        res.clearCookie("token");
        res.status(StatusCode.UnAuthorized).json({messsage:"user is blocked"}) 
        return
     }
     next()

    } catch (error) {
        res.json() 
    }
}

export default isUserBlockedMiddleware