import { Model } from "mongoose";
import IDoctorSchedule from "../../entity/doctorScheduleEntity";
import IDoctorScheduleManagementRepositories from "../../interface/repositories/IDoctorScheduleManagmentRepositories";




export default class DoctorScheduleManagementRepository implements IDoctorScheduleManagementRepositories {

        private doctorSchedule:Model<IDoctorSchedule>
        constructor(doctorSchedule:Model<IDoctorSchedule>){
            this.doctorSchedule=doctorSchedule
        }

}