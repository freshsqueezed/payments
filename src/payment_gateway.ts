import type StripeProvider from './providers/stripe';
import { PaymentRequest, PaymentResponse, Providers } from './types';

export interface Gateway {
  processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse>;
}

export default class PaymentGateway implements Gateway {
  stripeProvider: StripeProvider;

  constructor({ stripe }: { stripe: StripeProvider }) {
    this.stripeProvider = stripe;
  }

  async processPayment(
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    switch (paymentRequest.provider) {
      case Providers.STRIPE:
        return this.stripeProvider.processCreditCardPayment(paymentRequest);
      default:
        throw new Error('Invalid payment provider.');
    }
  }
}
