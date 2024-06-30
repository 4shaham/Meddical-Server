import { token } from "morgan"
import ISpecality from "../../entity/specalityEntity"
import IDoctor from "../../entity/doctorEntity"
import { ObjectId } from "mongoose"

export interface SpecalityResponse{
    status:boolean,
    message:string
}


export interface Response{
    status:boolean,
    message:string,
    token?:string
}


export interface VerifyResponse{
    status:boolean,
    decoded?:object
}




export default interface IAdminUseCase{

    verificationLogin(email:string,password:string,AdminEmail:string,AdminPassword:string):Promise<Response>
    verifytoken(token:string,secretKey:string):Promise<VerifyResponse>
    specalityManagment(image:string,specalityName:string):Promise<SpecalityResponse>
    getSpecality():Promise<ISpecality[]>
    getDataNewRequestDoctor():Promise<void>
    verifySpecialtyDeleted(id:string):Promise<void>
}