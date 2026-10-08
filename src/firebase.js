// Aenigma Firebase Cloud & Authentication Service
// Connects the detective mystery RPG to Firebase Auth & Firestore Cloud Storage

export const firebaseConfig = {
  apiKey: "AIzaSyBF_YM5JKkan__1CMgEtSDMIFzfyitFwSc",
  authDomain: "aenigmarchive.firebaseapp.com",
  projectId: "aenigmarchive",
  storageBucket: "aenigmarchive.firebasestorage.app",
  messagingSenderId: "493065886023",
  appId: "1:493065886023:web:c4d47b58959f9a7dda1462"
};

const CLOUD_PLAYER_ID_KEY = 'aenigma_cloud_player_id';

export class FirebaseService {
  constructor() {
    this.app = null;
    this.auth = null;
    this.db = null;
    this.user = null;
    this.playerId = null;
    this.isInitialized = false;
    this.isOnline = false;
    this.isSaving = false;
    this.lastSyncTime = null;
    this.lastError = null;
    this.saveTimeout = null;
    this.listeners = [];

    // Ensure fallback player identity for guest mode
    this.ensurePlayerId();
  }

  ensurePlayerId() {
    if (typeof localStorage !== 'undefined') {
      let storedId = localStorage.getItem(CLOUD_PLAYER_ID_KEY);
      if (!storedId) {
        storedId = 'det_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
        localStorage.setItem(CLOUD_PLAYER_ID_KEY, storedId);
      }
      this.playerId = storedId;
    } else {
      this.playerId = 'det_offline_' + Math.random().toString(36).substring(2, 8);
    }
  }

  init() {
    if (this.isInitialized) return true;

    if (typeof window === 'undefined' || typeof window.firebase === 'undefined') {
      console.warn('[Firebase] SDK global not detected. Running in offline cache mode.');
      this.isOnline = false;
      return false;
    }

    try {
      if (!window.firebase.apps || !window.firebase.apps.length) {
        this.app = window.firebase.initializeApp(firebaseConfig);
      } else {
        this.app = window.firebase.app();
      }

      if (window.firebase.auth) {
        this.auth = window.firebase.auth();
        this.initAuth();
      }

      if (window.firebase.firestore) {
        this.db = window.firebase.firestore();
      }

      this.isInitialized = true;
      this.isOnline = navigator.onLine !== false;
      console.log('[Firebase] Successfully connected to aenigmarchive project.');

      // Listen to network status
      if (typeof window !== 'undefined') {
        window.addEventListener('online', () => {
          this.isOnline = true;
          this.notify('network_status', { isOnline: true });
        });
        window.addEventListener('offline', () => {
          this.isOnline = false;
          this.notify('network_status', { isOnline: false });
        });
      }

      return true;
    } catch (e) {
      console.error('[Firebase] Initialization error:', e);
      this.lastError = e.message;
      return false;
    }
  }

