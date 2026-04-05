import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'
import { renderLogin, renderRegister } from './auth.ts'

const app = document.querySelector<HTMLDivElement>('#app')!

function renderHome() {
  app.innerHTML = `
    <button id="nav-login-btn" class="nav-login-btn">Login / Sign Up</button>
    <section id="center">
      <div class="hero">
        <img src="${heroImg}" class="base" width="170" height="179">
        <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
        <img src=${viteLogo} class="vite" alt="Vite logo" />
      </div>
      <div>
        <h1>Movie Ticket Booking</h1>
        <p>Book your favorite movies in seconds. Experience cinema like never before.</p>
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
}

function showLogin() {
  renderLogin(
    app, 
    () => renderHome(), // On success
    () => showRegister(), // Switch to register
    () => renderHome() // Back button
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
