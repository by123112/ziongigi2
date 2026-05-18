// pages/api/paystack-webhook.js
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase with service role key (bypasses RLS for updates)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Add this to your env variables
  { auth: { persistSession: false } }
);

export default async function handler(req, res) {
  // 1. Accept only POST requests
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // 2. Verify Paystack signature
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash !== req.headers['x-paystack-signature']) {
    return res.status(401).send('Unauthorized');
  }

  const event = req.body;

  // 3. Handle successful charge event
  if (event.event === 'charge.success') {
    const { reference } = event.data;
    
    // 4. Update order status in Supabase
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('id, buyer_email, product_id')
      .eq('payment_reference', reference)
      .single();

    if (fetchError || !order) {
      console.error('Order not found:', reference);
      return res.status(200).send('Webhook received (order not found)');
    }

    // Generate a unique download token
    const downloadToken = crypto.randomBytes(32).toString('hex');

    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'completed', download_token: downloadToken })
      .eq('id', order.id);

    if (updateError) {
      console.error('Update failed:', updateError);
      return res.status(500).send('Internal Server Error');
    }

    // (Optional) Send email to buyer with download link
    // You can integrate with Resend, SendGrid, etc.
    // For now, just log:
    console.log(`Payment completed for order ${order.id}. Download token: ${downloadToken}`);

    // You could also add a notification to the buyer's notification center
    await supabase.from('notifications').insert({
      user_id: order.buyer_id, // If you store buyer_id in orders – you may need to fetch it
      title: 'Payment Successful',
      message: `Your payment for order ${reference} was confirmed. Download your product now.`,
      is_read: false,
    });

    return res.status(200).json({ message: 'Webhook processed' });
  }

  // Acknowledge other events
  res.status(200).send('Event received');
}