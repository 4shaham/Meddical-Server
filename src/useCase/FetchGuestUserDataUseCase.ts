import IDoctor from "../entity/doctorEntity";
import IFetchGuestUserDataRepository from "../interface/repositories/IFetchGuestUserDataRepository";
import IFetchGuestUserDataUseCase from "../interface/useCase/IFetchGuestUserDataUseCase";


export default  class FetchGuestUserDataUseCase implements IFetchGuestUserDataUseCase {

  private fetchGuestUserDataRepository:IFetchGuestUserDataRepository

  constructor(fetchGuestUserDataRepository:IFetchGuestUserDataRepository){
     this.fetchGuestUserDataRepository=fetchGuestUserDataRepository
  }
  
  async getDataDoctors(): Promise<IDoctor | null []> {
    
      try {
        
        return await this.fetchGuestUserDataRepository.doctorsData()


      } catch (error) {
         throw error
      }


  }



}
