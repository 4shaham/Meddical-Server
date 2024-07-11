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
      let response = await this.doctorScheduleManagementRepository.isDateExide(
        date
      );
      console.log(response);
      if (response) return;

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

      // Calculate total available minutes
      let totalAvailableMinutes = endMinutes - startMinutes;
      totalAvailableMinutes -= intervalTime;

      // Convert totalAvailableMinutes back to HH:mm format for display or further use
      const availableHours = Math.floor(totalAvailableMinutes / 60);
      const availableMinutes = totalAvailableMinutes % 60;
      const availableTime = `${availableHours}:${availableMinutes}`;

      console.log("Available time:", availableTime);

      const mapSize = totalAvailableMinutes / 30;

      const myMap = new Map();

      let changedTime = startTime.split(":");

      let timeToStart = Number(changedTime[0]);
      let seconds = Number(changedTime[1]);

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
        console.log(error,"djfkjdkfj")
    }
  }
}
