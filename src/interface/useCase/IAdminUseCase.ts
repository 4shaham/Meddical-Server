

export interface Response{
    status:boolean,
    message:string,
    token?:string
}



export default interface IAdminUseCase{

    verificationLogin(email:string,password:string,AdminEmail:string,AdminPassword:string):Promise<Response>
 
}