export const isPayPalConfigured = () =>
  Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_APP_SECRET);

export const isStripeConfigured = () =>
  Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
