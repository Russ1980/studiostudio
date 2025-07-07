
import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function handler(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error(`❌ Error message: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      console.log('✅ PaymentIntent was successful!', paymentIntentSucceeded);
      // TODO: Fulfill the purchase.
      // e.g., update your database, send a confirmation email, grant access to a service.
      break;
    
    case 'payment_intent.payment_failed':
      const paymentIntentFailed = event.data.object;
      console.log('❌ PaymentIntent failed:', paymentIntentFailed);
      // TODO: Notify the user that their payment failed.
      break;
      
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export { handler as POST };
