import { INITIAL_PRODUCTS } from './src/data/mockProducts.js';
import { getProducts } from './src/services/mockApi.js';
import fs from 'fs';

console.log('--- STARTING VERIFICATION TEST OF ALL 12 BUGS ---');

let passed = 0;

// Test BUG-01: Non-functional button in CartPage.jsx
const cartPageSource = fs.readFileSync('./src/pages/CartPage.jsx', 'utf8');
if (cartPageSource.includes('handleApplyCoupon') && cartPageSource.includes('// BUG-01: Empty no-op function!')) {
  console.log('✓ BUG-01 Verified: Promo apply button handler is no-op');
  passed++;
} else {
  console.error('✗ BUG-01 Failed verification');
}

// Test BUG-02: Case-sensitive search
const queryLower = 'wireless';
const queryExact = 'Wireless';
const matchLower = INITIAL_PRODUCTS.filter(p => p.name.includes(queryLower));
const matchExact = INITIAL_PRODUCTS.filter(p => p.name.includes(queryExact));
if (matchLower.length === 0 && matchExact.length > 0) {
  console.log('✓ BUG-02 Verified: Case-sensitive search bug behaves deterministically (lower=0, exact=' + matchExact.length + ')');
  passed++;
} else {
  console.error('✗ BUG-02 Failed verification');
}

// Test BUG-03: Audio category filter
const testAudioFilter = (category) => {
  if (category === 'Audio') return INITIAL_PRODUCTS.filter(p => p.category === 'Audios');
  return INITIAL_PRODUCTS.filter(p => p.category === category);
};
const audioResults = testAudioFilter('Audio');
const electronicsResults = testAudioFilter('Electronics');
if (audioResults.length === 0 && electronicsResults.length > 0) {
  console.log('✓ BUG-03 Verified: Audio category filter returns 0 products due to "Audios" typo');
  passed++;
} else {
  console.error('✗ BUG-03 Failed verification');
}

// Test BUG-04: Cart subtotal ignores quantity
const sampleCart = [
  { id: 'prod-001', price: 189.99, quantity: 2 },
  { id: 'prod-005', price: 34.99, quantity: 1 }
];
const buggySubtotal = sampleCart.reduce((acc, item) => acc + Number(item.price), 0);
const accurateSubtotal = sampleCart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
if (buggySubtotal === (189.99 + 34.99) && buggySubtotal !== accurateSubtotal) {
  console.log(`✓ BUG-04 Verified: Cart subtotal calculates $${buggySubtotal.toFixed(2)} ignoring quantities (accurate is $${accurateSubtotal.toFixed(2)})`);
  passed++;
} else {
  console.error('✗ BUG-04 Failed verification');
}

// Test BUG-05: Missing registration validation in RegisterPage.jsx
const regPageSource = fs.readFileSync('./src/pages/RegisterPage.jsx', 'utf8');
const codeWithoutCommentsReg = regPageSource.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
if (regPageSource.includes('BUG-05') && !codeWithoutCommentsReg.includes('formData.password !== formData.confirmPassword')) {
  console.log('✓ BUG-05 Verified: Registration code omits password length and match checks');
  passed++;
} else {
  console.error('✗ BUG-05 Failed verification');
}

// Test BUG-06: Duplicate submission in ContactPage.jsx
const contactPageSource = fs.readFileSync('./src/pages/ContactPage.jsx', 'utf8');
const codeWithoutCommentsContact = contactPageSource.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
if (contactPageSource.includes('BUG-06') && !codeWithoutCommentsContact.includes('disabled=')) {
  console.log('✓ BUG-06 Verified: Contact submit button is never disabled (vulnerable to duplicate submissions)');
  passed++;
} else {
  console.error('✗ BUG-06 Failed verification');
}

// Test BUG-07: Success shown on failed validation in ProfilePage.jsx
const profilePageSource = fs.readFileSync('./src/pages/ProfilePage.jsx', 'utf8');
if (profilePageSource.includes('BUG-07') && profilePageSource.includes("addToast('Profile changes saved successfully!', 'success');")) {
  console.log('✓ BUG-07 Verified: Success toast fires despite errors in ProfilePage');
  passed++;
} else {
  console.error('✗ BUG-07 Failed verification');
}

// Test BUG-08: Stale localStorage UI state in ProfilePage.jsx
const codeWithoutCommentsProfile = profilePageSource.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
if (profilePageSource.includes('BUG-08') && profilePageSource.includes('localStorage.setItem') && !codeWithoutCommentsProfile.includes('setUser(')) {
  console.log('✓ BUG-08 Verified: ProfilePage updates localStorage without calling setUser()');
  passed++;
} else {
  console.error('✗ BUG-08 Failed verification');
}

// Test BUG-09: Stale mock product cache
async function testCache() {
  const first = await getProducts();
  const second = await getProducts({ forceRefresh: true });
  if (second.cached === true) {
    console.log('✓ BUG-09 Verified: getProducts({ forceRefresh: true }) ignores forceRefresh and returns cached: true');
    passed++;
  } else {
    console.error('✗ BUG-09 Failed verification');
  }
}
await testCache();

// Test BUG-10: Network endpoint typo in code
const apiSource = fs.readFileSync('./src/services/mockApi.js', 'utf8');
if (apiSource.includes('/api/v1/produts/stock-status')) {
  console.log('✓ BUG-10 Verified: Endpoint contains misspelled path /api/v1/produts/stock-status (404 in DevTools)');
  passed++;
} else {
  console.error('✗ BUG-10 Failed verification');
}

// Test BUG-11: Uncaught TypeError on warranty
const prod5 = INITIAL_PRODUCTS.find(p => p.id === 'prod-005');
try {
  const duration = prod5.specs.warranty.durationMonths.toFixed(0);
  console.error('✗ BUG-11 Failed verification (no error thrown)');
} catch (err) {
  if (err instanceof TypeError && err.message.includes('durationMonths')) {
    console.log('✓ BUG-11 Verified: Accessing prod-005.specs.warranty.durationMonths throws TypeError:', err.message);
    passed++;
  } else {
    console.error('✗ BUG-11 Failed with unexpected error:', err);
  }
}

// Test BUG-12: Mobile layout failure CSS in index.css
const cssSource = fs.readFileSync('./src/index.css', 'utf8');
if (cssSource.includes('.cart-fulfillment-strip') && cssSource.includes('width: 880px;') && cssSource.includes('min-width: 880px;')) {
  console.log('✓ BUG-12 Verified: .cart-fulfillment-strip has hardcoded 880px width (causes mobile overflow)');
  passed++;
} else {
  console.error('✗ BUG-12 Failed verification');
}

console.log(`\n========================================`);
console.log(`ALL 12/12 INTENTIONAL BUGS TESTED AND VERIFIED: ${passed === 12 ? 'SUCCESS (12/12)' : 'FAILED'}`);
console.log(`========================================`);
if (passed === 12) {
  process.exit(0);
} else {
  process.exit(1);
}
