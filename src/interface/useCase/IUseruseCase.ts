
import { googleAuthBody, loginBody, otpVerifyData, registerBody } from "../controler/IUserAuthController"


export  interface resObj{
    status:boolean,
    message:string,
    token?:string
}



export interface VerifyTokenResponse{
    status:boolean,
    decoded?:object
}




export default interface IuserUseCase{

    registerUser(data:registerBody):Promise<void>
    authenticateUser(data:loginBody):Promise<resObj|null>
    verifyOtp(data:otpVerifyData):Promise<resObj|null>
    validateForgotPassword(email:string):Promise<string>
    verifyingUpdatePassword(email:string,password:string):Promise<void>
    resendOtp(email:string):Promise<string|null>
    verifyToken(token:string):Promise<VerifyTokenResponse>
    googleAuthenticateUser(data:googleAuthBody):Promise<resObj|null>
}   