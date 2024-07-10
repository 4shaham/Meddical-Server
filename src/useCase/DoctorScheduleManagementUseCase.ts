import IDoctorScheduleManagementRepositories from "../interface/repositories/IDoctorScheduleManagementRepositories";
import IDoctorScheduleManagmentUseCase from "../interface/useCase/IDoctorScheduleManagementUseCase";


export default class DoctorScheduleManagmentUseCase implements IDoctorScheduleManagmentUseCase{
    
    private doctorScheduleManagementRepository:IDoctorScheduleManagementRepositories
    
    constructor(doctorScheduleManagementRepository:IDoctorScheduleManagementRepositories){
         this.doctorScheduleManagementRepository=doctorScheduleManagementRepository
    }
    
    
    

}