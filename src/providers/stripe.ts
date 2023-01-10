import type { PaymentRequest, PaymentResponse } from '../../src/types';
import type { Provider } from './provider';

export default class StripeProvider implements Provider {
  async processCreditCardPayment(
    request: PaymentRequest,
  ): Promise<PaymentResponse> {
    return {};
  }
}