  initAuth() {
    if (!this.auth) return;

    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.playerId = user.uid;
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(CLOUD_PLAYER_ID_KEY, user.uid);
        }
        console.log('[Firebase Auth] Active user:', user.email || user.uid, 'Anonymous:', user.isAnonymous);
        this.notify('auth_ready', {
          user,
          playerId: this.playerId,
          isAnonymous: user.isAnonymous,
          email: user.email
        });
      } else {
        this.user = null;
        this.ensurePlayerId();
        console.log('[Firebase Auth] Signed out / Guest session active:', this.playerId);
        this.notify('auth_signed_out', {
          playerId: this.playerId,
          isAnonymous: true,
          user: null
        });
      }
    });
  }

  formatAuthError(err) {
    if (!err || !err.code) return err ? (err.message || 'Unknown authentication error') : 'Terjadi kesalahan autentikasi';

    switch (err.code) {
      case 'auth/invalid-email':
        return 'Format email tidak valid / Invalid email format.';
      case 'auth/user-not-found':
        return 'Akun investigator tidak ditemukan / Investigator account not found.';
      case 'auth/wrong-password':
        return 'Kata sandi tidak sesuai / Incorrect password.';
      case 'auth/invalid-credential':
        return 'Email atau kata sandi tidak cocok / Invalid email or password.';
      case 'auth/email-already-in-use':
        return 'Email ini sudah terdaftar. Silakan pilih tab Masuk / Email already in use.';
      case 'auth/weak-password':
        return 'Kata sandi terlalu pendek. Gunakan minimal 6 karakter / Password too weak.';
      case 'auth/network-request-failed':
        return 'Gagal terhubung ke jaringan. Periksa koneksi internet / Network error.';
      case 'auth/too-many-requests':
        return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat / Too many attempts.';
      case 'auth/operation-not-allowed':
        return 'Metode login email/password belum diaktifkan di Firebase Console / Email sign-in not enabled.';
      default:
        return err.message || 'Kesalahan autentikasi Firebase';
    }
  }

  async loginWithEmailPassword(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Email dan kata sandi harus diisi / Email and password required' };
    }

    if (!this.auth) {
      this.init();
      if (!this.auth) {
        return { success: false, error: 'Firebase Auth tidak tersedia / Firebase Auth unavailable' };
      }
    }

    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email.trim(), password);
      this.user = userCredential.user;
      this.playerId = userCredential.user.uid;
      this.lastError = null;

      this.notify('auth_success', {
        user: this.user,
        playerId: this.playerId,
        email: this.user.email,
        mode: 'login'
      });

      return { success: true, user: this.user };
    } catch (err) {
      console.warn('[Firebase Auth] Login failed:', err);
      const formatted = this.formatAuthError(err);
      this.lastError = formatted;
      return { success: false, error: formatted, code: err.code };
    }
  }

  async registerWithEmailPassword(email, password) {
    if (!email || !password) {
      return { success: false, error: 'Email dan kata sandi harus diisi / Email and password required' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Kata sandi minimal 6 karakter / Password must be at least 6 characters' };
    }

    if (!this.auth) {
      this.init();
      if (!this.auth) {
        return { success: false, error: 'Firebase Auth tidak tersedia / Firebase Auth unavailable' };
      }
    }

    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email.trim(), password);
      this.user = userCredential.user;
      this.playerId = userCredential.user.uid;
      this.lastError = null;

      this.notify('auth_success', {
        user: this.user,
        playerId: this.playerId,
        email: this.user.email,
        mode: 'register'
      });

      return { success: true, user: this.user };
    } catch (err) {
      console.warn('[Firebase Auth] Register failed:', err);
      const formatted = this.formatAuthError(err);
      this.lastError = formatted;
      return { success: false, error: formatted, code: err.code };
    }
  }

  async logout() {
    if (!this.auth) {
      this.user = null;
      this.ensurePlayerId();
      return { success: true };
    }

    try {
      await this.auth.signOut();
      this.user = null;
      this.ensurePlayerId();

      this.notify('auth_signed_out', {
        playerId: this.playerId,
        isAnonymous: true,
        user: null
      });

      return { success: true };
    } catch (err) {
      console.warn('[Firebase Auth] Logout error:', err);
      return { success: false, error: err.message };
    }
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(fn => {
      try {
        fn(event, payload, this);
      } catch (err) {
        console.error('[Firebase] Error in event listener:', err);
      }
    });
  }

  getStatus() {
    const isAuth = !!(this.user && !this.user.isAnonymous);
    return {
      isInitialized: this.isInitialized,
      isOnline: this.isOnline,
      isSaving: this.isSaving,
      lastSyncTime: this.lastSyncTime,
      playerId: this.playerId,
      user: this.user,
      userEmail: isAuth ? this.user.email : null,
      isAnonymous: this.user ? this.user.isAnonymous : true,
      isAuthenticated: isAuth,
      lastError: this.lastError
    };
  }

  // Debounced auto-save so rapid gameplay actions don't flood Firestore
  queueSaveToCloud(saveData, delay = 1800) {
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    this.saveTimeout = setTimeout(() => {
      this.saveGameToCloud(saveData);
    }, delay);
  }

  async saveGameToCloud(saveData) {
    if (!this.isInitialized || !this.db) {
      this.init();
      if (!this.isInitialized || !this.db) {
        return { success: false, reason: 'Firebase Firestore not available' };
      }
    }

    const docId = (this.user && this.user.uid) ? this.user.uid : this.playerId;
    if (!docId) {
      return { success: false, reason: 'No player ID available' };
    }

    this.isSaving = true;
    this.notify('save_start', { playerId: docId });

    try {
      const payload = {
        saveData: {
          detective: saveData.detective || null,
          time: saveData.time || null,
          inventory: saveData.inventory || [],
          clues: saveData.clues || [],
          thoughtCabinet: saveData.thoughtCabinet || null,
          flags: saveData.flags || {},
          resolvedChecks: saveData.resolvedChecks || {},
          visitedChoices: saveData.visitedChoices || {},
          currentLanguage: saveData.currentLanguage || 'en'
        },
        meta: {
          detectiveName: saveData.detective ? saveData.detective.name : 'Unknown',
          detectiveAlias: saveData.detective ? saveData.detective.alias : '',
          health: saveData.detective ? saveData.detective.health : 4,
          morale: saveData.detective ? saveData.detective.morale : 4,
          level: saveData.detective ? saveData.detective.level : 1,
          cluesCount: (saveData.clues && Array.isArray(saveData.clues)) ? saveData.clues.length : 0,
          caseSolved: !!(saveData.flags && saveData.flags.case_solved),
          clientTimestamp: Date.now(),
          userEmail: (this.user && !this.user.isAnonymous) ? this.user.email : null
        }
      };

      // Add Firestore server timestamp if available
      if (window.firebase && window.firebase.firestore && window.firebase.firestore.FieldValue) {
        payload.updatedAt = window.firebase.firestore.FieldValue.serverTimestamp();
      } else {
        payload.updatedAt = new Date().toISOString();
      }

      await this.db.collection('detective_saves').doc(docId).set(payload, { merge: true });

      this.isSaving = false;
      this.lastSyncTime = new Date();
      this.lastError = null;
      console.log(`[Firebase Cloud] Game saved successfully for investigator: ${docId}`);

      this.notify('save_success', {
        timestamp: this.lastSyncTime,
        playerId: docId,
        userEmail: (this.user && !this.user.isAnonymous) ? this.user.email : null
      });

      return { success: true, timestamp: this.lastSyncTime, playerId: docId };
    } catch (err) {
      this.isSaving = false;
      this.lastError = err.message;
      console.warn('[Firebase Cloud] Save error:', err.message);
      this.notify('save_error', { error: err.message, playerId: docId });
      return { success: false, error: err.message };
    }
  }

  async loadGameFromCloud() {
    if (!this.isInitialized || !this.db) {
      this.init();
      if (!this.isInitialized || !this.db) {
        return { success: false, reason: 'Firebase Firestore not available' };
      }
    }

    const docId = (this.user && this.user.uid) ? this.user.uid : this.playerId;
    if (!docId) {
      return { success: false, reason: 'No player ID available' };
    }

    this.notify('load_start', { playerId: docId });

    try {
      const doc = await this.db.collection('detective_saves').doc(docId).get();
      if (!doc.exists) {
        console.log(`[Firebase Cloud] No existing cloud record found for ${docId}`);
        this.notify('load_not_found', { playerId: docId });
        return { success: false, reason: 'no_record' };
      }

      const remoteData = doc.data();
      const actualSave = remoteData.saveData || remoteData;

      this.lastSyncTime = new Date();
      this.lastError = null;
      console.log(`[Firebase Cloud] Loaded remote game archive for investigator: ${docId}`);

      this.notify('load_success', {
        data: actualSave,
        timestamp: this.lastSyncTime,
        playerId: docId
      });

      return { success: true, data: actualSave, timestamp: this.lastSyncTime };
    } catch (err) {
      this.lastError = err.message;
      console.warn('[Firebase Cloud] Load error:', err.message);
      this.notify('load_error', { error: err.message, playerId: docId });
      return { success: false, error: err.message };
    }
  }
}

export const firebaseService = new FirebaseService();
