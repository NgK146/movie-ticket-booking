import { api } from './api';

export function renderLogin(
  container: HTMLElement, 
  onLogin: () => void, 
  onSwitchToRegister: () => void, 
  onForgotPassword: () => void,
  onBack: () => void
) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <a class="back-home" id="back-home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </a>
        <h2>Welcome Back</h2>
        <p>Login to book your favorite movies</p>
        
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" placeholder="name@example.com" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="••••••••" required>
            <div style="text-align: right; margin-top: 8px;">
              <a id="link-forgot-password" class="auth-link-sm">Forgot Password?</a>
            </div>
          </div>
          <button type="submit" class="auth-button">Sign In</button>
        </form>
        
        <div class="auth-switch">
          Don't have an account? <a id="switch-to-register">Create one</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('back-home')?.addEventListener('click', onBack);
  document.getElementById('switch-to-register')?.addEventListener('click', onSwitchToRegister);
  document.getElementById('link-forgot-password')?.addEventListener('click', onForgotPassword);
  
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const email = (document.getElementById('email') as HTMLInputElement).value;
    // const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      // Mocking token storage for now
      localStorage.setItem('accessToken', 'mock_access_token');
      localStorage.setItem('refreshToken', 'mock_refresh_token');
      
      alert('Login successful! Tokens stored.');
      onLogin();
    } catch (err) {
      alert('Login failed: ' + (err as Error).message);
    }
  });
}

export function renderForgotPassword(
  container: HTMLElement,
  onResetSent: () => void,
  onBackToLogin: () => void
) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <a class="back-home" id="back-to-login">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Login
        </a>
        <h2>Forgot Password?</h2>
        <p>No worries, we'll send you reset instructions.</p>
        
        <form id="forgot-password-form">
          <div class="form-group">
            <label for="forgot-email">Email Address</label>
            <input type="email" id="forgot-email" placeholder="name@example.com" required>
          </div>
          <button type="submit" class="auth-button">Send Reset Link</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('back-to-login')?.addEventListener('click', onBackToLogin);
  
  document.getElementById('forgot-password-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('forgot-email') as HTMLInputElement).value;
    alert(`Reset link sent to ${email}! (Check your "inbox")`);
    onResetSent();
  });
}

export function renderResetPassword(
  container: HTMLElement,
  onPasswordReset: () => void,
  onBackToLogin: () => void
) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <h2>Reset Password</h2>
        <p>Enter your new password below.</p>
        
        <form id="reset-password-form">
          <div class="form-group">
            <label for="new-password">New Password</label>
            <input type="password" id="new-password" placeholder="••••••••" required>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="auth-button">Reset Password</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('reset-password-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = (document.getElementById('new-password') as HTMLInputElement).value;
    const confirm = (document.getElementById('confirm-password') as HTMLInputElement).value;

    if (password !== confirm) {
      alert("Passwords don't match!");
      return;
    }

    alert('Password reset successfully! You can now login.');
    onPasswordReset();
  });

  // Adding a back button for Reset Password view as well
  const backBtn = document.createElement('a');
  backBtn.className = 'back-home';
  backBtn.id = 'back-to-login-reset';
  backBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
    Back to Login
  `;
  container.querySelector('.auth-card')?.prepend(backBtn);
  backBtn.addEventListener('click', onBackToLogin);
}

export function renderRegister(container: HTMLElement, onRegister: () => void, onSwitchToLogin: () => void, onBack: () => void) {
  container.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <a class="back-home" id="back-home">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </a>
        <h2>Create Account</h2>
        <p>Join us to get the best movie experience</p>
        
        <form id="register-form">
          <div class="form-group">
            <label for="reg-name">Full Name</label>
            <input type="text" id="reg-name" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label for="reg-email">Email Address</label>
            <input type="email" id="reg-email" placeholder="name@example.com" required>
          </div>
          <div class="form-group">
            <label for="reg-password">Password</label>
            <input type="password" id="reg-password" placeholder="••••••••" required>
          </div>
          <button type="submit" class="auth-button">Sign Up</button>
        </form>
        
        <div class="auth-switch">
          Already have an account? <a id="switch-to-login">Sign in</a>
        </div>
      </div>
    </div>
  `;

  document.getElementById('back-home')?.addEventListener('click', onBack);
  document.getElementById('switch-to-login')?.addEventListener('click', onSwitchToLogin);
  
  document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const name = (document.getElementById('reg-name') as HTMLInputElement).value;
    // const email = (document.getElementById('reg-email') as HTMLInputElement).value;
    // const password = (document.getElementById('reg-password') as HTMLInputElement).value;

    try {
      alert('Registration successful! Please login.');
      onRegister();
    } catch (err) {
      alert('Registration failed: ' + (err as Error).message);
    }
  });
}
