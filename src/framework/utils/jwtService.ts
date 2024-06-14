import { error } from "console";
import { tokenData } from "../../interface/controler/IUserAuthController";
import IJwtService, { JwtVerificationResponse } from "../../interface/utils/IJwtService";
import Jwt, { DecodeOptions, decode } from "jsonwebtoken";





export default class JwtService implements IJwtService {
  createToken(data: tokenData): string {
    try {
      let secret: string = process.env.JWT_SECRET_key as string;

      let token = Jwt.sign(data, secret, { expiresIn: "1h" });
      return token;
    } catch (error) {
      throw error;
    }
  }


  verify(token: string, secretKey: string):JwtVerificationResponse{
       try {
        let response:JwtVerificationResponse= {}; 
     Jwt.verify(token, secretKey, (error, decode) => {
        if (error) {
          response.error=error;
        }
        response.decoded=decode;   
      });
      return response
     
    } catch (error) {
       throw(error)
    }

  }


}
