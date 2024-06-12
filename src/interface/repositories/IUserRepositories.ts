import IUserOtp from "../collection/IotpUser"
import IUser from "../collection/Iuser"
import { registerBody } from "../controler/IUserAuthController"

export default interface IuserRepositories {
    
    createUser(data:registerBody):Promise<IUser>
    checkEmailExists(email:string):Promise<IUser|null>
    checkPhoneNumberExists(phoneNumber:string):Promise<IUser|null>
    saveOtp(email:string,otp:string):Promise<void>
    verifyOTP(email:string):Promise<IUserOtp|null>
    updateOtpVerified(email:string):Promise<IUser|null>
    changePassword(email:string,password:string):Promise<void>

}