

interface slotsData{
    startTime:Date,
    endTime:Date,
    isBlocked:boolean,
    patientId:string,
    slotNumber:number
}

export default interface IDoctorSchedule{
 
    _id:string,
    doctorId:string,
    date:Date,
    slots:Map<number,slotsData>
}   