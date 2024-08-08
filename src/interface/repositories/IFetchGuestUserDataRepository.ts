import IDoctor from "../../entity/doctorEntity";
import ISpecality from "../../entity/specalityEntity";

export default interface IFetchGuestUserDataRepository{
    
   doctorsData():Promise<IDoctor|null[]>
   findDoctorProfileData(id:string):Promise<IDoctor|null>
   findAllSpecalityData():Promise<ISpecality|null[]>
   findGetDoctorWithSort(specality:string):Promise<IDoctor[]>

}