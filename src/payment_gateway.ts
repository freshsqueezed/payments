import type { PaymentRequest, PaymentResponse } from './types';

export interface Gateway {
  processPayment(
    provider: string,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse>;
}

export default class PaymentGateway implements Gateway {
  async processPayment(
    provider: string,
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    return {};
  }
}
