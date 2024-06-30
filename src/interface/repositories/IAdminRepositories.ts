import { ObjectId } from "mongoose";
import IDoctor from "../../entity/doctorEntity";
import ISpecality from "../../entity/specalityEntity";

export default interface IAdminRepository{
    addSpecality(image:string,specalityName:string):Promise<ISpecality|null>
    isExists(speclaityName:string):Promise<ISpecality|null>
    specalitys():Promise<ISpecality[]>
    getRequestedDoctor():Promise<IDoctor[]>
    specalityDeleted(id:string):Promise<ISpecality|null>
}