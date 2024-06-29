import IDoctor from "../../entity/doctorEntity"
import IKyc from "../../entity/kycEntity"
import { DatasKYCVerificationStep1, DatasKYCVerificationStep2, DatasOfDoctorRegistration } from "../useCase/IDoctorUseCase"




export default interface IDoctorAuthRepositories{

    isDoctorExists(email:string):Promise<IDoctor|null>
    isRegesterd(data:DatasOfDoctorRegistration):Promise<IDoctor|null>
    kycStorStep1(data:DatasKYCVerificationStep1):Promise<IKyc|null>
    kycStorStep2(data:DatasKYCVerificationStep2):Promise<IKyc|null>

}