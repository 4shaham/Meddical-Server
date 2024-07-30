import IBooking from "../entity/bookingEntity";
import IDoctorSchedule from "../entity/doctorScheduleEntity";
import { StatusCode } from "../enums/statusCode";
import ErrorsSchedule from "../erros/errors";
import IDoctorScheduleManagementRepositories, {
  BookingDataWithUserData,
  ISlot,
} from "../interface/repositories/IDoctorScheduleManagmentRepositories";
import IDoctorScheduleManagmentUseCase, {
  intevalsValues,
} from "../interface/useCase/IDoctorScheduleManagementUseCase";
import IJwtService from "../interface/utils/IJwtService";

export default class DoctorScheduleManagmentUseCase
  implements IDoctorScheduleManagmentUseCase
{
  private doctorScheduleManagementRepository: IDoctorScheduleManagementRepositories;
  private jwtService: IJwtService;

  constructor(
    doctorScheduleManagementRepository: IDoctorScheduleManagementRepositories,
    jwtService: IJwtService
  ) {
    this.doctorScheduleManagementRepository =
      doctorScheduleManagementRepository;
    this.jwtService = jwtService;
  }

  async addDoctorSchedule(
    token: string,
    date: Date,
    consultationMethod: string,
    startTime: string,
    endTime: string,
    intervals?: { startTime: string; endTime: string }[]
  ): Promise<void> {
    try {
      const responese = this.jwtService.verify(token);

      const isDateAlreadyAdded =
        await this.doctorScheduleManagementRepository.isDateExide(
          date,
          responese?.id as string
        );

      let isStoredNewSchedule = false;

      if (isDateAlreadyAdded) {
        const startTimeOFTodaySchedule =
          isDateAlreadyAdded.slots[isDateAlreadyAdded.slots.length - 1];
        let lastSchedule: number = Number(
          startTimeOFTodaySchedule.endTime.split(":").join("")
        );
        let newStartTime: number = Number(startTime.split(":").join(""));

        if (lastSchedule > newStartTime) {
          throw new ErrorsSchedule(
            `you must be select the equall or higer than of this time ${startTimeOFTodaySchedule.endTime}`,
            StatusCode.UnAuthorized
          );
        }

        isStoredNewSchedule=true;

      }

      const timeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);

      let totalAvailableMinutes = endMinutes - startMinutes;

      let intervalsInMinutes: { start: number; end: number }[] = [];

      if (intervals) {
        intervals.forEach((interval) => {
          const intervalStart = timeToMinutes(interval.startTime);
          const intervalEnd = timeToMinutes(interval.endTime);
          totalAvailableMinutes -= intervalEnd - intervalStart;
          intervalsInMinutes.push({ start: intervalStart, end: intervalEnd });
        });
      }

      const availableHours = Math.floor(totalAvailableMinutes / 60);
      const availableMinutes = totalAvailableMinutes % 60;
      const availableTime = `${availableHours}:${availableMinutes}`;

      console.log("Available time:", availableTime);

      let slots: ISlot[] = [];
      let currentTime = startMinutes;
      let slotNumber = 1;

      if (isStoredNewSchedule == true) {
        let number =
          isDateAlreadyAdded?.slots[isDateAlreadyAdded.slots.length - 1]
            .slotNumber;
        slotNumber = number ? number + 1 : 1;
      }

      while (currentTime + 30 <= endMinutes) {
        let isWithinInterval = intervalsInMinutes.some(
          (interval) =>
            currentTime >= interval.start && currentTime < interval.end
        );

        if (!isWithinInterval) {
          let slotEndTime = currentTime + 30;
          slots.push({
            startTime: `${Math.floor(currentTime / 60)}:${currentTime % 60}`,
            endTime: `${Math.floor(slotEndTime / 60)}:${slotEndTime % 60}`,
            isBooked: false,
            slotNumber: slotNumber++,
          });
        }

        currentTime += 30;
        if (isWithinInterval) {
          let interval = intervalsInMinutes.find(
            (interval) =>
              currentTime >= interval.start && currentTime < interval.end
          );
          if (interval) {
            currentTime = interval.end;
          }
        }
      }

      if (isStoredNewSchedule) {
        await this.doctorScheduleManagementRepository.storeScheduleInAlreadyAddedDate(
          isDateAlreadyAdded?._id as string,
          slots
        );
        return 
      }

      await this.doctorScheduleManagementRepository.storeDoctorSchedule(
        responese?.id as string,
        date,
        consultationMethod,
        slots
      );
    } catch (error) {
      throw error;
    }
  }

  // async addDoctorSchedule(
  //   doctorId: string,
  //   date: Date,
  //   consultationMethod:string,
  //   startTime: string,
  //   endTime: string,
  //   interval?: intevalsValues[]
  // ): Promise<void> {
  //   try {
  //     const isDateAlreadyAdded =
  //       await this.doctorScheduleManagementRepository.isDateExide(
  //         date,
  //         doctorId
  //       );

  //      if (isDateAlreadyAdded)
  //       throw new ErrorsSchedule(
  //         "this date already added",
  //         StatusCode.UnAuthorized
  //       );

  //     const timeToMinutes = (time: any) => {
  //       const [hours, minutes] = time.split(":").map(Number);
  //       return hours * 60 + minutes;
  //     };

  //     let intervalTime = 0;

  //     if (interval) {
  //       for (let i = 0; i < interval?.length; i++) {
  //         const startTime = timeToMinutes(interval[i].startTime);
  //         const EndTime = timeToMinutes(interval[i].endTime);

  //         intervalTime += EndTime - startTime;
  //       }
  //     }

  //     const startMinutes = timeToMinutes(startTime);
  //     const endMinutes = timeToMinutes(endTime);

  //     let totalAvailableMinutes = endMinutes - startMinutes;
  //     totalAvailableMinutes -= intervalTime;

  //     const availableHours = Math.floor(totalAvailableMinutes / 60);
  //     const availableMinutes = totalAvailableMinutes % 60;
  //     const availableTime = `${availableHours}:${availableMinutes}`;

  //     console.log("Available time:", availableTime);
  //     const mapSize = totalAvailableMinutes / 30;

  //     // slotes to make a map
  //     let slots:ISlot[]=[]

  //     let consultationStartedTime = startTime.split(":");

  //     let timeToStart = Number(consultationStartedTime[0]);
  //     let seconds = Number(consultationStartedTime[1]);

  //     for (let i = 1; i <= mapSize; i++) {

  //       let prevTimeToStart = timeToStart;
  //       let prevSeconds = seconds;

  //       seconds += 30;
  //       if (seconds == 60) {
  //         seconds = 0;
  //         timeToStart += 1;
  //       }
  //        slots.push({
  //         startTime:`${prevTimeToStart}:${prevSeconds}`,
  //         endTime: `${timeToStart}:${seconds}`,
  //         isBooked: false,
  //         slotNumber:i,
  //       });
  //     }

  //     await this.doctorScheduleManagementRepository.storeDoctorSchedule(
  //       doctorId,
  //       date,
  //       consultationMethod,
  //       slots
  //     );

  //   } catch (error) {

  //     throw error;

  //   }

  // }

  async findDoctorSchedulePerticularDate(
    date: Date,
    doctorId: string
  ): Promise<IDoctorSchedule | null> {
    try {
      return await this.doctorScheduleManagementRepository.isDateExide(
        date,
        doctorId
      );
    } catch (error) {
      throw error;
    }
  }

  async findDoctorAllSchedule(id: string): Promise<IDoctorSchedule | null[]> {
    try {
      return await this.doctorScheduleManagementRepository.fetchDoctorsAllSchedule(
        id
      );
    } catch (error) {
      throw error;
    }
  }

  async findDoctorBookingData(
    doctorId: string,
    date: Date
  ): Promise<BookingDataWithUserData[]> {
    try {
      return await this.doctorScheduleManagementRepository.findDoctorSlotedBookedData(
        doctorId,
        date
      );
    } catch (error) {
      throw error;
    }
  }

  async addPrescription(
    description: string,
    medicines: Object[],
    recoverySteps: string,
    patientId: string,
    patientName: string,
    doctorID: string,
    slotId: string
  ): Promise<void> {
    try {
      if (
        !description ||
        !medicines ||
        !recoverySteps ||
        !patientId ||
        !patientName
      ) {
        throw new ErrorsSchedule(
          "all datas are required",
          StatusCode.badRequest
        );
      }

      const doctor =
        await this.doctorScheduleManagementRepository.getDoctorData(doctorID);

      if (!doctor) {
        throw new ErrorsSchedule(
          "the Doctor Id is not valid",
          StatusCode.badRequest
        );
      }
      const recoveryStep = recoverySteps.split(",");
      const response =
        await this.doctorScheduleManagementRepository.storePrescription(
          description,
          medicines,
          recoveryStep,
          patientId,
          patientName,
          doctorID,
          doctor?.name,
          slotId
        );
      await this.doctorScheduleManagementRepository.PateintStatusChanged(
        response.slotId
      );
    } catch (error) {
      throw error;
    }
  }
}
