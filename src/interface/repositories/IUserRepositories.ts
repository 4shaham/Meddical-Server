import IPrescription from "../../entity/prescriptionEntity";


export default interface IuserRepositories{
    findPrescriptionData(id:string):Promise<IPrescription|null>
}