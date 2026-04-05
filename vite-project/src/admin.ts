export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  duration: string;
}

let movies: Movie[] = [
  { id: '1', title: 'The Dark Knight', genre: 'Action, Crime, Drama', year: 2008, duration: '152 min' },
  { id: '2', title: 'Inception', genre: 'Action, Adventure, Sci-Fi', year: 2010, duration: '148 min' },
  { id: '3', title: 'Interstellar', genre: 'Adventure, Drama, Sci-Fi', year: 2014, duration: '169 min' },
];

export function renderAdminDashboard(container: HTMLElement, onBack: () => void) {
  let activeTab = 'dashboard';
  let editingMovie: Movie | null = null;

  function render() {
    container.innerHTML = `
      <div class="admin-container">
        <div class="admin-sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li class="${activeTab === 'dashboard' ? 'active' : ''}" id="tab-dashboard">Dashboard</li>
            <li class="${activeTab === 'movies' ? 'active' : ''}" id="tab-movies">Movies Management</li>
            <li>User Bookings</li>
            <li>Revenue Reports</li>
          </ul>
          <button id="admin-back-btn" class="auth-button" style="margin-top: auto;">Back to Home</button>
        </div>
        <div class="admin-main">
          ${activeTab === 'dashboard' ? renderDashboard() : renderMovies()}
        </div>
      </div>
      ${editingMovie || activeTab === 'add-movie' ? renderMovieForm() : ''}
    `;

    setupEventListeners();
  }

  function renderDashboard() {
    return `
      <header>
        <h1>Overview Statistics</h1>
      </header>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Movies</h3>
          <p class="stat-value">${movies.length}</p>
        </div>
        <div class="stat-card">
          <h3>Total Bookings</h3>
          <p class="stat-value">1,248</p>
        </div>
        <div class="stat-card">
          <h3>Monthly Revenue</h3>
          <p class="stat-value">$15,420</p>
        </div>
      </div>

      <div class="admin-content-section" style="margin-top: 40px;">
        <h3>Recent Bookings</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Movie</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#BK9283</td>
              <td>johndoe@example.com</td>
              <td>The Dark Knight</td>
              <td>2024-05-12</td>
              <td><span class="badge success">Confirmed</span></td>
            </tr>
            <tr>
              <td>#BK9284</td>
              <td>sarah@test.com</td>
              <td>Inception</td>
              <td>2024-05-12</td>
              <td><span class="badge pending">Pending</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  function renderMovies() {
    return `
      <header style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Movies Management</h1>
        <button id="add-movie-btn" class="nav-admin-btn" style="padding: 10px 20px;">+ Add New Movie</button>
      </header>
      <div class="admin-content-section">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Year</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${movies.map(movie => `
              <tr>
                <td><strong>${movie.title}</strong></td>
                <td>${movie.genre}</td>
                <td>${movie.year}</td>
                <td>${movie.duration}</td>
                <td>
                  <div class="action-btns">
                    <button class="edit-btn" data-id="${movie.id}">Edit</button>
                    <button class="delete-btn" data-id="${movie.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderMovieForm() {
    const isEditing = !!editingMovie;
    return `
      <div class="modal-overlay">
        <div class="modal-content auth-card">
          <h2>${isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
          <form id="movie-form">
            <div class="form-group">
              <label for="movie-title">Title</label>
              <input type="text" id="movie-title" value="${isEditing ? editingMovie!.title : ''}" required>
            </div>
            <div class="form-group">
              <label for="movie-genre">Genre</label>
              <input type="text" id="movie-genre" value="${isEditing ? editingMovie!.genre : ''}" required>
            </div>
            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="movie-year">Year</label>
                <input type="number" id="movie-year" value="${isEditing ? editingMovie!.year : ''}" required>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="movie-duration">Duration</label>
                <input type="text" id="movie-duration" value="${isEditing ? editingMovie!.duration : ''}" placeholder="e.g. 120 min" required>
              </div>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="auth-button">${isEditing ? 'Update Movie' : 'Add Movie'}</button>
              <button type="button" id="cancel-form-btn" class="auth-button" style="background: var(--border); color: var(--text-h);">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function setupEventListeners() {
    document.getElementById('admin-back-btn')?.addEventListener('click', onBack);
    
    document.getElementById('tab-dashboard')?.addEventListener('click', () => {
      activeTab = 'dashboard';
      render();
    });

    document.getElementById('tab-movies')?.addEventListener('click', () => {
      activeTab = 'movies';
      render();
    });

    document.getElementById('add-movie-btn')?.addEventListener('click', () => {
      activeTab = 'add-movie';
      editingMovie = null;
      render();
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.target as HTMLElement).getAttribute('data-id');
        editingMovie = movies.find(m => m.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.target as HTMLElement).getAttribute('data-id');
        movies = movies.filter(m => m.id !== id);
        render();
      });
    });

    document.getElementById('cancel-form-btn')?.addEventListener('click', () => {
      activeTab = 'movies';
      editingMovie = null;
      render();
    });

    document.getElementById('movie-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = (document.getElementById('movie-title') as HTMLInputElement).value;
      const genre = (document.getElementById('movie-genre') as HTMLInputElement).value;
      const year = parseInt((document.getElementById('movie-year') as HTMLInputElement).value);
      const duration = (document.getElementById('movie-duration') as HTMLInputElement).value;

      if (editingMovie) {
        // UPDATE
        const index = movies.findIndex(m => m.id === editingMovie!.id);
        movies[index] = { ...editingMovie, title, genre, year, duration };
      } else {
        // CREATE
        movies.push({
          id: Math.random().toString(36).substring(2, 9),
          title, genre, year, duration
        });
      }

      editingMovie = null;
      activeTab = 'movies';
      render();
    });
  }

  render();
}
