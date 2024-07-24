import IBooking from "../entity/bookingEntity";
import IDoctorSchedule from "../entity/doctorScheduleEntity";
import { StatusCode } from "../enums/statusCode";
import ErrorsSchedule from "../erros/errors";
import IDoctorScheduleManagementRepositories, { ISlot } from "../interface/repositories/IDoctorScheduleManagmentRepositories";
import IDoctorScheduleManagmentUseCase, {
  intevalsValues,
} from "../interface/useCase/IDoctorScheduleManagementUseCase";
import IJwtService from "../interface/utils/IJwtService";

export default class DoctorScheduleManagmentUseCase
  implements IDoctorScheduleManagmentUseCase
{
  private doctorScheduleManagementRepository:IDoctorScheduleManagementRepositories;
  private jwtService:IJwtService


  constructor(
    doctorScheduleManagementRepository: IDoctorScheduleManagementRepositories,
    jwtService:IJwtService
  ) {
    this.doctorScheduleManagementRepository =
      doctorScheduleManagementRepository;
    this.jwtService=jwtService  
  }


  async addDoctorSchedule(
     token:string,
    date: Date,
    consultationMethod: string,
    startTime: string,
    endTime: string,
    intervals?: { startTime: string; endTime: string }[]
  ): Promise<void> {
    try {

    const responese=this.jwtService.verify(token)

    

      const isDateAlreadyAdded =
        await this.doctorScheduleManagementRepository.isDateExide(date,responese?.id as string );
  
      if (isDateAlreadyAdded)
        throw new ErrorsSchedule("this date already added", StatusCode.UnAuthorized);


  
      const timeToMinutes = (time: string) => {
        const [hours,minutes]=time.split(":").map(Number);
        return hours * 60 + minutes;
      };
      
      const startMinutes=timeToMinutes(startTime);
      const endMinutes=timeToMinutes(endTime);
  
      let totalAvailableMinutes = endMinutes - startMinutes;
  
      let intervalsInMinutes:{start:number;end:number}[]=[];
  
      if (intervals) {
        intervals.forEach(interval => {
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
  
      let slots:ISlot[] = [];
      let currentTime = startMinutes;
      let slotNumber = 1;
  
      while (currentTime + 30 <= endMinutes) {

        let isWithinInterval = intervalsInMinutes.some(interval => 
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
          let interval = intervalsInMinutes.find(interval => 
            currentTime >= interval.start && currentTime < interval.end
          );
          if (interval) {
            currentTime = interval.end;
          }
        }
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
    date:Date,
    doctorId:string
  ):Promise<IDoctorSchedule | null> {
    try {
      return await this.doctorScheduleManagementRepository.isDateExide(
        date,
        doctorId
      );
    } catch (error) {
      throw error;
    }
  }
  
  async findDoctorAllSchedule(id: string): Promise<IDoctorSchedule|null[]> {
     try{
       return await this.doctorScheduleManagementRepository.fetchDoctorsAllSchedule(id)
     } catch (error){
       throw error
     }
  }


  async findDoctorBookingData(doctorId: string, date: Date): Promise<IBooking[]> {
       try {
          return await this.doctorScheduleManagementRepository.findDoctorSlotedBookedData(doctorId,date)
       } catch (error) {
         throw error
       }
  }

  


 
}
