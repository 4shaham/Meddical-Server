
import { loginBody, otpVerifyData, registerBody } from "../controler/IUserAuthController"


export  interface resObj{
    status:boolean,
    message:string,
    token?:string
}


export default interface IuserUseCase{

    registerUser(data:registerBody):Promise<void>
    authenticateUser(data:loginBody):Promise<resObj|null>
    verifyOtp(data:otpVerifyData):Promise<resObj|null>
    validateForgotPassword(email:string):Promise<string>
    verifyingUpdatePassword(email:string,password:string):Promise<void>
}   