import exp from "constants";
import { tokenData } from "../controler/IUserAuthController";



export interface DecodedJwt {
       id: string;
       role: string;
       userName?:string
       exp:number; // expiration time
       iat:number; // issued at time
       // Add other JWT payload properties as needed
     }

// export interface JwtVerificationResponse {
//   decoded?:DecodedJwt | string;
//   error?: Error;
// }
export interface DecodedJwt {
       id:string;
       role: string;
       userName?:string;
       iat: number;
       exp: number;
     }

export default interface IJwtService {
  createToken(data:tokenData):string;
  verify(token:string):DecodedJwt|null;
}
