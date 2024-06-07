
export default interface IhasingService {
     
    hashing(password:string):Promise<string|null>
    compare(password:string,hashedPassword:string):Promise<string>                 
}