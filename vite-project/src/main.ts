import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'
import { renderLogin, renderRegister, renderForgotPassword, renderResetPassword } from './auth.ts'
import { logout } from './api.ts'

const app = document.querySelector<HTMLDivElement>('#app')!

function renderHome() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  app.innerHTML = `
    ${isLoggedIn ? 
      `<div class="nav-user-info">
        <span>Logged in with Token</span>
        <button id="logout-btn" class="nav-login-btn">Logout</button>
       </div>` : 
      `<button id="nav-login-btn" class="nav-login-btn">Login / Sign Up</button>`
    }
    <section id="center">
      <div class="hero">
        <img src="${heroImg}" class="base" width="170" height="179">
        <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
        <img src=${viteLogo} class="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Movie Ticket Booking</h1>
        <p>Book your favorite movies in seconds. Experience cinema like never before.</p>
        ${isLoggedIn ? 
          `<p style="margin-top: 20px; font-size: 14px; opacity: 0.7;">
            Access Token: <code>${localStorage.getItem('accessToken')?.substring(0, 15)}...</code><br>
            Refresh Token: <code>${localStorage.getItem('refreshToken')?.substring(0, 15)}...</code>
          </p>` : ''
        }
      </div>
      <button id="counter" type="button" class="counter"></button>
    </section>

    <div class="ticks"></div>

    <section id="next-steps">
      <div id="docs">
        <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
        <h2>Documentation</h2>
        <p>Your questions, answered</p>
        <ul>
          <li>
            <a href="https://vite.dev/" target="_blank">
              <img class="logo" src=${viteLogo} alt="" />
              Explore Vite
            </a>
          </li>
          <li>
            <a href="https://www.typescriptlang.org" target="_blank">
              <img class="button-icon" src="${typescriptLogo}" alt="">
              Learn more
            </a>
          </li>
        </ul>
      </div>
      <div id="social">
        <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
        <h2>Connect with us</h2>
        <p>Join the Vite community</p>
        <ul>
          <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
          <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
          <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
          <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
        </ul>
      </div>
    </section>

    <div class="ticks"></div>
    <section id="spacer"></section>
  `

  setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
  
  document.getElementById('nav-login-btn')?.addEventListener('click', () => {
    showLogin();
  });

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    logout();
  });
}

function showLogin() {
  renderLogin(
    app, 
    () => renderHome(), // On success
    () => showRegister(), // Switch to register
    () => showForgotPassword(), // Forgot password
    () => renderHome() // Back button
  );
}

function showForgotPassword() {
  renderForgotPassword(
    app,
    () => showResetPassword(), // Next step
    () => showLogin() // Back to login
  );
}

function showResetPassword() {
  renderResetPassword(
    app,
    () => showLogin(), // After reset succeeds
    () => showLogin() // Back to login
  );
}

function showRegister() {
  renderRegister(
    app,
    () => renderHome(), // On success
    () => showLogin(), // Switch to login
    () => renderHome() // Back button
  );
}

// Initial render
renderHome();
