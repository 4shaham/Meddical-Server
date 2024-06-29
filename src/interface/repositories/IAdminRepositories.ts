import ISpecality from "../../entity/specalityEntity";

export default interface IAdminRepository{
    addSpecality(image:string,specalityName:string):Promise<ISpecality|null>
    isExists(speclaityName:string):Promise<ISpecality|null>
    specalitys():Promise<ISpecality[]>
}