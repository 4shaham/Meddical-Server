import { registerBody } from "../controler/IUserAuthController"

export default interface IuserRepositories {
    
    createUser(data:registerBody):Promise<void>
    checkEmailExists(email:string):Promise<string|null>
    
}