import { StatusCode } from "../enums/statusCode";
import ErrorsSchedule from "../erros/errors";
import IDoctorScheduleManagementRepositories from "../interface/repositories/IDoctorScheduleManagmentRepositories";
import IDoctorScheduleManagmentUseCase, {
  intevalsValues,
} from "../interface/useCase/IDoctorScheduleManagementUseCase";


export default class DoctorScheduleManagmentUseCase
  implements IDoctorScheduleManagmentUseCase
{

  private doctorScheduleManagementRepository: IDoctorScheduleManagementRepositories;

  constructor(
    doctorScheduleManagementRepository: IDoctorScheduleManagementRepositories
  ) {
    this.doctorScheduleManagementRepository =
      doctorScheduleManagementRepository;
  }





  async addDoctorSchedule(
    doctorId: string,
    date: Date,
    startTime: string,
    endTime: string,
    interval?: intevalsValues[]
  ): Promise<void> {
    try {


      const isDateAlreadyAdded = await this.doctorScheduleManagementRepository.isDateExide(
        date
      );

     
      if (isDateAlreadyAdded)  throw new ErrorsSchedule("this date already added",StatusCode.UnAuthorized);

      const timeToMinutes = (time: any) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };


      let intervalTime = 0;

      if (interval) {

        for (let i = 0; i < interval?.length; i++) {
          const startTime = timeToMinutes(interval[i].startTime);
          const EndTime = timeToMinutes(interval[i].endTime);

          intervalTime += EndTime - startTime;

        }

      }

      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);

      let totalAvailableMinutes = endMinutes - startMinutes;
      totalAvailableMinutes -= intervalTime;

      const availableHours = Math.floor(totalAvailableMinutes/60);
      const availableMinutes = totalAvailableMinutes % 60;
      const availableTime = `${availableHours}:${availableMinutes}`;

      console.log("Available time:", availableTime);
      const mapSize = totalAvailableMinutes / 30;

      // slotes to make a map
      const myMap = new Map();

      let consultationStartedTime = startTime.split(":");

      let timeToStart = Number(consultationStartedTime[0]);
      let seconds = Number(consultationStartedTime[1]);

      for (let i = 1; i <= mapSize; i++) {

        let prevTimeToStart = timeToStart;
        let prevSeconds = seconds;

        seconds += 30;
        if (seconds == 60) {
          seconds = 0;
          timeToStart += 1;
        }
        myMap.set(`${i}`, {
          startTime: `${prevTimeToStart}:${prevSeconds}`,
          endTime: `${timeToStart}:${seconds}`,
          patientId: null,
          isBooked: false,
        });
      }

      await this.doctorScheduleManagementRepository.storeDoctorSchedule(
        doctorId,
        date,
        myMap
      );
    } catch (error) {
        throw error
    }
  }



  

}
