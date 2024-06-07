import { tokenData } from "../controler/IUserAuthController";


export default interface IJwtService{

       createToken(data:tokenData):string    

}