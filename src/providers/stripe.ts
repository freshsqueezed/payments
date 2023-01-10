import type { PaymentRequest, PaymentResponse } from '../../src/types';
import type { Provider } from './provider';

export default class StripeProvider implements Provider {
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return {};
  }
}
