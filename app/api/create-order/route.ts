import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret_key';
    const priceINR = parseInt(process.env.NEXT_PUBLIC_NOTES_PRICE_INR || '89', 10);

    // If actual Razorpay credentials are not yet set up, return a simulated order for testing UI flow
    if (key_id.includes('placeholder') || key_secret.includes('placeholder')) {
      const mockOrderId = 'order_mock_' + Date.now() + Math.random().toString(36).substring(2, 7);
      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: priceINR * 100,
        currency: 'INR',
        key: key_id,
        isMock: true,
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: priceINR * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_note_${Date.now()}`,
      notes: {
        product: 'Programming Notes PDF',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
      isMock: false,
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
