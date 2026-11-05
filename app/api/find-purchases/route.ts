import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const productNameMap: Record<string, string> = {
  'java': 'Java Programming Language Notes',
  'spring-boot': 'Spring Boot & JPA Notes',
  'c-100-coding': 'C Programming 100 Solved Programs Book',
  'c-textbook': 'C Programming Master Textbook Notes',
  'mysql': 'MySQL 8.0 & SQL Complete Master Textbook',
  'java-interview': '200+ Cognizant Based Java Interview Questions Guide (232 Pages)',
  'web-development': 'HTML5 & CSS3 Complete Developer Handbook (177 Pages)',
};

function detectNoteId(productName: string, amountPaise: number): string {
  const p = (productName || '').toLowerCase();
  if (p.includes('html') || p.includes('css') || p.includes('web')) return 'web-development';
  if (p.includes('cognizant') || p.includes('interview')) return 'java-interview';
  if (p.includes('spring')) return 'spring-boot';
  if (p.includes('mysql') || p.includes('sql')) return 'mysql';
  if (p.includes('100') || p.includes('combo')) return 'c-100-coding';
  if (p.includes('textbook')) return 'c-textbook';
  if (p.includes('c programming')) return 'c-textbook';
  if (p.includes('java')) return 'java';

  // Fallback heuristic by exact amount
  if (amountPaise === 3900) return 'web-development';
  if (amountPaise === 6900) return 'spring-boot';
  return 'java';
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawPhone = body.phone || '';
    const cleanPhone = rawPhone.replace(/\D/g, '').slice(-10);

    if (cleanPhone.length !== 10) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid 10-digit mobile number' },
        { status: 400 }
      );
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
    const key_secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret_key';

    // If Razorpay live keys are configured, fetch verified purchases directly from Razorpay
    if (!key_id.includes('placeholder') && !key_secret.includes('placeholder')) {
      const razorpay = new Razorpay({ key_id, key_secret });

      // Fetch up to 100 recent payments from Razorpay
      const paymentsResponse = await razorpay.payments.all({ count: 100 });
      const items = paymentsResponse.items || [];

      // Filter for captured (successful) payments matching this phone number
      const matching = items.filter((p: any) => {
        if (p.status !== 'captured') return false;
        const contactClean = (p.contact || '').replace(/\D/g, '');
        return contactClean.endsWith(cleanPhone) || cleanPhone.endsWith(contactClean);
      });

      const purchases = matching.map((p: any) => {
        const rawProduct = p.notes?.product || '';
        const noteId = detectNoteId(rawProduct, p.amount);
        const title = productNameMap[noteId] || rawProduct || 'Campus Notes PDF';

        return {
          id: p.id,
          noteId,
          notesTitle: title,
          priceINR: (p.amount / 100).toString(),
          phone: cleanPhone,
          password: `${cleanPhone.slice(-5)}@tech`,
          paymentId: p.id,
          orderId: p.order_id || '',
          purchasedAt: new Date(p.created_at * 1000).toISOString(),
        };
      });

      return NextResponse.json({ success: true, purchases });
    }

    // In mock or placeholder test mode, return empty list (client fallback to localStorage)
    return NextResponse.json({ success: true, purchases: [] });
  } catch (error: any) {
    console.error('Error in find-purchases API:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error querying purchases' },
      { status: 500 }
    );
  }
}
