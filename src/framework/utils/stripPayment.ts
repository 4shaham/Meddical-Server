



import Stripe from "stripe";
import { IStripe } from "../../interface/utils/IStripeService";



const stripe=new Stripe(process.env.Stryipe_Secret_key as string)
const endpointSecret="whsec_e560e7ce145ba8846ac7ba94273e049f8450c546fea47ba89d109b2dd38a12e5";

export default class StripePayment implements IStripe {

    async makePayment(totalPrice:number){
        let line_items = [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: "test"
                    },
                    unit_amount: totalPrice * 100
                },
                quantity: 1
            }
        ]
        const session = await stripe.checkout.sessions.create({
            success_url:'http://localhost:5173/successPage',
            cancel_url:'http://localhost:5173/cancel',
            line_items:line_items,
            mode:'payment',
            billing_address_collection:'required'
        });
        return session.id
    }

    
    async verifySucessOfWebhook(req: any): Promise<any> {


        let event = req.body;
       

        if (endpointSecret) {
         
          const sig: any = req.headers["stripe-signature"];
          try {
            const payloadString = JSON.stringify(req.body, null, 2);
            const header = stripe.webhooks.generateTestHeaderString({
                payload:payloadString,
                secret:endpointSecret,
              });
             event=stripe.webhooks.constructEvent(payloadString,header,endpointSecret)
          } catch (err) {
             console.log('errrrr',err)
             throw err
          }

        }
        
        console.log(event.type)
        if (event.type == "checkout.session.completed") {
          return true;
        }else{
          return false;
        }

        // if(event.type=='payment_intent.succeeded'){
        //     console.log('hiiiiiiiiiiiiiiiiiiiiiiiiii')
        // }else if(event.type=="checkout.session.completed") {
        //     return true
        // }      
    }

}