import type { PaymentResponse } from '../../src/types';
import type { PaymentRequest } from '../../src/types';

export interface Provider {
  processPayment(request: PaymentRequest): Promise<PaymentResponse>;
}
