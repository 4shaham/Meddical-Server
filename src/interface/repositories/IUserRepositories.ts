import IUserOtp from "../collection/IotpUser"
import IUser from "../collection/Iuser"
import { registerBody } from "../controler/IUserAuthController"

export default interface IuserRepositories {
    
    createUser(data:registerBody):Promise<IUser>
    checkEmailExists(email:string):Promise<IUser|null>
    checkPhoneNumberExists(phoneNumber:Number):Promise<IUser|null>
    

}