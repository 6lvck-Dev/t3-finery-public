// Admin Authentication with Luxury Experience
class AdminAuth {
  constructor() {
    this.init();
  }

  init() {
    this.form = document.getElementById('adminLoginForm');
    this.loginBtn = document.getElementById('loginButton');
    this.accessOverlay = document.getElementById('accessOverlay');

    this.setupEventListeners();
    this.animateEntrance();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleLogin(e));

    // Input focus effects
    const inputs = document.querySelectorAll('.luxury-input');
    inputs.forEach(input => {
      input.addEventListener('focus', () => this.animateInputFocus(input));
      input.addEventListener('blur', () => this.animateInputBlur(input));
    });
  }

  animateEntrance() {
    // Staggered animation for form elements
    const elements = document.querySelectorAll('.input-group, .login-btn, .brand-reveal');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';

      setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  }

  animateInputFocus(input) {
    const group = input.closest('.input-group');
    group.classList.add('focused');
  }

  animateInputBlur(input) {
    const group = input.closest('.input-group');
    if (!input.value) {
      group.classList.remove('focused');
    }
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    // Show loading state
    this.setLoadingState(true);

    try {
      // Simulate authentication (replace with actual Firebase auth)
      await this.authenticate(email, password);

      // Show success animation
      await this.showSuccessAnimation();

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);

    } catch (error) {
      this.handleLoginError(error);
    } finally {
      this.setLoadingState(false);
    }
  }

  setLoadingState(loading) {
    const btnText = this.loginBtn.querySelector('.btn-text');
    const btnLoading = this.loginBtn.querySelector('.btn-loading');

    if (loading) {
      btnText.style.opacity = '0';
      btnLoading.style.display = 'block';
      this.loginBtn.disabled = true;
    } else {
      btnText.style.opacity = '1';
      btnLoading.style.display = 'none';
      this.loginBtn.disabled = false;
    }
  }

  async authenticate(email, password) {
    // Simple demo authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@t3finery.com' && password === 't3luxury2024') {
          resolve({ success: true });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1500); // Simulate API call
    });
  }

  async showSuccessAnimation() {
    this.accessOverlay.classList.add('active');

    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  handleLoginError(error) {
    // Shake animation for error
    this.form.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
      this.form.style.animation = '';
    }, 500);

    // Show error message (you can enhance this with a beautiful toast)
    alert('Access denied. Please check your credentials.');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AdminAuth();
});
