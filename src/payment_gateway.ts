import type StripeProvider from './providers/stripe';
import { PaymentRequest, PaymentResponse, Providers } from './types';

export interface Gateway {
  processPayment(
    provider: Providers,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse>;
}

export default class PaymentGateway implements Gateway {
  stripeProvider: StripeProvider;

  constructor({ stripe }: { stripe: StripeProvider }) {
    this.stripeProvider = stripe;
  }

  async processPayment(
    provider: Providers,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    switch (provider) {
      case Providers.STRIPE:
        return this.stripeProvider.processCreditCardPayment(paymentRequest);
      default:
        throw new Error('Invalid payment provider.');
    }
  }
}
