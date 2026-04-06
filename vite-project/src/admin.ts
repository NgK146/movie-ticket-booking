import { cinemas, type Cinema } from './Cinema';
import { rooms, type Room } from './Room';
import { showtimes, type Showtime } from './Showtime';
import { coupons, type Coupon } from './Coupon';

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
  let editingCinema: Cinema | null = null;
  let editingRoom: Room | null = null;
  let editingShowtime: Showtime | null = null;
  let editingCoupon: Coupon | null = null;

  function render() {
    container.innerHTML = `
      <div class="admin-container">
        <div class="admin-sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li class="${activeTab === 'dashboard' ? 'active' : ''}" id="tab-dashboard">📊 Dashboard</li>
            <li class="${activeTab === 'movies' ? 'active' : ''}" id="tab-movies">🎬 Movies</li>
            <li class="${activeTab === 'cinemas' ? 'active' : ''}" id="tab-cinemas">🏛 Cinemas</li>
            <li class="${activeTab === 'rooms' ? 'active' : ''}" id="tab-rooms">🛋 Rooms</li>
            <li class="${activeTab === 'showtimes' ? 'active' : ''}" id="tab-showtimes">📅 Showtimes</li>
            <li class="${activeTab === 'coupons' ? 'active' : ''}" id="tab-coupons">🎟 Coupons</li>
            <li>🎫 Bookings</li>
            <li>💰 Revenue</li>
          </ul>
          <button id="admin-back-btn" class="auth-button" style="margin-top: auto;">Back to Home</button>
        </div>
        <div class="admin-main">
          ${renderMainContent()}
        </div>
      </div>
      ${renderModals()}
    `;

    setupEventListeners();
  }

  function renderMainContent() {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'movies':    return renderMovies();
      case 'cinemas':   return renderCinemas();
      case 'rooms':     return renderRooms();
      case 'showtimes': return renderShowtimes();
      case 'coupons':   return renderCoupons();
      default:          return renderDashboard();
    }
  }

  function renderModals() {
    if (editingMovie || activeTab === 'add-movie') return renderMovieForm();
    if (editingCinema || activeTab === 'add-cinema') return renderCinemaForm();
    if (editingRoom || activeTab === 'add-room') return renderRoomForm();
    if (editingShowtime || activeTab === 'add-showtime') return renderShowtimeForm();
    if (editingCoupon || activeTab === 'add-coupon') return renderCouponForm();
    return '';
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
          <h3>Total Cinemas</h3>
          <p class="stat-value">${cinemas.length}</p>
        </div>
        <div class="stat-card">
          <h3>Total Rooms</h3>
          <p class="stat-value">${rooms.length}</p>
        </div>
        <div class="stat-card">
          <h3>Total Showtimes</h3>
          <p class="stat-value">${showtimes.length}</p>
        </div>
        <div class="stat-card">
          <h3>Active Coupons</h3>
          <p class="stat-value">${coupons.filter(c => c.status === 'active').length}</p>
        </div>
        <div class="stat-card">
          <h3>Total Bookings</h3>
          <p class="stat-value">1,248</p>
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

  function renderCinemas() {
    return `
      <header style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Cinemas Management</h1>
        <button id="add-cinema-btn" class="nav-admin-btn" style="padding: 10px 20px;">+ Add New Cinema</button>
      </header>
      <div class="admin-content-section">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Cinema Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${cinemas.map(c => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.location}</td>
                <td>${c.contact}</td>
                <td>
                  <div class="action-btns">
                    <button class="edit-cinema-btn" data-id="${c.id}">Edit</button>
                    <button class="delete-cinema-btn" data-id="${c.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCinemaForm() {
    const isEditing = !!editingCinema;
    return `
      <div class="modal-overlay">
        <div class="modal-content auth-card">
          <h2>${isEditing ? 'Edit Cinema' : 'Add New Cinema'}</h2>
          <form id="cinema-form">
            <div class="form-group">
              <label for="cinema-name">Cinema Name</label>
              <input type="text" id="cinema-name" value="${isEditing ? editingCinema!.name : ''}" required>
            </div>
            <div class="form-group">
              <label for="cinema-location">Location</label>
              <input type="text" id="cinema-location" value="${isEditing ? editingCinema!.location : ''}" required>
            </div>
            <div class="form-group">
              <label for="cinema-contact">Contact Info</label>
              <input type="text" id="cinema-contact" value="${isEditing ? editingCinema!.contact : ''}" required>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="auth-button">${isEditing ? 'Update' : 'Add'}</button>
              <button type="button" id="cancel-form-btn" class="auth-button" style="background: var(--border); color: var(--text-h);">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function renderRooms() {
    return `
      <header style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Rooms Management</h1>
        <button id="add-room-btn" class="nav-admin-btn" style="padding: 10px 20px;">+ Add New Room</button>
      </header>
      <div class="admin-content-section">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Room Name</th>
              <th>Cinema</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rooms.map(r => `
              <tr>
                <td><strong>${r.name}</strong></td>
                <td>${r.cinemaName}</td>
                <td><span class="badge" style="background:rgba(255,255,255,0.1)">${r.type}</span></td>
                <td>${r.capacity} seats</td>
                <td><span class="badge ${r.status === 'active' ? 'success' : 'pending'}">${r.status}</span></td>
                <td>
                  <div class="action-btns">
                    <button class="edit-room-btn" data-id="${r.id}">Edit</button>
                    <button class="delete-room-btn" data-id="${r.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderRoomForm() {
    const isEditing = !!editingRoom;
    return `
      <div class="modal-overlay">
        <div class="modal-content auth-card">
          <h2>${isEditing ? 'Edit Room' : 'Add New Room'}</h2>
          <form id="room-form">
            <div class="form-group">
              <label for="room-name">Room Name</label>
              <input type="text" id="room-name" value="${isEditing ? editingRoom!.name : ''}" placeholder="e.g. Phòng 01" required>
            </div>
            <div class="form-group">
              <label for="room-cinema">Cinema</label>
              <select id="room-cinema" required>
                ${cinemas.map(c => `
                  <option value="${c.id}" ${isEditing && editingRoom!.cinemaId === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="room-type">Type</label>
                <select id="room-type">
                  <option value="2D" ${isEditing && editingRoom!.type === '2D' ? 'selected' : ''}>2D</option>
                  <option value="3D" ${isEditing && editingRoom!.type === '3D' ? 'selected' : ''}>3D</option>
                  <option value="IMAX" ${isEditing && editingRoom!.type === 'IMAX' ? 'selected' : ''}>IMAX</option>
                  <option value="4DX" ${isEditing && editingRoom!.type === '4DX' ? 'selected' : ''}>4DX</option>
                </select>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="room-capacity">Capacity</label>
                <input type="number" id="room-capacity" value="${isEditing ? editingRoom!.capacity : '100'}" required>
              </div>
            </div>
            <div class="form-group">
              <label for="room-status">Status</label>
              <select id="room-status">
                <option value="active" ${isEditing && editingRoom!.status === 'active' ? 'selected' : ''}>Active</option>
                <option value="maintenance" ${isEditing && editingRoom!.status === 'maintenance' ? 'selected' : ''}>Maintenance</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="auth-button">${isEditing ? 'Update Room' : 'Add Room'}</button>
              <button type="button" id="cancel-form-btn" class="auth-button" style="background: var(--border); color: var(--text-h);">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function renderShowtimes() {
    return `
      <header style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Showtimes Management</h1>
        <button id="add-showtime-btn" class="nav-admin-btn" style="padding: 10px 20px;">+ Add New Showtime</button>
      </header>
      <div class="admin-content-section">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Cinema</th>
              <th>Room</th>
              <th>Date/Time</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${showtimes.map(s => `
              <tr>
                <td><strong>${s.movieTitle}</strong></td>
                <td>${s.cinemaName}</td>
                <td>${s.roomName}</td>
                <td>
                  <div>${s.date}</div>
                  <div style="font-size:12px; opacity:0.7">${s.startTime} (${s.language})</div>
                </td>
                <td>${s.price.toLocaleString('vi-VN')} ₫</td>
                <td>
                  <div class="action-btns">
                    <button class="edit-showtime-btn" data-id="${s.id}">Edit</button>
                    <button class="delete-showtime-btn" data-id="${s.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderShowtimeForm() {
    const isEditing = !!editingShowtime;
    return `
      <div class="modal-overlay">
        <div class="modal-content auth-card" style="max-width: 500px">
          <h2>${isEditing ? 'Edit Showtime' : 'Add New Showtime'}</h2>
          <form id="showtime-form">
            <div class="form-group">
              <label for="st-movie">Movie</label>
              <select id="st-movie" required>
                ${movies.map(m => `
                  <option value="${m.id}" ${isEditing && editingShowtime!.movieId === parseInt(m.id) ? 'selected' : ''}>${m.title}</option>
                `).join('')}
              </select>
            </div>
            
            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="st-cinema">Cinema</label>
                <select id="st-cinema" required>
                  ${cinemas.map(c => `
                    <option value="${c.id}" ${isEditing && editingShowtime!.cinemaId === c.id ? 'selected' : ''}>${c.name}</option>
                  `).join('')}
                </select>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="st-room">Room</label>
                <select id="st-room" required>
                  ${rooms.map(r => `
                    <option value="${r.id}" ${isEditing && editingShowtime!.roomId === r.id ? 'selected' : ''}>${r.name}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="st-date">Date</label>
                <input type="date" id="st-date" value="${isEditing ? editingShowtime!.date : ''}" required>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="st-time">Start Time</label>
                <input type="time" id="st-time" value="${isEditing ? editingShowtime!.startTime : ''}" required>
              </div>
            </div>

            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="st-price">Price (₫)</label>
                <input type="number" id="st-price" value="${isEditing ? editingShowtime!.price : '75000'}" required>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="st-lang">Language</label>
                <select id="st-lang">
                  <option value="Lồng tiếng" ${isEditing && editingShowtime!.language === 'Lồng tiếng' ? 'selected' : ''}>Lồng tiếng</option>
                  <option value="Phụ đề" ${isEditing && editingShowtime!.language === 'Phụ đề' ? 'selected' : ''}>Phụ đề</option>
                </select>
              </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="auth-button">${isEditing ? 'Update Showtime' : 'Add Showtime'}</button>
              <button type="button" id="cancel-form-btn" class="auth-button" style="background: var(--border); color: var(--text-h);">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  function renderCoupons() {
    return `
      <header style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Coupons Management</h1>
        <button id="add-coupon-btn" class="nav-admin-btn" style="padding: 10px 20px;">+ Add New Coupon</button>
      </header>
      <div class="admin-content-section">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Discount Type</th>
              <th>Value</th>
              <th>Min Order</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${coupons.map(c => `
              <tr>
                <td><code style="background:rgba(251,211,141,0.1); color:#fbd38d; padding:2px 6px; border-radius:4px">${c.code}</code></td>
                <td style="font-size:13px">${c.label}</td>
                <td>${c.type === 'percent' ? 'Percentage' : 'Fixed Amount'}</td>
                <td><strong>${c.type === 'percent' ? `${c.value}%` : `${c.value.toLocaleString('vi-VN')} ₫`}</strong></td>
                <td>${c.minOrder > 0 ? `${c.minOrder.toLocaleString('vi-VN')} ₫` : 'No minimum'}</td>
                <td><span class="badge ${c.status === 'active' ? 'success' : 'pending'}">${c.status}</span></td>
                <td>
                  <div class="action-btns">
                    <button class="edit-coupon-btn" data-id="${c.id}">Edit</button>
                    <button class="delete-coupon-btn" data-id="${c.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderCouponForm() {
    const isEditing = !!editingCoupon;
    return `
      <div class="modal-overlay">
        <div class="modal-content auth-card">
          <h2>${isEditing ? 'Edit Coupon' : 'Add New Coupon'}</h2>
          <form id="coupon-form">
            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="cp-code">Coupon Code</label>
                <input type="text" id="cp-code" value="${isEditing ? editingCoupon!.code : ''}" placeholder="e.g. SUMMER20" required>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="cp-status">Status</label>
                <select id="cp-status">
                  <option value="active" ${isEditing && editingCoupon!.status === 'active' ? 'selected' : ''}>Active</option>
                  <option value="expired" ${isEditing && editingCoupon!.status === 'expired' ? 'selected' : ''}>Expired</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="cp-label">Description</label>
              <input type="text" id="cp-label" value="${isEditing ? editingCoupon!.label : ''}" placeholder="e.g. Giảm 20% cho đơn hàng tiếp theo" required>
            </div>

            <div class="form-row" style="display: flex; gap: 15px;">
              <div class="form-group" style="flex: 1;">
                <label for="cp-type">Discount Type</label>
                <select id="cp-type">
                  <option value="percent" ${isEditing && editingCoupon!.type === 'percent' ? 'selected' : ''}>Percentage (%)</option>
                  <option value="fixed" ${isEditing && editingCoupon!.type === 'fixed' ? 'selected' : ''}>Fixed Amount (₫)</option>
                </select>
              </div>
              <div class="form-group" style="flex: 1;">
                <label for="cp-value">Discount Value</label>
                <input type="number" id="cp-value" value="${isEditing ? editingCoupon!.value : ''}" required>
              </div>
            </div>

            <div class="form-group">
              <label for="cp-min-order">Minimum Order Amount (₫)</label>
              <input type="number" id="cp-min-order" value="${isEditing ? editingCoupon!.minOrder : '0'}" required>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
              <button type="submit" class="auth-button">${isEditing ? 'Update Coupon' : 'Add Coupon'}</button>
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

    document.getElementById('tab-cinemas')?.addEventListener('click', () => {
      activeTab = 'cinemas';
      render();
    });

    document.getElementById('tab-rooms')?.addEventListener('click', () => {
      activeTab = 'rooms';
      render();
    });

    document.getElementById('tab-showtimes')?.addEventListener('click', () => {
      activeTab = 'showtimes';
      render();
    });

    document.getElementById('tab-coupons')?.addEventListener('click', () => {
      activeTab = 'coupons';
      render();
    });

    // --- MOVIE ACTIONS ---
    document.getElementById('add-movie-btn')?.addEventListener('click', () => {
      activeTab = 'add-movie';
      editingMovie = null;
      render();
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        editingMovie = movies.find(m => m.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        movies = movies.filter(m => m.id !== id);
        render();
      });
    });

    document.getElementById('movie-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = (document.getElementById('movie-title') as HTMLInputElement).value;
      const genre = (document.getElementById('movie-genre') as HTMLInputElement).value;
      const year = parseInt((document.getElementById('movie-year') as HTMLInputElement).value);
      const duration = (document.getElementById('movie-duration') as HTMLInputElement).value;

      if (editingMovie) {
        const index = movies.findIndex(m => m.id === editingMovie!.id);
        movies[index] = { ...editingMovie, title, genre, year, duration };
      } else {
        movies.push({ id: Math.random().toString(36).substring(2, 9), title, genre, year, duration });
      }
      editingMovie = null;
      activeTab = 'movies';
      render();
    });

    // --- CINEMA ACTIONS ---
    document.getElementById('add-cinema-btn')?.addEventListener('click', () => {
      activeTab = 'add-cinema';
      editingCinema = null;
      render();
    });

    document.querySelectorAll('.edit-cinema-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        editingCinema = cinemas.find(c => c.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-cinema-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const index = cinemas.findIndex(c => c.id === id);
        if (index !== -1) cinemas.splice(index, 1);
        render();
      });
    });

    document.getElementById('cinema-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('cinema-name') as HTMLInputElement).value;
      const location = (document.getElementById('cinema-location') as HTMLInputElement).value;
      const contact = (document.getElementById('cinema-contact') as HTMLInputElement).value;

      if (editingCinema) {
        const index = cinemas.findIndex(c => c.id === editingCinema!.id);
        cinemas[index] = { ...editingCinema, name, location, contact };
      } else {
        cinemas.push({ id: 'c' + (cinemas.length + 1), name, location, contact, image: '' });
      }
      editingCinema = null;
      activeTab = 'cinemas';
      render();
    });

    // --- ROOM ACTIONS ---
    document.getElementById('add-room-btn')?.addEventListener('click', () => {
      activeTab = 'add-room';
      editingRoom = null;
      render();
    });

    document.querySelectorAll('.edit-room-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        editingRoom = rooms.find(r => r.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-room-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const index = rooms.findIndex(r => r.id === id);
        if (index !== -1) rooms.splice(index, 1);
        render();
      });
    });

    document.getElementById('room-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (document.getElementById('room-name') as HTMLInputElement).value;
      const cinemaId = (document.getElementById('room-cinema') as HTMLSelectElement).value;
      const type = (document.getElementById('room-type') as HTMLSelectElement).value as any;
      const capacity = parseInt((document.getElementById('room-capacity') as HTMLInputElement).value);
      const status = (document.getElementById('room-status') as HTMLSelectElement).value as any;
      const cinemaName = cinemas.find(c => c.id === cinemaId)?.name || 'Unknown';

      if (editingRoom) {
        const index = rooms.findIndex(r => r.id === editingRoom!.id);
        rooms[index] = { ...editingRoom, name, cinemaId, cinemaName, type, capacity, status };
      } else {
        rooms.push({ id: 'r' + (rooms.length + 1), name, cinemaId, cinemaName, type, capacity, status });
      }
      editingRoom = null;
      activeTab = 'rooms';
      render();
    });

    // --- SHOWTIME ACTIONS ---
    document.getElementById('add-showtime-btn')?.addEventListener('click', () => {
      activeTab = 'add-showtime';
      editingShowtime = null;
      render();
    });

    document.querySelectorAll('.edit-showtime-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        editingShowtime = showtimes.find(s => s.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-showtime-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const index = showtimes.findIndex(s => s.id === id);
        if (index !== -1) showtimes.splice(index, 1);
        render();
      });
    });

    document.getElementById('showtime-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const movieId = parseInt((document.getElementById('st-movie') as HTMLSelectElement).value);
      const cinemaId = (document.getElementById('st-cinema') as HTMLSelectElement).value;
      const roomId = (document.getElementById('st-room') as HTMLSelectElement).value;
      const date = (document.getElementById('st-date') as HTMLInputElement).value;
      const startTime = (document.getElementById('st-time') as HTMLInputElement).value;
      const price = parseInt((document.getElementById('st-price') as HTMLInputElement).value);
      const language = (document.getElementById('st-lang') as HTMLSelectElement).value;

      const movieTitle = movies.find(m => parseInt(m.id) === movieId)?.title || 'Unknown';
      const cinemaName = cinemas.find(c => c.id === cinemaId)?.name || 'Unknown';
      const roomName   = rooms.find(r => r.id === roomId)?.name || 'Unknown';

      if (editingShowtime) {
        const index = showtimes.findIndex(s => s.id === editingShowtime!.id);
        showtimes[index] = { ...editingShowtime, movieId, movieTitle, cinemaId, cinemaName, roomId, roomName, date, startTime, price, language };
      } else {
        showtimes.push({ id: 's' + (showtimes.length + 1), movieId, movieTitle, cinemaId, cinemaName, roomId, roomName, date, startTime, price, language });
      }
      editingShowtime = null;
      activeTab = 'showtimes';
      render();
    });

    // --- COUPON ACTIONS ---
    document.getElementById('add-coupon-btn')?.addEventListener('click', () => {
      activeTab = 'add-coupon';
      editingCoupon = null;
      render();
    });

    document.querySelectorAll('.edit-coupon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        editingCoupon = coupons.find(c => c.id === id) || null;
        render();
      });
    });

    document.querySelectorAll('.delete-coupon-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        const index = coupons.findIndex(c => c.id === id);
        if (index !== -1) coupons.splice(index, 1);
        render();
      });
    });

    document.getElementById('coupon-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = (document.getElementById('cp-code') as HTMLInputElement).value.toUpperCase();
      const label = (document.getElementById('cp-label') as HTMLInputElement).value;
      const type = (document.getElementById('cp-type') as HTMLSelectElement).value as any;
      const value = parseInt((document.getElementById('cp-value') as HTMLInputElement).value);
      const minOrder = parseInt((document.getElementById('cp-min-order') as HTMLInputElement).value);
      const status = (document.getElementById('cp-status') as HTMLSelectElement).value as any;

      if (editingCoupon) {
        const index = coupons.findIndex(c => c.id === editingCoupon!.id);
        coupons[index] = { ...editingCoupon, code, label, type, value, minOrder, status };
      } else {
        coupons.push({ id: 'cp' + (coupons.length + 1), code, label, type, value, minOrder, status });
      }
      editingCoupon = null;
      activeTab = 'coupons';
      render();
    });

    // --- SHARED ---
    document.getElementById('cancel-form-btn')?.addEventListener('click', () => {
      activeTab = activeTab.replace('add-', '').replace('edit-', ''); // simplified
      if (activeTab === 'movie') activeTab = 'movies';
      if (activeTab === 'cinema') activeTab = 'cinemas';
      if (activeTab === 'room') activeTab = 'rooms';
      if (activeTab === 'showtime') activeTab = 'showtimes';
      if (activeTab === 'coupon') activeTab = 'coupons';

      editingMovie = null;
      editingCinema = null;
      editingRoom = null;
      editingShowtime = null;
      editingCoupon = null;
      render();
    });
  }

  render();
}
