import type { PaymentRequest, PaymentResponse } from '../../src/types';

export interface Provider {
  processCreditCardPayment(request: PaymentRequest): Promise<PaymentResponse>;
}
