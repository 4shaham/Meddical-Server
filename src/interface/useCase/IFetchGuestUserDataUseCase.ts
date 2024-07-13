import IDoctor from "../../entity/doctorEntity";
import ISpecality from "../../entity/specalityEntity";

export default interface IFetchGuestUserDataUseCase{
    
   getDataDoctors():Promise<IDoctor|null []>
   getDoctorProfileData(id:string):Promise<IDoctor|null>
   getSpecalityData():Promise<ISpecality|null[]>
   
}