
import IDoctor from "../../entity/doctorEntity"


export default interface IDoctorAuthRepositories{

    isDoctorExists(email:string):Promise<IDoctor|null>


}