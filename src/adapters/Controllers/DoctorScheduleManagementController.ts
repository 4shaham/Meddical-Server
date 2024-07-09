import IDoctorScheduleManagementController from "../../interface/controler/IDoctorScheduleManagementController";
import IDoctorScheduleManagementUseCase from "../../interface/useCase/IDoctorScheduleManagementUseCase";



export default  class DoctorScheduleManagementController  implements IDoctorScheduleManagementController{
    

    private doctorScheduleManagementUseCase:IDoctorScheduleManagementUseCase

    constructor(doctorScheduleManagmementUseCase:IDoctorScheduleManagementUseCase){
        this.doctorScheduleManagementUseCase=doctorScheduleManagmementUseCase
    }

    

}
