import type { PaymentResponse } from '../../src/types';
import type { PaymentRequest } from '../../src/types';

export interface Provider {
  processCreditCardPayment(request: PaymentRequest): Promise<PaymentResponse>;
}
