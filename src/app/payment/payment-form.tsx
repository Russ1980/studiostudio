
'use client';

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { createPaymentIntent } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/dashboard`,
      },
    });
    
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message || 'An unexpected error occurred.');
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isLoading || !stripe || !elements} id="submit" className="w-full mt-6" size="lg">
        <span id="button-text">
          {isLoading ? <Loader2 className="animate-spin" /> : 'Confirm & Pay'}
        </span>
      </Button>
      {message && <Alert variant="destructive" className="mt-4"><AlertDescription>{message}</AlertDescription></Alert>}
    </form>
  );
}

export function PaymentForm({ price }: { price: number }) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (price > 0) {
      createPaymentIntent(price)
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else if (data.error) {
              console.error(data.error);
          }
        })
        .catch(console.error);
    }
  }, [price]);

  const appearance = {
    theme: 'stripe',
  };
  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
      </CardHeader>
      <CardContent>
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
            <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
