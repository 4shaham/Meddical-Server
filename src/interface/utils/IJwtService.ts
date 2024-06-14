import exp from "constants";
import { tokenData } from "../controler/IUserAuthController";

export interface JwtVerificationResponse {
       decoded?: object | string;
       error?: Error;
}
export default interface IJwtService{

       createToken(data:tokenData):string    
       verify(token:string,secretKey:string):JwtVerificationResponse

}