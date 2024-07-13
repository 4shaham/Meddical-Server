import IDoctor from "../entity/doctorEntity";
import ISpecality from "../entity/specalityEntity";
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


  async getDoctorProfileData(id: string): Promise<IDoctor | null> {
    try {
      const response=await this.fetchGuestUserDataRepository.findDoctorProfileData(id)
      return  response
    } catch (error) {
      throw error
    }
  }

  async getSpecalityData(): Promise<ISpecality | null[]> {
     try {
      return await this.fetchGuestUserDataRepository.findAllSpecalityData()
     } catch (error) {
       throw error
     }
  }



}
