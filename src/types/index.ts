import type { StripeProvider } from '../providers';

export enum Providers {
  STRIPE = 'stripe',
}

export type Provider = Providers;

export interface PaymentProviders {
  stripe: StripeProvider;
}
