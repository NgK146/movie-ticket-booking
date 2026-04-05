export function renderAdminDashboard(container: HTMLElement, onBack: () => void) {
  container.innerHTML = `
    <div class="admin-container">
      <div class="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li class="active">Dashboard</li>
          <li>Movies Management</li>
          <li>User Bookings</li>
          <li>Revenue Reports</li>
        </ul>
        <button id="admin-back-btn" class="auth-button" style="margin-top: auto;">Back to Home</button>
      </div>
      <div class="admin-main">
        <header>
          <h1>Overview Statistics</h1>
        </header>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>Total Movies</h3>
            <p class="stat-value">24</p>
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
      </div>
    </div>
  `;

  document.getElementById('admin-back-btn')?.addEventListener('click', onBack);
}
