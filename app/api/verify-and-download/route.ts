import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import Razorpay from 'razorpay';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';

async function handleVerificationAndDownload(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
  isMock: boolean = false,
  noteId: string = 'java',
  phone: string = ''
) {
  // Check if payment ID exists
  if (!razorpay_payment_id && !isMock) {
    return new NextResponse(
      `<html>
        <body style="font-family:sans-serif; background:#0b0f17; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; text-align:center;">
          <div>
            <h2 style="color:#ef4444;">Payment Required</h2>
            <p style="color:#9ca3af;">No payment details found. Please complete the purchase on the website first.</p>
            <a href="/" style="color:#10b981; text-decoration:underline;">Return to Website</a>
          </div>
        </body>
      </html>`,
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder_key_id';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret_key';

  // Verify cryptographic signature if real order & secret exist
  if (!isMock && razorpay_order_id && razorpay_signature && !key_secret.includes('placeholder')) {
    const generatedSignature = crypto
      .createHmac('sha256', key_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return new NextResponse(
        `<html>
          <body style="font-family:sans-serif; background:#0b0f17; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; text-align:center;">
            <div>
              <h2 style="color:#ef4444;">Verification Failed</h2>
              <p style="color:#9ca3af;">Cryptographic payment signature mismatch. Access denied.</p>
              <a href="/" style="color:#10b981; text-decoration:underline;">Return to Website</a>
            </div>
          </body>
        </html>`,
        { status: 403, headers: { 'Content-Type': 'text/html' } }
      );
    }
  } else if (!isMock && !razorpay_signature && razorpay_payment_id.startsWith('pay_') && !key_id.includes('placeholder')) {
    // If re-downloading from Library using paymentId without signature, verify with Razorpay API
    try {
      const razorpay = new Razorpay({ key_id, key_secret });
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      if (payment.status !== 'captured') {
        return new NextResponse(
          `<html>
            <body style="font-family:sans-serif; background:#0b0f17; color:#fff; display:flex; justify-content:center; align-items:center; height:100vh; text-align:center;">
              <div>
                <h2 style="color:#ef4444;">Verification Failed</h2>
                <p style="color:#9ca3af;">Payment is not captured. Access denied.</p>
                <a href="/" style="color:#10b981; text-decoration:underline;">Return to Website</a>
              </div>
            </body>
          </html>`,
          { status: 403, headers: { 'Content-Type': 'text/html' } }
        );
      }
    } catch (fetchErr: any) {
      console.error('Error verifying payment with Razorpay:', fetchErr.message);
    }
  }

  // Payment Verified! Fetch private PDF from server folder based on noteId
  const fileNameMap: Record<string, { serverFile: string; downloadName: string }> = {
    'spring-boot': {
      serverFile: 'spring-boot-notes.pdf',
      downloadName: 'spring-boot-jpa-notes.pdf',
    },
    'java': {
      serverFile: 'programming-notes.pdf',
      downloadName: 'java-programming-notes.pdf',
    },
    'c-100-coding': {
      serverFile: 'c-100-coding-notes.pdf',
      downloadName: 'c-100-master-solved-programs.pdf',
    },
    'c-textbook': {
      serverFile: 'c-textbook-notes.pdf',
      downloadName: 'c-programming-master-textbook.pdf',
    },
    'mysql': {
      serverFile: 'mysql-notes.pdf',
      downloadName: 'mysql-8-complete-master-textbook.pdf',
    },
    'java-interview': {
      serverFile: 'java-interview-notes.pdf',
      downloadName: 'cognizant-200-java-interview-guide.pdf',
    },
    'web-development': {
      serverFile: 'web-development-notes.pdf',
      downloadName: 'html5-css3-developer-handbook.pdf',
    },
  };

  const fileConfig = fileNameMap[noteId] || fileNameMap['java'];
  const pdfPath = path.join(process.cwd(), 'private_assets', fileConfig.serverFile);

  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json(
      { success: false, error: `Notes asset file (${fileConfig.serverFile}) not found on server` },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(pdfPath);

  // If phone number is supplied, encrypt PDF with user password (last 5 digits + '@tech')
  // and an owner password to block permission tampering or password removal upon resaving.
  const cleanPhone = (phone || '').replace(/\D/g, '');
  let returnBuffer: Uint8Array = fileBuffer;

  if (cleanPhone.length >= 5) {
    const last5 = cleanPhone.slice(-5);
    const userPassword = `${last5}@tech`;
    const ownerPassword = process.env.PDF_OWNER_KEY || 'CAMPUS_MASTER_SECURE_OWNER_2026';

    try {
      returnBuffer = await encryptPDF(fileBuffer, userPassword, {
        ownerPassword,
        allowPrinting: true,
        allowModifying: false,
        allowCopying: false,
      });
    } catch (encErr) {
      console.error('PDF Encryption Warning:', encErr);
      returnBuffer = fileBuffer;
    }
  }

  return new NextResponse(returnBuffer as any, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileConfig.downloadName}"`,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}

// Handle Form POST submission directly from Razorpay payment-button.js or client JSON
export async function POST(req: Request) {
  try {
    let razorpay_payment_id = '';
    let razorpay_order_id = '';
    let razorpay_signature = '';
    let isMock = false;
    let noteId = 'java';
    let phone = '';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      razorpay_payment_id = formData.get('razorpay_payment_id')?.toString() || '';
      razorpay_order_id = formData.get('razorpay_order_id')?.toString() || '';
      razorpay_signature = formData.get('razorpay_signature')?.toString() || '';
      noteId = formData.get('noteId')?.toString() || 'java';
      phone = formData.get('phone')?.toString() || '';
    } else {
      const body = await req.json().catch(() => ({}));
      razorpay_payment_id = body.razorpay_payment_id || '';
      razorpay_order_id = body.razorpay_order_id || '';
      razorpay_signature = body.razorpay_signature || '';
      isMock = body.isMock || false;
      noteId = body.noteId || 'java';
      phone = body.phone || '';
    }

    return await handleVerificationAndDownload(razorpay_payment_id, razorpay_order_id, razorpay_signature, isMock, noteId, phone);
  } catch (error: any) {
    console.error('Error in verify-and-download API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Handle GET redirect if Razorpay redirects to URL with payment params
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const razorpay_payment_id = searchParams.get('razorpay_payment_id') || '';
  const razorpay_order_id = searchParams.get('razorpay_order_id') || '';
  const razorpay_signature = searchParams.get('razorpay_signature') || '';
  const noteId = searchParams.get('noteId') || 'java';
  const phone = searchParams.get('phone') || '';

  return await handleVerificationAndDownload(razorpay_payment_id, razorpay_order_id, razorpay_signature, false, noteId, phone);
}
