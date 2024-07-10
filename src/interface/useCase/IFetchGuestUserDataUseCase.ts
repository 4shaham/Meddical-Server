import IDoctor from "../../entity/doctorEntity";

export default interface IFetchGuestUserDataUseCase{
    
   getDataDoctors():Promise<IDoctor|null []>


}