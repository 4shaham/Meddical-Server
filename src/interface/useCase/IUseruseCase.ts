
import { loginBody, registerBody } from "../controler/IUserAuthController"

export default interface IuserUseCase{

    registerUser(data:registerBody):Promise<void>
    authenticateUser(data:loginBody):Promise<void>
}   