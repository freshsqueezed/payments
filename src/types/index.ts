import type StripeProvider from '../../src/providers/stripe';

export enum PaymentMethodType {
  CREDIT_CARD = 'credit-card',
}

export interface PaymentMethod {
  type: PaymentMethodType;
}

export interface CreditCardPaymentMethod extends PaymentMethod {
  type: PaymentMethodType.CREDIT_CARD;
  cardNumber: string;
  expirationDate: string;
  cardCode: string;
}

export enum Providers {
  STRIPE = 'stripe',
}

export interface PaymentProviders {
  stripe: StripeProvider;
}

export interface PaymentRequest {
  provider: string;
  amount: number;
  paymentMethod: CreditCardPaymentMethod;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
}
