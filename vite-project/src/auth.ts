import { api } from './api';

export function renderLogin(container: HTMLElement, onLogin: () => void, onSwitchToRegister: () => void, onBack: () => void) {
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
  
  document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    // const email = (document.getElementById('email') as HTMLInputElement).value;
    // const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      // --- Simple Login Call ---
      // const response = await api.post('/auth/login', { email, password });
      // const { accessToken, refreshToken } = response.data;

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
      // --- Simple Register Call ---
      // await api.post('/auth/register', { name, email, password });
      
      alert('Registration successful! Please login.');
      onRegister();
    } catch (err) {
      alert('Registration failed: ' + (err as Error).message);
    }
  });
}
