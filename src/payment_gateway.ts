import type StripeProvider from './providers/stripe';
import {
  PaymentMethodType,
  PaymentProviders,
  PaymentRequest,
  PaymentResponse,
  Providers,
} from './types';

export interface Gateway {
  processPayment(paymentRequest: PaymentRequest): Promise<PaymentResponse>;
}

export class PaymentGateway implements Gateway {
  stripeProvider: StripeProvider | undefined;

  constructor(providers: PaymentProviders) {
    this.stripeProvider = providers.stripe;
  }

  async processPayment(
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    switch (paymentRequest.provider) {
      case Providers.STRIPE:
        if (PaymentMethodType.CREDIT_CARD) {
          return this.stripeProvider!.processCreditCardPayment(paymentRequest);
        } else {
          throw new Error(
            `Invalid payment type for provider: ${Providers.STRIPE}.`,
          );
        }
      default:
        throw new Error('Invalid payment provider.');
    }
  }
}
