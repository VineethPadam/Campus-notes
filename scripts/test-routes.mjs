import fs from 'fs';
import path from 'path';

async function testBackendSecurity() {
  console.log('--- TESTING ANTI-INSPECT SECURITY & ASSET STORAGE ---');
  
  // Test 1: Check public directory
  const publicPdfJava = path.join(process.cwd(), 'public', 'programming-notes.pdf');
  const publicPdfSpringBoot = path.join(process.cwd(), 'public', 'spring-boot-notes.pdf');
  const publicPdfCCoding = path.join(process.cwd(), 'public', 'c-100-coding-notes.pdf');
  const existsInPublic = fs.existsSync(publicPdfJava) || fs.existsSync(publicPdfSpringBoot) || fs.existsSync(publicPdfCCoding);
  console.log(`[TEST 1] PDFs in public/ folder? ${existsInPublic ? 'FAIL (Exposed!)' : 'PASS (Not exposed to browser inspect!)'}`);

  // Test 2: Check private assets (Java, Spring Boot, C 100 Coding, C Textbook, C Combo)
  const privatePdfJava = path.join(process.cwd(), 'private_assets', 'programming-notes.pdf');
  const privatePdfSpringBoot = path.join(process.cwd(), 'private_assets', 'spring-boot-notes.pdf');
  const privatePdfCCoding = path.join(process.cwd(), 'private_assets', 'c-100-coding-notes.pdf');
  const privatePdfCTextbook = path.join(process.cwd(), 'private_assets', 'c-textbook-notes.pdf');
  const privatePdfCCombo = path.join(process.cwd(), 'private_assets', 'c-combo-notes.pdf');

  const existsJava = fs.existsSync(privatePdfJava);
  const existsSpringBoot = fs.existsSync(privatePdfSpringBoot);
  const existsCCoding = fs.existsSync(privatePdfCCoding);
  const existsCTextbook = fs.existsSync(privatePdfCTextbook);
  const existsCCombo = fs.existsSync(privatePdfCCombo);
  
  console.log(`[TEST 2a] Java PDF in private_assets/? ${existsJava ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);
  console.log(`[TEST 2b] Spring Boot PDF in private_assets/? ${existsSpringBoot ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);
  console.log(`[TEST 2c] C 100 Coding PDF in private_assets/? ${existsCCoding ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);
  console.log(`[TEST 2d] C Textbook PDF in private_assets/? ${existsCTextbook ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);
  console.log(`[TEST 2e] C Combo PDF in private_assets/? ${existsCCombo ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);

  // Test 3: Check API endpoints code verification
  const verifyRouteContent = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'verify-and-download', 'route.ts'), 'utf-8');
  const hasHmacCheck = verifyRouteContent.includes('crypto.createHmac') || verifyRouteContent.includes('generatedSignature');
  console.log(`[TEST 3] Cryptographic HMAC SHA256 Signature Verification present? ${hasHmacCheck ? 'PASS' : 'FAIL'}`);

  if (!existsInPublic && existsJava && existsSpringBoot && existsCCoding && existsCTextbook && existsCCombo && hasHmacCheck) {
    console.log('\n✅ ALL SECURITY & ASSET VERIFICATION TESTS PASSED!');
  } else {
    console.error('\n❌ SECURITY TEST FAILED');
    process.exit(1);
  }
}

testBackendSecurity().catch(console.error);
