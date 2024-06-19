

export interface LoginResponse{
    status:boolean,
    Message:string,
    Err?:string,
    token?:string
}


export default interface IDoctorUseCase{
    registerDoctor():Promise<void>
    DoctorAuth(email:string,password:string):Promise<LoginResponse>
}