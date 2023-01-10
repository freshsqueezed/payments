import { PaymentMethodType, PaymentRequest, Providers } from '../../src/types';
import PaymentGateway from '../../src/payment_gateway';
import { StripeProvider } from '../../src/providers';

jest.mock('../providers/stripe');

describe('PaymentGateway', () => {
  let stripeProvider: jest.Mocked<StripeProvider>;
  let paymentGateway: PaymentGateway;

  beforeEach(() => {
    stripeProvider = new StripeProvider(
      'test-api-key',
    ) as jest.Mocked<StripeProvider>;
    paymentGateway = new PaymentGateway({
      stripe: stripeProvider,
    });
  });

  describe('processPayment', () => {
    const paymentRequest: PaymentRequest = {
      provider: Providers.STRIPE,
      amount: 100,
      paymentMethod: {
        type: PaymentMethodType.CREDIT_CARD,
        cardNumber: '4111111111111111',
        expirationDate: '12/2022',
        cardCode: '123',
      },
    };

    describe('stripeProvider', () => {
      it('should process payment with Stripe provider using credit card', async () => {
        stripeProvider.processCreditCardPayment.mockResolvedValue({
          success: true,
          message: 'Payment successful',
        });

        const payment = await paymentGateway.processPayment(paymentRequest);

        expect(payment.success).toBe(true);
        expect(payment.message).toBe('Payment successful');
        expect(stripeProvider.processCreditCardPayment).toHaveBeenCalledTimes(
          1,
        );
        expect(stripeProvider.processCreditCardPayment).toHaveBeenCalledWith(
          paymentRequest,
        );
      });

      it('should throw an error if Stripe payment fails', async () => {
        stripeProvider.processCreditCardPayment.mockRejectedValue({
          success: false,
          message: 'Payment failed',
        });

        const paymentRequest: PaymentRequest = {
          provider: Providers.STRIPE,
          amount: 100,
          paymentMethod: {
            type: PaymentMethodType.CREDIT_CARD,
            cardNumber: '4111111111111111',
            expirationDate: '12/2022',
            cardCode: '123',
          },
        };

        try {
          await paymentGateway.processPayment(paymentRequest);
        } catch (err: any) {
          expect(err.success).toBe(false);
          expect(err.message).toBe('Payment failed');
          expect(stripeProvider.processCreditCardPayment).toHaveBeenCalledTimes(
            1,
          );
          expect(stripeProvider.processCreditCardPayment).toHaveBeenCalledWith(
            paymentRequest,
          );
        }
      });
    });
  });
});
