
    export default interface IOtpServices {

        generateOtp():string;
        sendOtpEmail(email:string,otp:string,userName:string):Promise<void>

    }