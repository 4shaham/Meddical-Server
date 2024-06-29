

export interface LoginResponse{
    status:boolean,
    message:string,
    Err?:string,
    token?:string
}



export interface DatasOfDoctorRegistration{
    name: string;
    specialty: string;
    email: string;
    password: string; 
    phoneNumber: string;  
    fees: number;
    image:string;
}


interface ExperienceData{
  
    startDate: Date | null;
    endDate?: Date | null;
    hospitalName?: string;
    responsibilities?: string;

}


export interface DatasKYCVerificationStep1{
    email:string,
    licenseNumber:string,
    image:string,
    experiences?:ExperienceData[]
}




interface AchievementsData{
  
    startDate: Date | null;
    endDate?: Date | null;
    hospitalName?: string;
    responsibilities?: string;

}

    export interface DatasKYCVerificationStep2{

        yearsOfExperience:number,
        fullName:string,
        identityCardImage:string,
        email:string,
        acheivemnts?:AchievementsData[],
    }


export interface ResponseKycFirstStep{
    status:boolean,
    message?:string,
    errMessage?:string,
}

 

export default interface IDoctorUseCase{
    registerDoctor(data:DatasOfDoctorRegistration):Promise<void>
    DoctorAuth(email:string,password:string):Promise<LoginResponse>
    handleKYCVerificationStep1(data:DatasKYCVerificationStep1):Promise<ResponseKycFirstStep>
    handleKYCVerificationStep2(data:DatasKYCVerificationStep2):Promise<ResponseKycFirstStep>
}