import { token } from "morgan"


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
}