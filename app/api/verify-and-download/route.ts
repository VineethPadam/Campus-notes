import { NextResponse } from 'next/server';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

async function handleVerificationAndDownload(
  razorpay_payment_id: string,
  razorpay_order_id: string,
  razorpay_signature: string,
  isMock: boolean = false,
  noteId: string = 'java'
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
    'c-combo': {
      serverFile: 'c-combo-notes.pdf',
      downloadName: 'c-programming-complete-combo.pdf',
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

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileConfig.downloadName}"`,
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
    },
  });
}

// Handle Form POST submission directly from Razorpay payment-button.js
export async function POST(req: Request) {
  try {
    let razorpay_payment_id = '';
    let razorpay_order_id = '';
    let razorpay_signature = '';
    let isMock = false;
    let noteId = 'java';

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      razorpay_payment_id = formData.get('razorpay_payment_id')?.toString() || '';
      razorpay_order_id = formData.get('razorpay_order_id')?.toString() || '';
      razorpay_signature = formData.get('razorpay_signature')?.toString() || '';
      noteId = formData.get('noteId')?.toString() || 'java';
    } else {
      const body = await req.json().catch(() => ({}));
      razorpay_payment_id = body.razorpay_payment_id || '';
      razorpay_order_id = body.razorpay_order_id || '';
      razorpay_signature = body.razorpay_signature || '';
      isMock = body.isMock || false;
      noteId = body.noteId || 'java';
    }

    return await handleVerificationAndDownload(razorpay_payment_id, razorpay_order_id, razorpay_signature, isMock, noteId);
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

  return await handleVerificationAndDownload(razorpay_payment_id, razorpay_order_id, razorpay_signature, false, noteId);
}
