import IhasingService from "../../interface/utils/IHasingService";
import bcrypt from 'bcrypt';


export default class HashingServices implements IhasingService{

     async  hashing(password: string): Promise<string> {
          return await
           bcrypt.hash(password,10);
       }

      async compare(password: string, hashedPassword: string): Promise<string> {
               
        let match=await bcrypt.compare(password,hashedPassword)
        console.log(match)
        return "dfhdjhf"

     }
  
}

