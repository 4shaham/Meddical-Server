

interface Achievements {
    data: Date;
    description: string;
    title: string;
}

interface Experiences{
    startDate:Date,
    hospitalName:string,
    responsibilities:string,
    endDate:Date
}

enum AppliedStatus {
    Approved = "approved",
    Applied = "applied",
    Rejected = "rejected",
  }

export default interface IKyc{
    _id: string;
    email:string,
    licenseNumber:string,
    licenseImage:string,
    yearsOfexperience:number,
    identityCardImage:string,
    achievements:Achievements[],
    experiences:Experiences[],
    step:number,
    appliedStatus: AppliedStatus;
}