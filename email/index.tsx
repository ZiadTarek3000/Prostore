import { Resend } from 'resend';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import { Order } from '@/types';
import dotenv from 'dotenv';
dotenv.config();

import PurchaseReceiptEmail from './purchase-receipt';

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  if (!process.env.RESEND_API_KEY) {
    console.warn(
      'RESEND_API_KEY not set — skipping purchase receipt email for order',
      order.id
    );
    return;
  }

  // Instantiate lazily / skip when RESEND_API_KEY is absent.
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: `${APP_NAME} <${SENDER_EMAIL}>`,
      to: order.user.email,
      subject: `Order Confirmation ${order.id}`,
      react: <PurchaseReceiptEmail order={order} />,
    });
  } catch (error) {
    console.error('Failed to send purchase receipt email:', error);
  }
};
