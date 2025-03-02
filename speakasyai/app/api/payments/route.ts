import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextResponse) {
    //web hook functionality
    const payload = await req.text();

    const sig = req.headers.get('stripe-signature');

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_KEY!);

        // Handle the event
        switch (event.type) {
            // case 'payment_intent.succeeded':
            //     const paymentIntentSucceeded = event.data.object;
            //     // Then define and call a function to handle the event payment_intent.succeeded
            //     console.log("Payment success")
            //     break;
            case "checkout.session.completed": {
                const session = await stripe.checkout.sessions.retrieve(event.data.object.id,
                    {
                        expand: ["line_items"],

                    }
                );
                console.log(session)

                // connect to the db create or update user
                break;
            }
            case "customer.subscription.deleted": {
                //connec to the db
                const subscriptionId = event.data.object.id;
                const subscription = await stripe.subscriptions.retrieve(
                    subscriptionId
                );
                console.log({ subscription })
                //connect to db
                // update user status to cancelled
                // revoke access
                break;
            }
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
                return NextResponse.json({
                    status: "success",
                })
        }
    }
    catch (err) {
        return NextResponse.json({
            status: "Failed",
            err
        })
    }
    return NextResponse.json({
        status: "success"
    })
}