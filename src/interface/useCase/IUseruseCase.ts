
import { registerBody } from "../controler/IUserAuthController"

export default interface IuserUseCase{

    registerUser(data:registerBody):Promise<void>
}   