// auth.js - Authentication Management (Modular SDK)
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Listen for auth state changes
    onAuthStateChanged(window.firebaseAuth, (user) => {
      this.currentUser = user;
      this.handleAuthStateChange(user);
    });
  }

  async login(email, password) {
    try {
      Loader.show('Signing in...');
      const userCredential = await signInWithEmailAndPassword(window.firebaseAuth, email, password);
      Notify.show('Welcome back!', 'success');
      return userCredential;
    } catch (error) {
      const errorMessage = this.getErrorMessage(error.code);
      Notify.show(errorMessage, 'error');
      throw error;
    } finally {
      Loader.hide();
    }
  }

  async logout() {
    try {
      Loader.show('Signing out...');
      await signOut(window.firebaseAuth);
      Storage.clear();
      Notify.show('Successfully signed out', 'success');
      window.location.href = 'login.html'; // Same folder
    } catch (error) {
      Notify.show('Error signing out', 'error');
      console.error('Logout error:', error);
    } finally {
      Loader.hide();
    }
  }

  async resetPassword(email) {
    try {
      Loader.show('Sending reset email...');
      await sendPasswordResetEmail(window.firebaseAuth, email);
      Notify.show('Password reset email sent!', 'success');
    } catch (error) {
      const errorMessage = this.getErrorMessage(error.code);
      Notify.show(errorMessage, 'error');
      throw error;
    } finally {
      Loader.hide();
    }
  }

  handleAuthStateChange(user) {
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.includes('login.html');

    if (user) {
      // User is signed in
      Storage.set('user', {
        uid: user.uid,
        email: user.email,
        lastLogin: new Date().toISOString()
      });

      if (isLoginPage) {
        // Redirect to dashboard from login page (same folder)
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 1500); // Reduced delay for better UX
      }
    } else {
      // User is signed out
      Storage.remove('user');

      if (!isLoginPage && currentPath.includes('admin')) {
        // Redirect to login if trying to access admin pages
        window.location.href = 'login.html';
      }
    }
  }
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/invalid-email': 'Invalid email address',
      'auth/user-disabled': 'This account has been disabled',
      'auth/user-not-found': 'No account found with this email',
      'auth/wrong-password': 'Incorrect password',
      'auth/email-already-in-use': 'Email already in use',
      'auth/weak-password': 'Password is too weak',
      'auth/network-request-failed': 'Network error. Please check your connection',
      'auth/too-many-requests': 'Too many attempts. Please try again later'
    };

    return errorMessages[errorCode] || 'An error occurred. Please try again.';
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }
}

// Initialize Auth Manager
const authManager = new AuthManager();
window.authManager = authManager;
