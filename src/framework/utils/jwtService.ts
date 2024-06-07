import { tokenData } from "../../interface/controler/IUserAuthController";
import IJwtService from "../../interface/utils/IJwtService";
import Jwt from "jsonwebtoken";

export default class JwtService implements IJwtService {
  createToken(data: tokenData): string {
    try {
      const { userId, userName } = data;

     

      let secret: string = process.env.JWT_SECRET_key as string;

      let token = Jwt.sign(data, secret, { expiresIn: "1h" });
      console.log("tokenVerifeied",token)
      return token;
    } catch (error) {
        return "the token is not valid"

    }
  }
}
