
import { loginBody, registerBody } from "../controler/IUserAuthController"


export  interface resObj{
    status:boolean,
    message:string,
    token?:string
}

export default interface IuserUseCase{

    registerUser(data:registerBody):Promise<void>
    authenticateUser(data:loginBody):Promise<resObj|null>
}   