import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const noteId = body.noteId || 'java';

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret_key';

    const priceMap: Record<string, number> = {
      'java': 49,
      'spring-boot': 69,
      'c-100-coding': 39,
      'c-textbook': 39,
      'c-combo': 59,
    };

    const productNameMap: Record<string, string> = {
      'java': 'Java Programming Language Notes',
      'spring-boot': 'Spring Boot & JPA Notes',
      'c-100-coding': 'C Programming 100 Solved Programs Book',
      'c-textbook': 'C Programming Master Textbook Notes',
      'c-combo': 'C Programming Complete Combo (Both Books)',
    };

    const priceINR = priceMap[noteId] || 49;
    const productName = productNameMap[noteId] || 'Programming Notes PDF';

    // If actual Razorpay credentials are not yet set up, return a simulated order for testing UI flow
    if (key_id.includes('placeholder') || key_secret.includes('placeholder')) {
      const mockOrderId = 'order_mock_' + Date.now() + Math.random().toString(36).substring(2, 7);
      return NextResponse.json({
        success: true,
        orderId: mockOrderId,
        amount: priceINR * 100,
        currency: 'INR',
        key: key_id,
        noteId,
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
      receipt: `receipt_${noteId}_${Date.now()}`,
      notes: {
        product: productName,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: key_id,
      noteId,
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
