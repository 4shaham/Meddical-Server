import { ObjectId } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import ISpecality from "../../entity/specalityEntity";
import IKyc from "../../entity/kycEntity";



export interface GetNewRequestData extends IKyc{
    doctorDetails:IDoctor
 }

export default interface IAdminRepository{
    addSpecality(image:string,specalityName:string):Promise<ISpecality|null>
    isExists(speclaityName:string):Promise<ISpecality|null>
    specalitys():Promise<ISpecality[]>
    getRequestedDoctor():Promise<GetNewRequestData|null[]>
    getKycDoctorParticularData(id:string):Promise<GetNewRequestData|null[]>
    specalityDeleted(id:string):Promise<ISpecality|null>
    updateKycStatus(email:string,status:string):Promise<IKyc|null>
    updateDoctorKycStatus(email:string):Promise<IDoctor|null>
    getDataEditSpecality(specalityId:string):Promise<ISpecality|null>
}