import IKyc from "../../entity/kycEntity";
import IUser from "../../entity/userEntity";


interface IDoctorData{
    id:string,
    name:string,
    image:string,
    email:string
}


export interface LoginResponse{
    status:boolean,
    doctor?:IDoctorData
    message?:string,
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



export interface RegesterResponse extends ResponseKycFirstStep {

}

interface doctorData{
    image:string,
    name:string,
    email:string
}

export interface VerifyResponse{
    status:boolean,
    decoded?:object,
    doctorData?:doctorData
}
 

export default interface IDoctorUseCase{

    registerDoctor(data:DatasOfDoctorRegistration):Promise<RegesterResponse>
    DoctorAuth(email:string,password:string):Promise<LoginResponse>
    handleKYCVerificationStep1(data:DatasKYCVerificationStep1):Promise<ResponseKycFirstStep>
    getKycStatus(email:string):Promise<IKyc|null>
    handleKYCVerificationStep2(data:DatasKYCVerificationStep2):Promise<ResponseKycFirstStep>
    otpVerify(otp:string,email:string):Promise<{status:boolean,message:string}>  
    sendOtp(email:string):Promise<{status:true}> 
    verifyToken(token:string):Promise<VerifyResponse>
    getUserProfileData(id:string):Promise<IUser>
}