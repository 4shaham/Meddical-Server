
export interface IStripe{
    makePayment(totalAmount:number):Promise<string>
    verifySucessOfWebhook(req:any):Promise<any>
}