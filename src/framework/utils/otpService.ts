
import IOtpServices from "../../interface/utils/IotpServices";


export default class OtpService implements IOtpServices{
 
     generateOtp(): string {
         return `${Math.floor(1000 + Math.random() * 9000)}`;
     }

}


