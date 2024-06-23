import { Jwt } from "jsonwebtoken";
import IAdminRepository from "../interface/repositories/IAdminRepositories";
import IAdminUseCase, { Response, VerifyResponse } from "../interface/useCase/IAdminUseCase";
import IJwtService from "../interface/utils/IJwtService";

export default class AdminUseCase implements IAdminUseCase {
  private adminRepository: IAdminRepository;
  private jwtService: IJwtService;
  constructor(adminRepository: IAdminRepository, jwtService: IJwtService) {
    this.adminRepository = adminRepository;
    this.jwtService = jwtService;
  }

  async verificationLogin(
    email: string,
    password: string,
    AdminEmail: string,
    AdminPassword: string
  ): Promise<Response> {
    try {
      if (email == AdminEmail && AdminPassword == password) {
        let token = this.jwtService.createToken({ id: email, role: "admin" });

        return {
          status: true,
          message: "sucessfull Login",
          token,
        };
      }

      return {
        status: false,
        message: "Invalid credentials",
      };
    } catch (error) {
      throw Error();
    }
  }

  async verifytoken(token: string): Promise<VerifyResponse> {
    try {
      let response = await this.jwtService.verify(token);
      if(response?.role=="admin"){
          return {
            status:true,
            decoded:response
          } 
      }
      return {
        status:false,
      }
    } catch (error) {   
      throw(error)
    }      
  }
}
