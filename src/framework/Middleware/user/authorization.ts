import { NextFunction, Response } from "express";
import IAuthRequest from "../../../interface/User/authRequest";
import JwtService from "../../utils/jwtService";
import { StatusCode } from "../../../enums/statusCode";

const jwtService = new JwtService();

const authorizationMiddleware = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    let verification = jwtService.verify(token);
    console.log(verification,"hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    req.userId = verification?.id as string;
    next();
  } catch (error) {
    res.status(403).json({ message: "unAuthorized" });
  }
};

export default authorizationMiddleware;
