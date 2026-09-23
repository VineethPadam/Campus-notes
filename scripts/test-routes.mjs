import fs from 'fs';
import path from 'path';

async function testBackendSecurity() {
  console.log('--- TESTING ANTI-INSPECT SECURITY & STORAGE ---');
  
  // Test 1: Check public directory
  const publicPdf = path.join(process.cwd(), 'public', 'programming-notes.pdf');
  const existsInPublic = fs.existsSync(publicPdf);
  console.log(`[TEST 1] PDF in public/ folder? ${existsInPublic ? 'FAIL (Exposed!)' : 'PASS (Not exposed to browser inspect!)'}`);

  // Test 2: Check private assets
  const privatePdf = path.join(process.cwd(), 'private_assets', 'programming-notes.pdf');
  const existsInPrivate = fs.existsSync(privatePdf);
  console.log(`[TEST 2] PDF in private_assets/ folder? ${existsInPrivate ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);

  // Test 3: Check API endpoints code verification
  const verifyRouteContent = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'verify-and-download', 'route.ts'), 'utf-8');
  const hasHmacCheck = verifyRouteContent.includes('crypto.createHmac') || verifyRouteContent.includes('generatedSignature');
  console.log(`[TEST 3] Cryptographic HMAC SHA256 Signature Verification present? ${hasHmacCheck ? 'PASS' : 'FAIL'}`);

  if (!existsInPublic && existsInPrivate && hasHmacCheck) {
    console.log('\n✅ ALL SECURITY VERIFICATION TESTS PASSED!');
  } else {
    console.error('\n❌ SECURITY TEST FAILED');
    process.exit(1);
  }
}

testBackendSecurity().catch(console.error);
