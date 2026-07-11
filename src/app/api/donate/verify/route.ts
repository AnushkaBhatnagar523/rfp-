import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment signature credentials' }, { status: 400 });
    }

    // Check if it is a simulated order
    const isMockOrder = razorpay_order_id.startsWith('order_sim_');
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!isMockOrder) {
      if (!keySecret) {
        return NextResponse.json({ error: 'Missing Razorpay configuration on server' }, { status: 500 });
      }

      // Cryptographic signature check
      const text = `${razorpay_order_id}|${razorpay_payment_id}`;
      const generated_signature = crypto
        .createHmac('sha256', keySecret)
        .update(text)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        // Mark as failed
        await db.execute({
          sql: 'UPDATE donations SET status = "failed" WHERE order_id = ?',
          args: [razorpay_order_id]
        });
        return NextResponse.json({ error: 'Payment signature mismatch' }, { status: 400 });
      }
    }

    // Payment is valid (either mock success or verified signature)
    await db.execute({
      sql: `
        UPDATE donations 
        SET status = "paid", payment_id = ?, signature = ? 
        WHERE order_id = ?
      `,
      args: [razorpay_payment_id, razorpay_signature, razorpay_order_id]
    });

    console.log(`[Donation Receipt Verified] Order: ${razorpay_order_id} | Paid: ₹${razorpay_payment_id}`);

    return NextResponse.json({ success: true, message: 'Donation successfully verified and recorded' });

  } catch (error: any) {
    console.error('Donation verification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
