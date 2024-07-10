import IDoctor from "../../entity/doctorEntity";

export default interface IFetchGuestUserDataRepository{
    
   doctorsData():Promise<IDoctor|null[]>


}