import UserAuthRepository from "../adapters/repositories/UserAuthRepository";

class UserAuthUseCase {
  private userAuthRepository: UserAuthRepository;

  constructor(userAuthRepository: UserAuthRepository) {
    this.userAuthRepository = userAuthRepository;
  }

  async loginUser(email:string,password:string){
       this.userAuthRepository.findByEmail(email);
  }

  async registerUser() {}
}

export default UserAuthUseCase;
