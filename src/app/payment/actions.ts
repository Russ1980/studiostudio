
'use server';

import { stripe } from '@/lib/stripe';

export async function createPaymentIntent(amount: number) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return { clientSecret: paymentIntent.client_secret };
    } catch (error: any) {
        console.error("Error creating payment intent:", error);
        return { error: error.message };
    }
}
