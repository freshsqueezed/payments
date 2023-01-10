import stripe, { Stripe } from 'stripe';
import {
  PaymentMethodType,
  PaymentRequest,
  PaymentResponse,
} from '../../src/types';
import type { Provider } from './provider';

export default class StripeProvider implements Provider {
  private client: Stripe;

  constructor(apiKey: string) {
    this.client = new stripe(apiKey, {
      // @ts-ignore
      apiVersion: null,
    });
  }

  async processCreditCardPayment(
    request: PaymentRequest,
  ): Promise<PaymentResponse> {
    if (request.paymentMethod.type !== PaymentMethodType.CREDIT_CARD) {
      throw new Error(`Type must be ${PaymentMethodType.CREDIT_CARD}.`);
    }

    try {
      const { amount, paymentMethod } = request;
      const [expMonth, expYear] = paymentMethod.expirationDate.split('/');

      const method = await this.client.paymentMethods.create({
        type: 'card',
        card: {
          number: paymentMethod.cardNumber,
          exp_month: parseInt(expMonth, 10),
          exp_year: parseInt(expYear, 10),
          cvc: paymentMethod.cardCode,
        },
      });

      const paymentIntent = await this.client.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method: method.id,
        confirm: true,
      });

      return {
        success: paymentIntent.status === 'succeeded',
        message:
          paymentIntent.status === 'succeeded'
            ? 'Payment successful'
            : 'Payment failed',
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}
