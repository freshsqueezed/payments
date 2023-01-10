import type StripeProvider from './providers/stripe';
import type { PaymentRequest, PaymentResponse } from './types';

export interface Gateway {
  processPayment(
    provider: string,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse>;
}

export default class PaymentGateway implements Gateway {
  stripeProvider: StripeProvider;

  constructor({ stripe }: { stripe: StripeProvider }) {
    this.stripeProvider = stripe;
  }

  async processPayment(
    provider: string,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    switch (provider) {
      case 'stripe':
        return this.stripeProvider.processCreditCardPayment(paymentRequest);
      default:
        throw new Error('Invalid payment provider.');
    }
  }
}
