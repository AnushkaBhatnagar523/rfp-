import { NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { amount, currency, donorName, donorEmail, donorPhone, panOrPassport, project, citizenship } = await request.json();

    if (!amount || !donorName || !donorEmail || !donorPhone || !panOrPassport || !project || !citizenship) {
      return NextResponse.json({ error: 'Missing required donor details' }, { status: 400 });
    }

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let orderId = '';
    const now = new Date().toISOString();

    if (keyId && keySecret) {
      // In production: Create actual Razorpay Order via fetch
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Razorpay accepts in paise
          currency: currency || 'INR',
          receipt: `receipt_${Date.now()}`
        })
      });

      if (response.ok) {
        const orderData = await response.json();
        orderId = orderData.id;
      } else {
        console.error('Razorpay order creation failed:', await response.text());
        return NextResponse.json({ error: 'Payment gateway connection error' }, { status: 502 });
      }
    } else {
      // Fallback: Generate mock order ID for development simulation
      orderId = `order_sim_${crypto.randomBytes(8).toString('hex')}`;
    }

    // Record order in local database
    await db.execute({
      sql: `
        INSERT INTO donations (order_id, amount, currency, donor_name, donor_email, donor_phone, pan_or_passport, project, citizenship, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        orderId,
        amount,
        currency || 'INR',
        donorName,
        donorEmail,
        donorPhone,
        panOrPassport,
        project,
        citizenship,
        'created',
        now
      ]
    });

    return NextResponse.json({
      orderId,
      amount,
      currency: currency || 'INR',
      keyId: keyId || 'MOCK_KEY_ID', // Tell client if we are using mock mode
      isMock: !keyId
    });

  } catch (error: any) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic';
