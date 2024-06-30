import IDoctor from "../../entity/doctorEntity"
import IKyc from "../../entity/kycEntity"
import IUserOtp from "../collection/IotpUser"
import { DatasKYCVerificationStep1, DatasKYCVerificationStep2, DatasOfDoctorRegistration } from "../useCase/IDoctorUseCase"




export default interface IDoctorAuthRepositories{

    isDoctorExists(email:string):Promise<IDoctor|null>
    isRegesterd(data:DatasOfDoctorRegistration):Promise<IDoctor|null>
    saveOtp(email:string,otp:string):Promise<void>
    findOtpData(email:string):Promise<IUserOtp|null>
    kycStorStep1(data:DatasKYCVerificationStep1):Promise<IKyc|null>
    getKycDetails(email:string):Promise<IKyc|null>
    kycStorStep2(data:DatasKYCVerificationStep2):Promise<IKyc|null>
    updateOtpVerified(email:string):Promise<IDoctor|null>

}