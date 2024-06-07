

export default interface IDoctorAuthController{

   register(req:Request,res:Response):Promise<void>
   login(req:Request,res:Response):Promise<void>

}

export interface doctorRegisterBody{
    // doctorName:String;
    // specialtie: String;
    // email:String;
    // licenseNumber:String;
    // Password:String;
    // PhoneNumber:String;
    // LicenseImage:String;
    // YearsOfExperience:Date;
    // Language: String[] | null;
    // Approved: Boolean | null;
    // CreatedAt: Timestamp | null;
    // UpdateAt: Timestamp | null;
    // achievements: {
    //    Date: Date | null;
    //    Description: String | null;
    //    Title: String | null;
    // }[];
    // experiences: {
    // }[];
    // AppliedStatus: String | null;
    // Fees: Double | null;
}