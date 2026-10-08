// Unit tests for Firebase Authentication & Service integration
const assert = require('assert');

// Simulate browser environment globals for Node.js
global.window = {
  addEventListener: () => {},
  firebase: null
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; },
  clear() { this._store = {}; }
};
global.navigator = { onLine: true };

// Mock Firebase SDK
let authStateListener = null;
let currentMockUser = null;

const mockAuth = {
  onAuthStateChanged(cb) {
    authStateListener = cb;
    setTimeout(() => cb(currentMockUser), 10);
  },
  async signInWithEmailAndPassword(email, pass) {
    if (email === 'fail@test.com') {
      const err = new Error('Wrong password');
      err.code = 'auth/wrong-password';
      throw err;
    }
    currentMockUser = {
      uid: 'user_12345',
      email: email,
      isAnonymous: false
    };
    if (authStateListener) authStateListener(currentMockUser);
    return { user: currentMockUser };
  },
  async createUserWithEmailAndPassword(email, pass) {
    if (email === 'exists@test.com') {
      const err = new Error('Email exists');
      err.code = 'auth/email-already-in-use';
      throw err;
    }
    currentMockUser = {
      uid: 'user_new_67890',
      email: email,
      isAnonymous: false
    };
    if (authStateListener) authStateListener(currentMockUser);
    return { user: currentMockUser };
  },
  async signOut() {
    currentMockUser = null;
    if (authStateListener) authStateListener(null);
  }
};

const mockFirestore = {
  collection(name) {
    return {
      doc(id) {
        return {
          async set(data) { return { id }; },
          async get() {
            return {
              exists: true,
              data: () => ({ saveData: { detective: { name: 'Renata Vance' } } })
            };
          }
        };
      }
    };
  }
};

global.window.firebase = {
  apps: [],
  initializeApp: (cfg) => ({}),
  auth: () => mockAuth,
  firestore: () => mockFirestore
};

// Now import the bundled FirebaseService or test src/firebase.js directly
const fs = require('fs');
const path = require('path');

let firebaseContent = fs.readFileSync(path.join(__dirname, '../src/firebase.js'), 'utf8');
// Clean ES imports/exports for Node evaluation
firebaseContent = firebaseContent.replace(/^export\s+(const|class)\s+/gm, '$1 ');
firebaseContent += '\nmodule.exports = { firebaseConfig, FirebaseService, firebaseService };';

// Evaluate module in node
const m = { exports: {} };
const fn = new Function('module', 'exports', 'require', 'window', 'localStorage', 'navigator', firebaseContent);
fn(m, m.exports, require, global.window, global.localStorage, global.navigator);

const { firebaseConfig, FirebaseService, firebaseService } = m.exports;

async function runTests() {
  console.log('--- Testing Firebase Configuration ---');
  assert.strictEqual(firebaseConfig.projectId, 'aenigmarchive');
  assert.strictEqual(firebaseConfig.apiKey, 'AIzaSyBF_YM5JKkan__1CMgEtSDMIFzfyitFwSc');
  assert.strictEqual(firebaseConfig.authDomain, 'aenigmarchive.firebaseapp.com');
  console.log('✓ Firebase configuration verified.');

  console.log('--- Testing Initialization ---');
  const service = new FirebaseService();
  const initRes = service.init();
  assert.strictEqual(initRes, true);
  assert.strictEqual(service.isInitialized, true);
  console.log('✓ Firebase service initialized successfully.');

  console.log('--- Testing Initial Guest Status ---');
  let status = service.getStatus();
  assert.strictEqual(status.isAuthenticated, false);
  assert.strictEqual(status.userEmail, null);
  assert.ok(status.playerId.startsWith('det_'));
  console.log('✓ Initial guest mode verified. Player ID:', status.playerId);

  console.log('--- Testing Validation on Login & Register ---');
  let failLogin = await service.loginWithEmailPassword('', '');
  assert.strictEqual(failLogin.success, false);
  let failReg = await service.registerWithEmailPassword('test@test.com', '123');
  assert.strictEqual(failReg.success, false);
  console.log('✓ Input validation verified.');

  console.log('--- Testing Failed Login (Wrong Password) ---');
  let wrongPass = await service.loginWithEmailPassword('fail@test.com', 'wrong');
  assert.strictEqual(wrongPass.success, false);
  assert.ok(wrongPass.error.includes('Kata sandi'));
  console.log('✓ Friendly error translation verified:', wrongPass.error);

  console.log('--- Testing Successful Login ---');
  let loginRes = await service.loginWithEmailPassword('detective@precinct4.gov', 'secret123');
  assert.strictEqual(loginRes.success, true);
  assert.strictEqual(loginRes.user.email, 'detective@precinct4.gov');
  status = service.getStatus();
  assert.strictEqual(status.isAuthenticated, true);
  assert.strictEqual(status.userEmail, 'detective@precinct4.gov');
  assert.strictEqual(status.playerId, 'user_12345');
  console.log('✓ Successful login verified. Authenticated user:', status.userEmail);

  console.log('--- Testing Cloud Save & Load with Auth UID ---');
  let saveRes = await service.saveGameToCloud({ detective: { name: 'Renata Vance', level: 2 } });
  assert.strictEqual(saveRes.success, true);
  assert.strictEqual(saveRes.playerId, 'user_12345');
  let loadRes = await service.loadGameFromCloud();
  assert.strictEqual(loadRes.success, true);
  assert.strictEqual(loadRes.data.detective.name, 'Renata Vance');
  console.log('✓ Cloud save and load with user UID verified.');

  console.log('--- Testing Logout Functionality ---');
  let logoutRes = await service.logout();
  assert.strictEqual(logoutRes.success, true);
  status = service.getStatus();
  assert.strictEqual(status.isAuthenticated, false);
  assert.strictEqual(status.userEmail, null);
  assert.strictEqual(service.user, null);
  console.log('✓ Logout successfully cleared authentication state.');

  console.log('--- Testing Registration Flow ---');
  let regRes = await service.registerWithEmailPassword('new_detective@scotland.org', 'password123');
  assert.strictEqual(regRes.success, true);
  assert.strictEqual(regRes.user.email, 'new_detective@scotland.org');
  status = service.getStatus();
  assert.strictEqual(status.isAuthenticated, true);
  assert.strictEqual(status.userEmail, 'new_detective@scotland.org');
  assert.strictEqual(status.playerId, 'user_new_67890');
  console.log('✓ Registration successfully connected and authenticated user.');

  console.log('\n==========================================');
  console.log('ALL UNIT TESTS PASSED SUCCESSFULLY! (100%)');
  console.log('==========================================');
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
