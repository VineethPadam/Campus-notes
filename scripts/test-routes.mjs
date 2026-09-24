import fs from 'fs';
import path from 'path';

async function testBackendSecurity() {
  console.log('--- TESTING ANTI-INSPECT SECURITY & ASSET STORAGE ---');
  
  // Test 1: Check public directory
  const publicPdfJava = path.join(process.cwd(), 'public', 'programming-notes.pdf');
  const publicPdfSpringBoot = path.join(process.cwd(), 'public', 'spring-boot-notes.pdf');
  const existsInPublic = fs.existsSync(publicPdfJava) || fs.existsSync(publicPdfSpringBoot);
  console.log(`[TEST 1] PDFs in public/ folder? ${existsInPublic ? 'FAIL (Exposed!)' : 'PASS (Not exposed to browser inspect!)'}`);

  // Test 2: Check private assets (Java & Spring Boot)
  const privatePdfJava = path.join(process.cwd(), 'private_assets', 'programming-notes.pdf');
  const privatePdfSpringBoot = path.join(process.cwd(), 'private_assets', 'spring-boot-notes.pdf');
  const existsJavaPrivate = fs.existsSync(privatePdfJava);
  const existsSpringBootPrivate = fs.existsSync(privatePdfSpringBoot);
  
  console.log(`[TEST 2a] Java PDF in private_assets/? ${existsJavaPrivate ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);
  console.log(`[TEST 2b] Spring Boot PDF in private_assets/? ${existsSpringBootPrivate ? 'PASS (Secure server storage)' : 'FAIL (Missing file)'}`);

  // Test 3: Check API endpoints code verification
  const verifyRouteContent = fs.readFileSync(path.join(process.cwd(), 'app', 'api', 'verify-and-download', 'route.ts'), 'utf-8');
  const hasHmacCheck = verifyRouteContent.includes('crypto.createHmac') || verifyRouteContent.includes('generatedSignature');
  console.log(`[TEST 3] Cryptographic HMAC SHA256 Signature Verification present? ${hasHmacCheck ? 'PASS' : 'FAIL'}`);

  if (!existsInPublic && existsJavaPrivate && existsSpringBootPrivate && hasHmacCheck) {
    console.log('\n✅ ALL SECURITY VERIFICATION TESTS PASSED!');
  } else {
    console.error('\n❌ SECURITY TEST FAILED');
    process.exit(1);
  }
}

testBackendSecurity().catch(console.error);
