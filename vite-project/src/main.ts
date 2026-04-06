import './style.css'
import { renderQRToCanvas, downloadQR, type TicketData } from './qr.service'
import { renderAdminDashboard } from './admin'
import * as Auth from './auth'

// =========================================
// UI HELPERS
// =========================================
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <div class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</div>
    <div class="toast-content">${message}</div>
    <button class="toast-close">✕</button>
  `
  container.appendChild(toast)

  const remove = () => {
    toast.classList.add('out')
    setTimeout(() => toast.remove(), 400)
  }

  toast.querySelector('.toast-close')?.addEventListener('click', remove)
  setTimeout(remove, 4500)
}
interface Movie {
  id: number
  title: string
  originalTitle: string
  poster: string
  genres: string[]
  rating: number
  duration: string
  ageRating: string
  badge?: 'hot' | 'new' | 'exclusive' | '4dx'
  description: string
  director: string
  cast: string[]
  releaseDate?: string
  interestPercent?: number
  daysUntil?: number
  language: string
}

const nowShowingMovies: Movie[] = [
  {
    id: 1,
    title: 'Địa Ngục Trần Gian',
    originalTitle: 'Hell on Earth',
    poster: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop&q=80',
    genres: ['Hành Động', 'Kinh Dị'],
    rating: 8.4,
    duration: '2g 18p',
    ageRating: 'C16',
    badge: 'hot',
    language: 'Lồng tiếng',
    description: 'Một hành trình sinh tồn trong thế giới hậu tận thế đầy ám ảnh và hồi hộp.',
    director: 'Park Chan-wook',
    cast: ['Park Seo-jun', 'Song Hye-kyo', 'Lee Jung-jae'],
  },
  {
    id: 2,
    title: 'Ánh Sáng Cuối Đường',
    originalTitle: 'Light at the End',
    poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop&q=80',
    genres: ['Tâm Lý', 'Lãng Mạn'],
    rating: 7.9,
    duration: '2g 05p',
    ageRating: 'P',
    badge: 'new',
    language: 'Phụ đề',
    description: 'Câu chuyện tình yêu vượt qua mọi ranh giới không gian và thời gian.',
    director: 'Nguyễn Quang Dũng',
    cast: ['Kaity Nguyễn', 'Will', 'Jun Phạm'],
  },
  {
    id: 3,
    title: 'Quái Vật Đại Dương',
    originalTitle: 'Ocean Monster',
    poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop&q=80',
    genres: ['Viễn Tưởng', 'Phiêu Lưu'],
    rating: 8.1,
    duration: '2g 32p',
    ageRating: 'C13',
    badge: 'exclusive',
    language: 'Lồng tiếng',
    description: 'Khi những sinh vật cổ đại trỗi dậy từ lòng đại dương, nhân loại phải đối mặt với thử thách khốc liệt nhất.',
    director: 'James Cameron Jr.',
    cast: ['Dwayne Johnson', 'Zendaya', 'Chris Evans'],
  },
  {
    id: 4,
    title: 'Bóng Tối Thành Phố',
    originalTitle: 'City Shadows',
    poster: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=400&h=600&fit=crop&q=80',
    genres: ['Tội Phạm', 'Ly Kỳ'],
    rating: 8.7,
    duration: '2g 45p',
    ageRating: 'C18',
    badge: '4dx',
    language: 'Phụ đề',
    description: 'Thám tử Minh truy đuổi một kẻ sát nhân bí ẩn ẩn náu trong bóng tối của thành phố không ngủ.',
    director: 'Lý Hải',
    cast: ['Lý Hải', 'Minh Hà', 'Thái Hòa'],
  },
  {
    id: 5,
    title: 'Ngàn Năm Chờ Đợi',
    originalTitle: 'A Thousand Years',
    poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&q=80',
    genres: ['Cổ Trang', 'Lãng Mạn'],
    rating: 7.6,
    duration: '2g 12p',
    ageRating: 'P',
    badge: 'new',
    language: 'Phụ đề',
    description: 'Một tình yêu xuyên thời đại, từ triều đại phong kiến đến hiện đại.',
    director: 'Victor Vũ',
    cast: ['Khả Ngân', 'Trương Thế Vinh', 'Hứa Vĩ Văn'],
  },
  {
    id: 6,
    title: 'Thunder Force: Reborn',
    originalTitle: 'Thunder Force: Reborn',
    poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop&q=80',
    genres: ['Siêu Anh Hùng', 'Hành Động'],
    rating: 8.2,
    duration: '2g 28p',
    ageRating: 'C13',
    badge: 'hot',
    language: 'Lồng tiếng',
    description: 'Đội siêu anh hùng trở lại với sức mạnh vượt trội để bảo vệ thế giới khỏi thế lực đen tối mới.',
    director: 'Kevin Feige',
    cast: ['Robert Downey Jr.', 'Scarlett Johansson', 'Tom Holland'],
  },
  {
    id: 7,
    title: 'Mê Cung Ký Ức',
    originalTitle: 'Memory Maze',
    poster: 'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=400&h=600&fit=crop&q=80',
    genres: ['Khoa Học', 'Hồi Hộp'],
    rating: 7.8,
    duration: '1g 58p',
    ageRating: 'C13',
    language: 'Phụ đề',
    description: 'Khi công nghệ đọc ký ức trở thành vũ khí, ranh giới giữa thực và ảo tan biến.',
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Florence Pugh', 'Andrew Scott'],
  },
  {
    id: 8,
    title: 'Mùa Hè Rực Rỡ',
    originalTitle: 'Blazing Summer',
    poster: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=400&h=600&fit=crop&q=80',
    genres: ['Hài Hước', 'Gia Đình'],
    rating: 7.3,
    duration: '1g 45p',
    ageRating: 'P',
    badge: 'new',
    language: 'Lồng tiếng',
    description: 'Một mùa hè tràn đầy tiếng cười và những bài học quý giá về tình thân.',
    director: 'Trấn Thành',
    cast: ['Trấn Thành', 'Hari Won', 'BB Trần'],
  }
]

const comingSoonMovies: Movie[] = [
  {
    id: 101,
    title: 'Trận Chiến Vũ Trụ 2',
    originalTitle: 'Space Battle 2: Infinite War',
    poster: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=560&h=400&fit=crop&q=80',
    genres: ['Viễn Tưởng', 'Hành Động', 'Phiêu Lưu'],
    rating: 0,
    duration: '2g 45p',
    ageRating: 'C13',
    language: 'Lồng tiếng',
    description: 'Cuộc chiến không gian vĩ đại nhất trong lịch sử điện ảnh. Vận mệnh của vũ trụ nằm trong tay một nhóm anh hùng bất đắc dĩ.',
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Oscar Isaac'],
    releaseDate: '02/05/2025',
    interestPercent: 94,
    daysUntil: 27,
  },
  {
    id: 102,
    title: 'Huyết Thống Rồng',
    originalTitle: 'Dragon Bloodline',
    poster: 'https://images.unsplash.com/photo-1597002973885-8c90683fa6e3?w=560&h=400&fit=crop&q=80',
    genres: ['Cổ Trang', 'Kỳ Ảo', 'Hành Động'],
    rating: 0,
    duration: '3g 02p',
    ageRating: 'C16',
    language: 'Phụ đề',
    description: 'Huyền thoại về dòng dõi rồng thức tỉnh trong thế giới hiện đại. Một cuộc đối đầu định mệnh giữa ánh sáng và bóng tối.',
    director: 'Yuen Woo-ping',
    cast: ['Lý Liên Kiệt', 'Thành Long', 'Chương Tử Di'],
    releaseDate: '16/05/2025',
    interestPercent: 87,
    daysUntil: 41,
  },
  {
    id: 103,
    title: 'Bí Mật Đại Gia',
    originalTitle: 'The Hidden Rich',
    poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=560&h=400&fit=crop&q=80',
    genres: ['Hài Hước', 'Tình Cảm'],
    rating: 0,
    duration: '1g 55p',
    ageRating: 'P',
    language: 'Lồng tiếng',
    description: 'Khi bí mật của gia đình tỷ phú bị phơi bày, cuộc sống của tất cả mọi người đảo lộn theo những cách không ai ngờ tới.',
    director: 'Ngô Thanh Vân',
    cast: ['Ngô Thanh Vân', 'S.T Sơn Thạch', 'Diệu Nhi'],
    releaseDate: '30/05/2025',
    interestPercent: 72,
    daysUntil: 55,
  },
  {
    id: 104,
    title: 'Đêm Trước Tận Thế',
    originalTitle: 'Eve of Apocalypse',
    poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=560&h=400&fit=crop&q=80',
    genres: ['Kinh Dị', 'Hồi Hộp', 'Khoa Học'],
    rating: 0,
    duration: '2g 15p',
    ageRating: 'C18',
    language: 'Phụ đề',
    description: 'Khi dịch bệnh bí ẩn lan rộng, một nhóm nhỏ sống sót phải chiến đấu không chỉ với bên ngoài mà với cả chính bản thân mình.',
    director: 'Jordan Peele',
    cast: ['Daniel Kaluuya', 'Lupita Nyong\'o', 'Keke Palmer'],
    releaseDate: '13/06/2025',
    interestPercent: 89,
    daysUntil: 69,
  },
  {
    id: 105,
    title: 'Cánh Cửa Bí Mật',
    originalTitle: 'The Secret Door',
    poster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=560&h=400&fit=crop&q=80',
    genres: ['Phiêu Lưu', 'Gia Đình', 'Hoạt Hình'],
    rating: 0,
    duration: '1g 42p',
    ageRating: 'P',
    language: 'Lồng tiếng',
    description: 'Ba đứa trẻ khám phá cánh cửa dẫn đến thế giới kỳ diệu đầy màu sắc, nơi mọi giấc mơ đều trở thành hiện thực.',
    director: 'Pixar Animation',
    cast: ['Tom Hanks (lồng tiếng)', 'Emma Thompson (lồng tiếng)'],
    releaseDate: '20/06/2025',
    interestPercent: 78,
    daysUntil: 76,
  },
  {
    id: 106,
    title: 'Kẻ Săn Bóng Tối',
    originalTitle: 'Shadow Hunter',
    poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=560&h=400&fit=crop&q=80',
    genres: ['Hành Động', 'Tội Phạm', 'Ly Kỳ'],
    rating: 0,
    duration: '2g 08p',
    ageRating: 'C18',
    language: 'Phụ đề',
    description: 'Một thám tử cảnh sát mang bóng tối trong lòng phải đối mặt với kẻ thù nguy hiểm nhất trong cuộc đời - chính bản thân mình.',
    director: 'David Fincher',
    cast: ['Michael Fassbender', 'Rooney Mara', 'Trent Reznor'],
    releaseDate: '04/07/2025',
    interestPercent: 83,
    daysUntil: 90,
  }
]

const featuredMovie: Movie = nowShowingMovies[0]

// =========================================
// HELPER FUNCTIONS
// =========================================
function getBadgeHTML(badge?: Movie['badge']): string {
  if (!badge) return ''
  const labels: Record<string, string> = {
    hot: '🔥 HOT',
    new: '✨ MỚI',
    exclusive: '👑 ĐỘC QUYỀN',
    '4dx': '⚡ 4DX'
  }
  return `<span class="movie-badge badge-${badge}">${labels[badge]}</span>`
}

function getStarsHTML(rating: number): string {
  const stars = Math.round(rating / 2)
  let html = ''
  for (let i = 1; i <= 5; i++) {
    if (i <= stars) html += '<span class="star">★</span>'
    else if (i - stars === 1 && rating % 2 >= 0.5) html += '<span class="star half">★</span>'
    else html += '<span class="star" style="opacity:0.2">★</span>'
  }
  return html
}

function getCountdownHTML(days: number): string {
  const weeks = Math.floor(days / 7)
  const remainDays = days % 7
  return `
    <div class="countdown-unit">
      <span class="countdown-value">${weeks.toString().padStart(2, '0')}</span>
      <span class="countdown-unit-label">Tuần</span>
    </div>
    <span class="countdown-sep">:</span>
    <div class="countdown-unit">
      <span class="countdown-value">${remainDays.toString().padStart(2, '0')}</span>
      <span class="countdown-unit-label">Ngày</span>
    </div>
  `
}

function getGenreTagsHTML(genres: string[]): string {
  return genres.slice(0, 2).map(g => `<span class="genre-tag">${g}</span>`).join('')
}

// =========================================
// RENDER FUNCTIONS
// =========================================
function renderNowShowingCard(movie: Movie): string {
  return `
    <div class="movie-card fade-in" data-movie-id="${movie.id}" tabindex="0" role="button" aria-label="Xem chi tiết phim ${movie.title}">
      <div class="movie-poster">
        <img
          src="${movie.poster}"
          alt="${movie.title}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop&q=80'"
        />
        <div class="movie-poster-overlay">
          <div class="play-btn" aria-label="Xem trailer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </div>
        </div>
        ${getBadgeHTML(movie.badge)}
        <div class="movie-rating-badge">
          <span>★</span>
          <span>${movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-genre">
          ${getGenreTagsHTML(movie.genres)}
        </div>
        <div class="movie-meta">
          <span class="movie-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
            </svg>
            ${movie.duration}
          </span>
          <span class="movie-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect width="20" height="14" x="2" y="5" rx="2"/><path d="m2 10 20 0"/>
            </svg>
            ${movie.ageRating}
          </span>
          <span class="movie-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            ${movie.language}
          </span>
        </div>
        <button class="btn-book" id="book-${movie.id}" onclick="handleBooking(${movie.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="m15 5 4 4-4 4"/><path d="M4 9h15"/><path d="m9 19-4-4 4-4"/><path d="M20 15H5"/>
          </svg>
          Đặt Vé Ngay
        </button>
      </div>
    </div>
  `
}

function renderComingSoonCard(movie: Movie): string {
  return `
    <div class="coming-card fade-in" data-movie-id="${movie.id}">
      <div class="coming-poster">
        <img
          src="${movie.poster}"
          alt="${movie.title}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=560&h=400&fit=crop&q=80'"
        />
        <div class="coming-poster-overlay"></div>
        <div class="countdown-badge">
          <div>
            <div class="countdown-label">Còn lại</div>
            <div class="countdown-timer">
              ${getCountdownHTML(movie.daysUntil!)}
            </div>
          </div>
          <button class="notify-btn" id="notify-${movie.id}" onclick="handleNotify(${movie.id}, this)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Nhắc tôi
          </button>
        </div>
      </div>
      <div class="coming-info">
        <h3 class="coming-title">${movie.title}</h3>
        <p class="coming-original">${movie.originalTitle}</p>
        <div class="coming-genre">
          ${getGenreTagsHTML(movie.genres)}
        </div>
        <div class="coming-meta">
          <span class="coming-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
            </svg>
            ${movie.duration}
          </span>
          <span class="coming-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            ${movie.cast.slice(0, 2).join(', ')}
          </span>
        </div>
        <div class="release-date-highlight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>
          </svg>
          Khởi chiếu: <strong>${movie.releaseDate}</strong>
        </div>
        <div class="interest-bar">
          <div class="interest-label">
            <span>Mức độ quan tâm</span>
            <span>${movie.interestPercent}%</span>
          </div>
          <div class="interest-track">
            <div class="interest-fill" style="width: ${movie.interestPercent}%"></div>
          </div>
        </div>
      </div>
    </div>
  `
}

function renderFeaturedMovie(movie: Movie): string {
  return `
    <div class="featured-card">
      <div class="featured-poster">
        <img
          src="${movie.poster}"
          alt="${movie.title}"
          onerror="this.src='https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400&h=600&fit=crop&q=80'"
        />
        <div class="featured-rank">#1</div>
      </div>
      <div class="featured-content">
        <div class="featured-eyebrow">
          ⭐ Phim Xuất Sắc Nhất Tuần
        </div>
        <h2 class="featured-title">${movie.title}</h2>
        <p class="featured-original-title">${movie.originalTitle}</p>
        <div class="featured-rating-row">
          <div class="rating-stars">
            ${getStarsHTML(movie.rating)}
          </div>
          <span class="rating-score">${movie.rating.toFixed(1)}</span>
          <span class="rating-count">/ 10.0 · 12.4K đánh giá</span>
        </div>
        <div class="featured-tags">
          ${movie.genres.map(g => `<span class="featured-tag">${g}</span>`).join('')}
          <span class="featured-tag">⏱ ${movie.duration}</span>
          <span class="featured-tag">🔞 ${movie.ageRating}</span>
          <span class="featured-tag">🎬 ${movie.director}</span>
        </div>
        <p class="featured-description">${movie.description}</p>
        <div class="featured-actions">
          <button class="btn-featured-book" id="featured-book-${movie.id}" onclick="handleBooking(${movie.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="m15 5 4 4-4 4"/><path d="M4 9h15"/><path d="m9 19-4-4 4-4"/><path d="M20 15H5"/>
            </svg>
            Đặt Vé Ngay
          </button>
          <button class="btn-trailer" id="trailer-${movie.id}" onclick="handleTrailer(${movie.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Xem Trailer
          </button>
          <button class="btn-wishlist" id="wishlist-${movie.id}" title="Yêu thích" onclick="handleWishlist(${movie.id}, this)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `
}

// =========================================
// MAIN APP HTML
// =========================================
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- TOAST CONTAINER -->
  <div class="toast-container" id="toast-container" aria-live="polite"></div>

  <!-- NAVBAR -->
  <nav class="navbar" id="navbar" role="navigation" aria-label="Navigation chính">
    <div class="navbar-inner">
      <a href="#" class="navbar-logo" aria-label="CineBooking - Trang chủ">
        <div class="logo-icon">🎬</div>
        <span class="logo-text">CineBooking</span>
      </a>

      <ul class="navbar-nav" role="list">
        <li><a href="#now-showing" class="active">Đang Chiếu</a></li>
        <li><a href="#coming-soon">
          Sắp Chiếu
          <span class="nav-badge">NEW</span>
        </a></li>
        <li><a href="#cinemas">Cụm Rạp</a></li>
        <li><a href="#promotions">Khuyến Mãi</a></li>
        <li><a href="#members">Thành Viên</a></li>
        <li><a href="#history" id="nav-history-btn">Lịch Sử</a></li>
        <li><a href="#admin" id="nav-admin-btn" style="color: #fbd38d;">Quản Lý</a></li>
      </ul>

      <div class="navbar-right">
        <button class="search-btn" id="search-btn" aria-label="Tìm kiếm phim">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="search-text">Tìm phim...</span>
        </button>
        
        ${Auth.getCurrentUser() ? `
          <div class="user-profile-nav" id="nav-user-profile">
            <div class="user-avatar-sm">
              <img src="${Auth.getCurrentUser()?.avatar || 'https://i.pravatar.cc/100'}" alt="Avatar">
            </div>
            <div class="user-nav-info">
              <span class="user-nav-name">${Auth.getCurrentUser()?.name.split(' ')[0]}</span>
              <span class="user-nav-tier" style="color: ${Auth.getTierBadgeColor(Auth.getCurrentUser()!.tier)}">${Auth.getCurrentUser()?.tier}</span>
            </div>
          </div>
        ` : `
          <a href="#auth" class="btn-primary" id="nav-login-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            Đăng Nhập
          </a>
        `}
        
        <button class="hamburger" id="hamburger-btn" aria-label="Mở menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- HERO SECTION -->
  <section class="hero" id="home" aria-label="Trang chủ CineBooking">
    <div class="hero-bg-effects">
      <div class="hero-orb hero-orb-1"></div>
      <div class="hero-orb hero-orb-2"></div>
      <div class="hero-orb hero-orb-3"></div>
      <div class="film-strip-bg"></div>
    </div>

    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="dot"></span>
        Trải Nghiệm Điện Ảnh Đỉnh Cao
      </div>
      <h1 class="hero-title">
        Đặt Vé <span class="highlight">Siêu Tốc</span>,<br/>
        Xem Phim Siêu Hay
      </h1>
      <p class="hero-subtitle">
        Hàng trăm rạp chiếu phim trên toàn quốc. Đặt vé chỉ trong 60 giây.
        Trải nghiệm điện ảnh hoàn toàn mới với CineBooking.
      </p>
      <div class="hero-actions">
        <a href="#now-showing" class="btn-hero-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          Đặt Vé Ngay
        </a>
        <a href="#coming-soon" class="btn-hero-secondary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
          </svg>
          Xem Sắp Chiếu
        </a>
      </div>
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hero-stat-number">150+</div>
          <div class="hero-stat-label">Cụm Rạp</div>
        </div>
        <div class="hero-divider"></div>
        <div class="hero-stat">
          <div class="hero-stat-number">500+</div>
          <div class="hero-stat-label">Phim Mỗi Năm</div>
        </div>
        <div class="hero-divider"></div>
        <div class="hero-stat">
          <div class="hero-stat-number">2M+</div>
          <div class="hero-stat-label">Vé Đã Bán</div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==========================================
       NOW SHOWING SECTION
       ========================================== -->
  <section class="section now-showing-section" id="now-showing" aria-label="Phim đang chiếu">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-label">
            <div class="label-bar"></div>
            Đang Chiếu
          </div>
          <h2 class="section-title">Phim Đang Chiếu</h2>
          <p class="section-subtitle">Cập nhật những bộ phim đang được chiếu tại các cụm rạp</p>
        </div>
        <a href="#" class="btn-view-all" id="view-all-now-showing">
          Xem Tất Cả
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14m-7-7 7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Cinema selection -->
      <div class="cinema-row" role="list" aria-label="Chọn cụm rạp">
        <button class="cinema-chip active" data-cinema="all" onclick="filterCinema('all', this)">
          <span class="chip-icon">🎬</span> Tất Cả Rạp
        </button>
        <button class="cinema-chip" data-cinema="cgv" onclick="filterCinema('cgv', this)">
          <span class="chip-icon">🎭</span> CGV
        </button>
        <button class="cinema-chip" data-cinema="lotte" onclick="filterCinema('lotte', this)">
          <span class="chip-icon">🏛</span> Lotte Cinema
        </button>
        <button class="cinema-chip" data-cinema="bhd" onclick="filterCinema('bhd', this)">
          <span class="chip-icon">⭐</span> BHD Star
        </button>
        <button class="cinema-chip" data-cinema="beta" onclick="filterCinema('beta', this)">
          <span class="chip-icon">🎪</span> Beta Cinemas
        </button>
        <button class="cinema-chip" data-cinema="galaxy" onclick="filterCinema('galaxy', this)">
          <span class="chip-icon">🌟</span> Galaxy Cinema
        </button>
        <button class="cinema-chip" data-cinema="cinestar" onclick="filterCinema('cinestar', this)">
          <span class="chip-icon">✨</span> Cinestar
        </button>
      </div>

      <!-- Genre filter -->
      <div class="filter-tabs" role="tablist" aria-label="Lọc theo thể loại">
        <button class="filter-tab active" data-genre="all" role="tab" onclick="filterGenre('all', this)">Tất cả</button>
        <button class="filter-tab" data-genre="action" role="tab" onclick="filterGenre('action', this)">Hành Động</button>
        <button class="filter-tab" data-genre="romance" role="tab" onclick="filterGenre('romance', this)">Tình Cảm</button>
        <button class="filter-tab" data-genre="horror" role="tab" onclick="filterGenre('horror', this)">Kinh Dị</button>
        <button class="filter-tab" data-genre="comedy" role="tab" onclick="filterGenre('comedy', this)">Hài Hước</button>
        <button class="filter-tab" data-genre="scifi" role="tab" onclick="filterGenre('scifi', this)">Viễn Tưởng</button>
        <button class="filter-tab" data-genre="animation" role="tab" onclick="filterGenre('animation', this)">Hoạt Hình</button>
      </div>

      <!-- Movies grid -->
      <div class="movies-grid" id="now-showing-grid" role="list" aria-label="Danh sách phim đang chiếu">
        ${nowShowingMovies.map(m => renderNowShowingCard(m)).join('')}
      </div>
    </div>
  </section>

  <div class="section-sep"></div>

  <!-- ==========================================
       FEATURED MOVIE SECTION
       ========================================== -->
  <section class="section featured-section" id="featured" aria-label="Phim nổi bật">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-label">
            <div class="label-bar"></div>
            Nổi Bật
          </div>
          <h2 class="section-title">Phim Xuất Sắc Nhất</h2>
          <p class="section-subtitle">Được đánh giá cao nhất từ cộng đồng CineBooking</p>
        </div>
      </div>
      <div id="featured-movie-container">
        ${renderFeaturedMovie(featuredMovie)}
      </div>
    </div>
  </section>

  <div class="section-sep"></div>

  <!-- ==========================================
       COMING SOON SECTION
       ========================================== -->
  <section class="section coming-soon-section" id="coming-soon" aria-label="Phim sắp chiếu">
    <div class="section-inner">
      <div class="section-header">
        <div class="section-title-group">
          <div class="section-label">
            <div class="label-bar" style="background: linear-gradient(135deg, #7c3aed, #4f46e5)"></div>
            <span style="color: #a78bfa">Sắp Chiếu</span>
          </div>
          <h2 class="section-title">Phim Sắp Chiếu</h2>
          <p class="section-subtitle">Đăng ký nhận thông báo để không bỏ lỡ những bộ phim bom tấn</p>
        </div>
        <a href="#" class="btn-view-all" id="view-all-coming-soon" style="color: #a78bfa; border-color: rgba(124,58,237,0.35)">
          Xem Tất Cả
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14m-7-7 7 7-7 7"/>
          </svg>
        </a>
      </div>

      <!-- Coming soon genre filter -->
      <div class="filter-tabs" role="tablist" aria-label="Lọc phim sắp chiếu">
        <button class="filter-tab active" style="background: linear-gradient(135deg, #7c3aed, #4f46e5); border-color: transparent; box-shadow: 0 4px 15px rgba(124,58,237,0.35)">Tất cả</button>
        <button class="filter-tab">Tháng 5</button>
        <button class="filter-tab">Tháng 6</button>
        <button class="filter-tab">Tháng 7</button>
        <button class="filter-tab">Hành Động</button>
        <button class="filter-tab">Viễn Tưởng</button>
      </div>

      <!-- Coming soon grid -->
      <div class="coming-soon-grid" id="coming-soon-grid" role="list" aria-label="Danh sách phim sắp chiếu">
        ${comingSoonMovies.map(m => renderComingSoonCard(m)).join('')}
      </div>
    </div>
  </section>

  <!-- ==========================================
       FOOTER
       ========================================== -->
  <footer class="footer" role="contentinfo">
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#" class="footer-logo">
            <div class="logo-icon">🎬</div>
            <span class="logo-text">CineBooking</span>
          </a>
          <p class="footer-desc">
            Nền tảng đặt vé xem phim trực tuyến hàng đầu Việt Nam. Kết nối hơn 150 cụm rạp với triệu khán giả yêu điện ảnh.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.57 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="TikTok">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.3 6.3 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.13a8.14 8.14 0 0 0 4.77 1.52V7.21a4.85 4.85 0 0 1-1-.52z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="footer-col-title">Phim</h3>
          <ul class="footer-links">
            <li><a href="#now-showing">→ Đang Chiếu</a></li>
            <li><a href="#coming-soon">→ Sắp Chiếu</a></li>
            <li><a href="#">→ Suất Chiếu Đặc Biệt</a></li>
            <li><a href="#">→ Phim Hay Nhất</a></li>
            <li><a href="#">→ Trailer</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-col-title">Hỗ Trợ</h3>
          <ul class="footer-links">
            <li><a href="#">→ Câu Hỏi Thường Gặp</a></li>
            <li><a href="#">→ Hướng Dẫn Đặt Vé</a></li>
            <li><a href="#">→ Liên Hệ</a></li>
            <li><a href="#">→ Báo Lỗi</a></li>
            <li><a href="#">→ Chính Sách</a></li>
          </ul>
        </div>

        <div>
          <h3 class="footer-col-title">Tiện Ích</h3>
          <ul class="footer-links">
            <li><a href="#">→ Tải App iOS</a></li>
            <li><a href="#">→ Tải App Android</a></li>
            <li><a href="#">→ Thẻ Quà Tặng</a></li>
            <li><a href="#">→ Chương Trình VIP</a></li>
            <li><a href="#">→ Đối Tác</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copy">
          © 2025 <span>CineBooking</span>. Được tạo với ❤️ tại Việt Nam.
        </p>
        <div class="footer-bottom-links">
          <a href="#">Điều Khoản Dịch Vụ</a>
          <a href="#">Chính Sách Bảo Mật</a>
          <a href="#">Cookie</a>
        </div>
      </div>
    </div>
  </footer>
`

// =========================================
// INTERACTION HANDLERS
// =========================================

// Declare global functions for inline handlers
declare global {
  interface Window {
    handleBooking: (movieId: number) => void
    handleTrailer: (movieId: number) => void
    handleWishlist: (movieId: number, btn: HTMLElement) => void
    handleNotify: (movieId: number, btn: HTMLElement) => void
    filterGenre: (genre: string, btn: HTMLElement) => void
    filterCinema: (cinema: string, btn: HTMLElement) => void
    showToast: (message: string, type: 'success' | 'error' | 'info') => void
    closeHistoryModal: () => void
    viewTicketFromHistory: (index: number) => void
  }
}

// Toast notifications (global assignment)
window.showToast = showToast
window.showToast = showToast

// Booking handler
window.handleBooking = (movieId: number) => {
  openSeatModal(movieId)
}

// Trailer handler
window.handleTrailer = (movieId: number) => {
  const movie = nowShowingMovies.find(m => m.id === movieId)
  showToast(`🎬 Đang tải trailer "${movie?.title}"...`, 'info')
}

// Wishlist handler
window.handleWishlist = (_movieId: number, btn: HTMLElement) => {
  const isLiked = btn.classList.toggle('liked')
  btn.style.background = isLiked ? 'rgba(255, 61, 90, 0.15)' : ''
  btn.style.borderColor = isLiked ? 'rgba(255, 61, 90, 0.5)' : ''
  btn.style.color = isLiked ? 'var(--accent-red)' : ''

  if (isLiked) {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    showToast('❤️ Đã thêm vào danh sách yêu thích!', 'success')
  } else {
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    showToast('💔 Đã bỏ khỏi danh sách yêu thích', 'info')
  }
}

// Notify handler
window.handleNotify = (movieId: number, btn: HTMLElement) => {
  const movie = comingSoonMovies.find(m => m.id === movieId)
  const isNotified = btn.classList.toggle('notified')

  if (isNotified) {
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg> Đã đăng ký`
    showToast(`🔔 Bạn sẽ được nhắc khi "${movie?.title}" mở vé!`, 'success')
  } else {
    btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Nhắc tôi`
    showToast('🔕 Đã huỷ đăng ký thông báo', 'info')
  }
}

// Genre filter
window.filterGenre = (_genre: string, btn: HTMLElement) => {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'))
  btn.classList.add('active')
  showToast('🎭 Đang lọc phim...', 'info')
}

// Cinema filter
window.filterCinema = (_cinema: string, btn: HTMLElement) => {
  document.querySelectorAll('.cinema-chip').forEach(c => c.classList.remove('active'))
  btn.classList.add('active')
}

// =========================================
// NAVBAR SCROLL EFFECT
// =========================================
const navbar = document.getElementById('navbar')!
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
}, { passive: true })

// =========================================
// ACTIVE NAV LINK ON SCROLL
// =========================================
const sections = ['now-showing', 'featured', 'coming-soon']
const navLinks = document.querySelectorAll('.navbar-nav a')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
      const id = entry.target.id
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active')
        }
      })
    }
  })
}, { threshold: 0.3 })

sections.forEach(id => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})

// =========================================
// FADE-IN ANIMATION ON SCROLL
// =========================================
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      fadeObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

document.querySelectorAll('.fade-in').forEach((el, index) => {
  if (index < 4) { // First 4 are instantly visible
    el.classList.add('visible')
  } else {
    fadeObserver.observe(el)
  }
})

// =========================================
// INTEREST BAR ANIMATION
// =========================================
const interestObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.interest-fill') as HTMLElement
      if (fill) {
        const width = fill.style.width
        fill.style.width = '0%'
        setTimeout(() => {
          fill.style.width = width
        }, 100)
      }
      interestObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.3 })

document.querySelectorAll('.interest-bar').forEach(bar => {
  interestObserver.observe(bar)
})

// =========================================
// SEAT SELECTION MODAL
// =========================================

interface SeatState {
  movieId: number
  selectedSeats: string[]
  selectedDate: string
  selectedTime: string
  currentStep: 1 | 2 | 3
  selectedCombos: Record<string, number>
  paymentMethod: string
  totalSeat: number
  discountCode: string
  discountAmount: number   // VND off
  discountPercent: number  // % off (0 if fixed)
}

let currentTicket: TicketData | null = null

function saveBooking(ticket: TicketData) {
  const bookings = getBookings()
  // Add to start (newest first)
  bookings.unshift(ticket)
  // Limit to last 30 bookings
  localStorage.setItem('cine_bookings', JSON.stringify(bookings.slice(0, 30)))
}

function getBookings(): TicketData[] {
  try {
    const data = localStorage.getItem('cine_bookings')
    return data ? JSON.parse(data) : []
  } catch (e) {
    console.error('Failed to parse bookings', e)
    return []
  }
}

const seatState: SeatState = {
  movieId: 0,
  selectedSeats: [],
  selectedDate: '',
  selectedTime: '',
  currentStep: 1,
  selectedCombos: {},
  paymentMethod: 'momo',
  totalSeat: 0,
  discountCode: '',
  discountAmount: 0,
  discountPercent: 0,
}

// ---- Coupon codes ----
interface CouponDef {
  type: 'percent' | 'fixed'
  value: number          // % or VND
  minOrder: number       // minimum grand total to apply
  label: string
}

const COUPONS: Record<string, CouponDef> = {
  'CINE10':   { type: 'percent', value: 10, minOrder: 0,      label: 'Giảm 10%' },
  'CINE20':   { type: 'percent', value: 20, minOrder: 200000, label: 'Giảm 20% (đơn ≥ 200k)' },
  'SAVE50K':  { type: 'fixed',   value: 50000,  minOrder: 0,  label: 'Giảm 50.000 ₫' },
  'SAVE100K': { type: 'fixed',   value: 100000, minOrder: 300000, label: 'Giảm 100.000 ₫ (đơn ≥ 300k)' },
  'WELCOME':  { type: 'fixed',   value: 30000,  minOrder: 0,  label: 'Giảm 30.000 ₫' },
  'VIP2025':  { type: 'percent', value: 15, minOrder: 0,      label: 'Giảm 15% VIP' },
}

// Seat prices
const SEAT_PRICES: Record<string, number> = {
  normal:   75000,
  vip:      110000,
  sweetbox: 200000,  // per couple seat (2 people)
}

// ---- Real-time occupancy helpers ----
function getOccupancyKey(movieId: number, date: string, time: string): string {
  return `cine_occupied_${movieId}_${date.replace(/\//g, '-')}_${time.replace(/:/g, '-')}`
}

function getOccupiedSeats(movieId: number, date: string, time: string): string[] {
  const key = getOccupancyKey(movieId, date, time)
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

function saveOccupiedSeats(movieId: number, date: string, time: string, seats: string[]) {
  const key = getOccupancyKey(movieId, date, time)
  const current = getOccupiedSeats(movieId, date, time)
  const updated = Array.from(new Set([...current, ...seats]))
  localStorage.setItem(key, JSON.stringify(updated))
  
  // Trigger a custom event to notify other parts of the app if needed
  window.dispatchEvent(new CustomEvent('seatsUpdated', { detail: { movieId, date, time } }))
}

// Generate seat layout: 8 rows (A-H), 12 cols, with dynamic occupancy
function generateSeatMap(movieId: number, date: string, time: string): { row: string; col: number; type: 'normal' | 'vip' | 'sweetbox'; taken: boolean }[][] {
  const rows = ['A','B','C','D','E','F','G','H']
  const occupied = getOccupiedSeats(movieId, date, time)
  
  // Initial hardcoded taken seats (if any) as a baseline for new showtimes
  const baselineTaken = (movieId === 1) ? ['A3','A4','B7','B8','C2','C9'] : []
  const allTaken = Array.from(new Set([...baselineTaken, ...occupied]))

  return rows.map(row => {
    if (row === 'H') {
      // Sweetbox row: 6 couple seats
      return Array.from({ length: 6 }, (_, i) => ({
        row, col: i + 1,
        type: 'sweetbox' as const,
        taken: allTaken.includes(`${row}${i + 1}`)
      }))
    }
    return Array.from({ length: 12 }, (_, i) => {
      const col = i + 1
      const type: 'normal' | 'vip' = (row === 'E' || row === 'F') ? 'vip' : 'normal'
      return { row, col, type, taken: allTaken.includes(`${row}${col}`) }
    })
  })
}

function getSeatId(row: string, col: number): string {
  return `${row}${col}`
}

function getSeatPrice(type: 'normal' | 'vip' | 'sweetbox'): number {
  return SEAT_PRICES[type]
}

function renderSeatMapHTML(): string {
  const map = generateSeatMap(seatState.movieId, seatState.selectedDate, seatState.selectedTime)
  return map.map(rowSeats => {
    const rowLabel = rowSeats[0].row
    const isSweetbox = rowSeats[0].type === 'sweetbox'

    const seatsHTML = isSweetbox
      ? rowSeats.map(s => {
          const id = getSeatId(s.row, s.col)
          const takenClass = s.taken ? 'taken' : ''
          return `<button class="seat sweetbox ${takenClass}" data-seat="${id}" data-type="sweetbox" ${s.taken ? 'disabled' : ''} aria-label="Ghế đôi ${id}${s.taken ? ' (đã đặt)' : ''}"></button>`
        }).join('<div class="sm-aisle"></div>')
      : [
          ...rowSeats.slice(0, 3),
          null, // aisle
          ...rowSeats.slice(3, 9),
          null, // aisle
          ...rowSeats.slice(9),
        ].map(s => {
          if (!s) return '<div class="sm-aisle"></div>'
          const id = getSeatId(s.row, s.col)
          const takenClass = s.taken ? 'taken' : ''
          const t = s.type
          return `<button class="seat ${t} ${takenClass}" data-seat="${id}" data-type="${t}" ${s.taken ? 'disabled' : ''} aria-label="Ghế ${id}${s.taken ? ' (đã đặt)' : ''}"></button>`
        }).join('')

    return `<div class="sm-row">
      <span class="sm-row-label">${rowLabel}</span>
      ${seatsHTML}
    </div>`
  }).join('')
}

function refreshSeatMap() {
  const mapEl = document.getElementById('sm-seat-map')
  if (!mapEl) return
  
  // Save current selection (visually)
  const currentSelection = seatState.selectedSeats
  
  mapEl.innerHTML = renderSeatMapHTML()
  
  // Restore selection (visually)
  currentSelection.forEach(id => {
    const seatBtn = mapEl.querySelector(`[data-seat="${id}"]`)
    if (seatBtn && !seatBtn.classList.contains('taken')) {
      seatBtn.classList.add('selected')
    } else if (seatBtn && seatBtn.classList.contains('taken')) {
      // If a seat became taken while it was selected, remove from state
      seatState.selectedSeats = seatState.selectedSeats.filter(s => s !== id)
    }
  })
  
  // If we are on step 2, update summary
  if (seatState.currentStep === 2) {
    const movie = nowShowingMovies.find(m => m.id === seatState.movieId)
    if (movie) updateSummary(movie)
  }
}

let seatSimulationInterval: number | null = null
let bookingTimerInterval: number | null = null

function startBookingTimer(durationSeconds: number) {
  stopBookingTimer()
  let timer = durationSeconds
  const timerEl = document.getElementById('sm-timer')
  
  bookingTimerInterval = window.setInterval(() => {
    const minutes = Math.floor(timer / 60)
    const seconds = timer % 60
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    
    if (timerEl) {
      timerEl.innerHTML = `<span>⏳</span> Thời gian còn lại: <b>${timeStr}</b>`
      if (timer <= 60) {
        timerEl.classList.add('warning')
      }
    }

    if (--timer < 0) {
      stopBookingTimer()
      closeSeatModal()
      showToast('⏰ Hết thời gian giữ ghế. Vui lòng thực hiện lại!', 'error')
    }
  }, 1000)
}

function stopBookingTimer() {
  if (bookingTimerInterval) {
    clearInterval(bookingTimerInterval)
    bookingTimerInterval = null
  }
}

function startSeatSimulation() {
  if (seatSimulationInterval) return
  seatSimulationInterval = window.setInterval(() => {
    // 30% chance to simulate a booking every 8 seconds
    if (Math.random() < 0.3) {
      const rows = ['A','B','C','D','E','F','G'] // exclude H for simplicity
      const row = rows[Math.floor(Math.random() * rows.length)]
      const col = Math.floor(Math.random() * 12) + 1
      const seatId = `${row}${col}`
      
      const occupied = getOccupiedSeats(seatState.movieId, seatState.selectedDate, seatState.selectedTime)
      if (!occupied.includes(seatId) && !seatState.selectedSeats.includes(seatId)) {
        saveOccupiedSeats(seatState.movieId, seatState.selectedDate, seatState.selectedTime, [seatId])
        showToast('🔄 Có người vừa đặt ghế ' + seatId, 'info')
      }
    }
  }, 8000)
}

function stopSeatSimulation() {
  if (seatSimulationInterval) {
    clearInterval(seatSimulationInterval)
    seatSimulationInterval = null
  }
}

// Cross-tab sync
window.addEventListener('storage', (e) => {
  if (e.key && e.key.startsWith('cine_occupied_')) {
    refreshSeatMap()
  }
})

// Listen for our own updates (same tab)
window.addEventListener('seatsUpdated', () => {
  refreshSeatMap()
})

// Build dates (today + 6 days)
function buildDates(): { day: string; num: string; month: string; full: string }[] {
  const days = ['CN','T2','T3','T4','T5','T6','T7']
  const months = ['Th1','Th2','Th3','Th4','Th5','Th6','Th7','Th8','Th9','Th10','Th11','Th12']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      day: i === 0 ? 'Hôm nay' : days[d.getDay()],
      num: String(d.getDate()).padStart(2, '0'),
      month: months[d.getMonth()],
      full: d.toLocaleDateString('vi-VN'),
    }
  })
}

const showtimes = [
  { time: '10:00', type: '2D', label: '' },
  { time: '12:30', type: '2D', label: '' },
  { time: '14:45', type: '3D', label: '' },
  { time: '17:15', type: '2D', label: '' },
  { time: '19:30', type: '4DX', label: '' },
  { time: '21:45', type: '3D', label: '' },
]

function renderSeatModal(movie: Movie): string {
  const dates = buildDates()
  seatState.selectedDate = dates[0].full
  seatState.selectedTime = showtimes[0].time

  const datesHTML = dates.map((d, i) => `
    <button class="sm-date-btn ${i === 0 ? 'active' : ''}" data-date="${d.full}">
      <span class="sm-date-day">${d.day}</span>
      <span class="sm-date-num">${d.num}</span>
      <span class="sm-date-month">${d.month}</span>
    </button>
  `).join('')

  const timesHTML = showtimes.map((s, i) => `
    <button class="sm-time-btn ${i === 0 ? 'active' : ''}" data-time="${s.time}">
      ${s.time}
      <span class="time-type">${s.type}</span>
    </button>
  `).join('')

  return `
    <div class="seat-modal-backdrop" id="seat-modal-backdrop" role="dialog" aria-modal="true" aria-label="Chọn ghế xem phim">
      <div class="seat-modal" id="seat-modal">

        <!-- Header -->
        <div class="sm-header">
          <img class="sm-movie-thumb" src="${movie.poster}" alt="${movie.title}"
            onerror="this.src='https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=300&fit=crop&q=80'"/>
          <div class="sm-movie-info">
            <div class="sm-movie-title">${movie.title}</div>
            <div class="sm-movie-meta">
              <span>⏱ ${movie.duration}</span>
              <span>🔞 ${movie.ageRating}</span>
              <span>🎬 ${movie.language}</span>
              <span>📍 CGV Vincom</span>
            </div>
          </div>
          <div class="sm-timer" id="sm-timer">
            <span>⏳</span> Thời gian còn lại: <b>05:00</b>
          </div>
          <button class="sm-close" id="sm-close-btn" aria-label="Đóng">✕</button>
        </div>

        <!-- Steps -->
        <div class="sm-steps" aria-label="Các bước đặt vé">
          <div class="sm-step active" id="step-1">
            <div class="sm-step-num">1</div>
            <span class="sm-step-text">Lịch chiếu</span>
          </div>
          <div class="sm-step-line"></div>
          <div class="sm-step" id="step-2">
            <div class="sm-step-num">2</div>
            <span class="sm-step-text">Chọn ghế</span>
          </div>
          <div class="sm-step-line"></div>
          <div class="sm-step" id="step-3">
            <div class="sm-step-num">3</div>
            <span class="sm-step-text">Thanh toán</span>
          </div>
        </div>

        <!-- Main content (steps 1 & 2) -->
        <div class="sm-main-content" id="sm-main-content">
          <div class="sm-body">

            <!-- Step 1: Date & Time -->
            <div id="sm-step1-panel">
              <p class="sm-section-label">Chọn ngày</p>
              <div class="sm-dates" id="sm-dates">${datesHTML}</div>

              <p class="sm-section-label">Suất chiếu</p>
              <div class="sm-times" id="sm-times">${timesHTML}</div>
            </div>

            <!-- Step 2: Seat map -->
            <div id="sm-step2-panel" style="display:none">
              <div class="sm-screen-wrap">
                <div class="sm-screen"></div>
                <div class="sm-screen-label">Màn hình</div>
              </div>

              <div class="sm-seat-map" id="sm-seat-map" role="group" aria-label="Sơ đồ ghế ngồi">
                ${renderSeatMapHTML()}
              </div>

              <div class="sm-legend">
                <div class="legend-item"><div class="legend-box normal"></div> Thường (75k)</div>
                <div class="legend-item"><div class="legend-box vip"></div> VIP (110k)</div>
                <div class="legend-item"><div class="legend-box sweetbox"></div> Sweetbox (200k)</div>
                <div class="legend-item"><div class="legend-box selected"></div> Đã chọn</div>
                <div class="legend-item"><div class="legend-box taken"></div> Đã đặt</div>
              </div>

              <div class="sm-summary" id="sm-summary">
                <div class="sm-summary-row">
                  <span>Phim</span>
                  <span class="val-red">${movie.title}</span>
                </div>
                <div class="sm-summary-row">
                  <span>Lịch chiếu</span>
                  <span id="sm-summary-time">—</span>
                </div>
                <div class="sm-summary-row">
                  <span>Ghế đã chọn</span>
                  <span class="sm-selected-seats" id="sm-summary-seats">Chưa chọn ghế</span>
                </div>
                <div class="sm-summary-row">
                  <span>Số lượng</span>
                  <span id="sm-summary-count">0 ghế</span>
                </div>
                <div class="sm-summary-row total">
                  <span>Tổng cộng</span>
                  <span class="val-gold" id="sm-summary-total">0 ₫</span>
                </div>
              </div>
            </div>

            <!-- Step 3: Checkout -->
            <div id="sm-step3-panel" style="display:none">

              <!-- Order recap -->
              <div class="ck-recap" id="ck-recap">
                <div class="ck-recap-row">
                  <span class="ck-label">Phim</span>
                  <span class="ck-val" id="ck-movie-title">—</span>
                </div>
                <div class="ck-recap-row">
                  <span class="ck-label">Lịch chiếu</span>
                  <span class="ck-val" id="ck-showtime">—</span>
                </div>
                <div class="ck-recap-row">
                  <span class="ck-label">Ghế</span>
                  <span class="ck-val" id="ck-seats">—</span>
                </div>
              </div>

              <!-- Combo -->
              <p class="sm-section-label" style="margin-top:18px">🍿 Thêm Combo (tuỳ chọn)</p>
              <div class="combo-list">
                <div class="combo-card" data-combo-id="c1" data-combo-price="65000">
                  <div class="combo-icon">🍿</div>
                  <div class="combo-info">
                    <div class="combo-name">Bắp Đơn + Nước</div>
                    <div class="combo-price">65.000 ₫</div>
                  </div>
                  <div class="combo-qty">
                    <button class="qty-btn" data-action="minus" data-combo="c1">−</button>
                    <span class="qty-val" id="qty-c1">0</span>
                    <button class="qty-btn" data-action="plus" data-combo="c1">+</button>
                  </div>
                </div>
                <div class="combo-card" data-combo-id="c2" data-combo-price="120000">
                  <div class="combo-icon">🍿🥤</div>
                  <div class="combo-info">
                    <div class="combo-name">Combo Đôi (2 Bắp + 2 Nước)</div>
                    <div class="combo-price">120.000 ₫</div>
                  </div>
                  <div class="combo-qty">
                    <button class="qty-btn" data-action="minus" data-combo="c2">−</button>
                    <span class="qty-val" id="qty-c2">0</span>
                    <button class="qty-btn" data-action="plus" data-combo="c2">+</button>
                  </div>
                </div>
                <div class="combo-card" data-combo-id="c3" data-combo-price="85000">
                  <div class="combo-icon">🌭🥤</div>
                  <div class="combo-info">
                    <div class="combo-name">Hotdog + Nước Lớn</div>
                    <div class="combo-price">85.000 ₫</div>
                  </div>
                  <div class="combo-qty">
                    <button class="qty-btn" data-action="minus" data-combo="c3">−</button>
                    <span class="qty-val" id="qty-c3">0</span>
                    <button class="qty-btn" data-action="plus" data-combo="c3">+</button>
                  </div>
                </div>
              </div>

              <!-- Contact info -->
              <p class="sm-section-label" style="margin-top:18px">👤 Thông tin người đặt</p>
              <div class="ck-form">
                <div class="ck-field">
                  <label class="ck-field-label" for="ck-name">Họ và tên *</label>
                  <input class="ck-input" id="ck-name" type="text" placeholder="Nguyễn Văn A" required />
                </div>
                <div class="ck-field">
                  <label class="ck-field-label" for="ck-phone">Số điện thoại *</label>
                  <input class="ck-input" id="ck-phone" type="tel" placeholder="0912 345 678" required />
                </div>
                <div class="ck-field">
                  <label class="ck-field-label" for="ck-email">Email (nhận mã vé)</label>
                  <input class="ck-input" id="ck-email" type="email" placeholder="email@example.com" />
                </div>
              </div>

              <!-- Payment method -->
              <p class="sm-section-label" style="margin-top:18px">💳 Phương thức thanh toán</p>
              <div class="pay-methods">
                <label class="pay-method active" data-method="momo">
                  <input type="radio" name="payment" value="momo" checked hidden />
                  <span class="pay-icon">💜</span>
                  <span class="pay-name">MoMo</span>
                  <span class="pay-check">✓</span>
                </label>
                <label class="pay-method" data-method="vnpay">
                  <input type="radio" name="payment" value="vnpay" hidden />
                  <span class="pay-icon">🔵</span>
                  <span class="pay-name">VNPay</span>
                  <span class="pay-check">✓</span>
                </label>
                <label class="pay-method" data-method="banking">
                  <input type="radio" name="payment" value="banking" hidden />
                  <span class="pay-icon">🏦</span>
                  <span class="pay-name">Chuyển khoản</span>
                  <span class="pay-check">✓</span>
                </label>
                <label class="pay-method" data-method="counter">
                  <input type="radio" name="payment" value="counter" hidden />
                  <span class="pay-icon">🎫</span>
                  <span class="pay-name">Tại quầy</span>
                  <span class="pay-check">✓</span>
                </label>
              </div>

              <!-- Coupon code -->
              <p class="sm-section-label" style="margin-top:18px">🎫 Mã giảm giá</p>
              <div class="coupon-row">
                <input class="ck-input coupon-input" id="coupon-input"
                  type="text" placeholder="Nhập mã (VD: CINE10, SAVE50K...)" maxlength="20"
                  autocomplete="off" spellcheck="false" />
                <button class="coupon-apply-btn" id="coupon-apply-btn">Áp dụng</button>
              </div>
              <div class="coupon-hint">
                Mã test: <code>CINE10</code> · <code>CINE20</code> · <code>SAVE50K</code> ·
                <code>SAVE100K</code> · <code>WELCOME</code> · <code>VIP2025</code>
              </div>
              <div class="coupon-feedback" id="coupon-feedback" style="display:none"></div>

              <!-- Final total -->
              <div class="ck-total-box">
                <div class="ck-total-row">
                  <span>Vé phim</span>
                  <span id="ck-seat-total">0 ₫</span>
                </div>
                <div class="ck-total-row">
                  <span>Combo</span>
                  <span id="ck-combo-total">0 ₫</span>
                </div>
                <div class="ck-total-row ck-discount-row" id="ck-discount-row" style="display:none">
                  <span id="ck-discount-label">Giảm giá</span>
                  <span class="val-discount" id="ck-discount-val">− 0 ₫</span>
                </div>
                <div class="ck-total-row ck-grand">
                  <span>Tổng thanh toán</span>
                  <span class="val-gold" id="ck-grand-total">0 ₫</span>
                </div>
              </div>

            </div>

          </div>

          <!-- Footer actions -->
          <div class="sm-footer">
            <button class="sm-btn-back" id="sm-btn-back" style="display:none">← Quay lại</button>
            <button class="sm-btn-confirm" id="sm-btn-confirm">
              Tiếp theo →
            </button>
          </div>
        </div>

        <!-- Success screen -->
        <div class="sm-success" id="sm-success">
          <span class="success-icon">🎉</span>
          <div class="success-title">Đặt vé thành công!</div>
          <p class="success-subtitle">
            Mã đặt vé của bạn đã được gửi qua email.<br/>
            Vui lòng xuất trình mã QR này khi đến rạp.
          </p>
          <div class="booking-code" id="sm-booking-code">—</div>
          
          <div class="sm-qr-container">
            <div class="sm-qr-wrap">
              <canvas id="sm-qr-canvas"></canvas>
            </div>
            <button id="sm-btn-download" class="sm-btn-download">
              💾 Tải vé về máy (PNG)
            </button>
          </div>

          <div class="success-info" id="success-info"></div>
          <br/>
          <button class="sm-btn-done" id="sm-btn-done">Xong</button>
        </div>

      </div>
    </div>
  `
}

// ---- Open / Close ----
function openSeatModal(movieId: number) {
  const movie = nowShowingMovies.find(m => m.id === movieId)
  if (!movie) return

  // Remove old modal if exists
  document.getElementById('seat-modal-backdrop')?.remove()

  // Reset state
  seatState.movieId = movieId
  seatState.selectedSeats = []
  seatState.currentStep = 1

  // Inject modal
  document.body.insertAdjacentHTML('beforeend', renderSeatModal(movie))

  // Set summary time
  const timeEl = document.getElementById('sm-summary-time')
  if (timeEl) {
    const dates = buildDates()
    timeEl.textContent = `${dates[0].full} – ${showtimes[0].time} (${showtimes[0].type})`
  }

  // Animate open
  requestAnimationFrame(() => {
    document.getElementById('seat-modal-backdrop')?.classList.add('active')
  })

  attachModalListeners(movie)
  startSeatSimulation()
  startBookingTimer(300) // 5 minutes
}

function closeSeatModal() {
  const backdrop = document.getElementById('seat-modal-backdrop')
  if (!backdrop) return
  backdrop.classList.remove('active')
  stopSeatSimulation()
  stopBookingTimer()
  setTimeout(() => backdrop.remove(), 350)
}

// ---- Attach all event listeners ----
function attachModalListeners(movie: Movie) {
  // Close button & backdrop click
  document.getElementById('sm-close-btn')?.addEventListener('click', closeSeatModal)
  document.getElementById('seat-modal-backdrop')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('seat-modal-backdrop')) closeSeatModal()
  })

  // Date selection
  document.getElementById('sm-dates')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.sm-date-btn') as HTMLButtonElement
    if (!btn) return
    document.querySelectorAll('.sm-date-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    seatState.selectedDate = btn.dataset.date || ''
    updateSummaryTime()
  })

  // Time selection
  document.getElementById('sm-times')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.sm-time-btn') as HTMLButtonElement
    if (!btn) return
    document.querySelectorAll('.sm-time-btn').forEach(b => b.classList.remove('active'))
    btn.classList.add('active')
    seatState.selectedTime = btn.dataset.time || ''
    updateSummaryTime()
  })

  // Seat clicking (delegated)
  document.getElementById('sm-seat-map')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.seat') as HTMLButtonElement
    if (!btn || btn.classList.contains('taken')) return

    const seatId = btn.dataset.seat!
    // seatType is read later from data-type attribute in updateSummary

    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected')
      seatState.selectedSeats = seatState.selectedSeats.filter(s => s !== seatId)
    } else {
      if (seatState.selectedSeats.length >= 8) {
        showToast('Tối đa 8 ghế mỗi lần đặt', 'error')
        return
      }
      btn.classList.add('selected')
      seatState.selectedSeats.push(seatId)
    }

    updateSummary(movie)
  })

  // Back button
  document.getElementById('sm-btn-back')?.addEventListener('click', () => {
    const step = seatState.currentStep
    if (step === 2) goToStep(1)
    else if (step === 3) goToStep(2)
  })

  // Confirm / Next button
  document.getElementById('sm-btn-confirm')?.addEventListener('click', () => {
    if (seatState.currentStep === 1) {
      goToStep(2)
    } else if (seatState.currentStep === 2) {
      confirmBooking(movie)
    } else if (seatState.currentStep === 3) {
      confirmBooking(movie)
    }
  })

  // Combo qty buttons (delegated)
  document.getElementById('sm-step3-panel')?.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('.qty-btn') as HTMLButtonElement
    if (!btn) return
    const action = btn.dataset.action!
    const comboId = btn.dataset.combo!
    const current = seatState.selectedCombos[comboId] || 0
    if (action === 'plus') {
      seatState.selectedCombos[comboId] = Math.min(current + 1, 5)
    } else {
      seatState.selectedCombos[comboId] = Math.max(current - 1, 0)
    }
    const qtyEl = document.getElementById(`qty-${comboId}`)
    if (qtyEl) qtyEl.textContent = String(seatState.selectedCombos[comboId])
    updateCheckoutTotals()
  })

  // Payment method selection (delegated)
  document.getElementById('sm-step3-panel')?.addEventListener('click', (e) => {
    const label = (e.target as HTMLElement).closest('.pay-method') as HTMLElement
    if (!label) return
    const method = label.dataset.method!
    seatState.paymentMethod = method
    document.querySelectorAll('.pay-method').forEach(l => l.classList.remove('active'))
    label.classList.add('active')
    const radio = label.querySelector('input[type=radio]') as HTMLInputElement
    if (radio) radio.checked = true
  })

  // Coupon apply button
  document.getElementById('coupon-apply-btn')?.addEventListener('click', () => {
    applyDiscount()
  })
  document.getElementById('coupon-input')?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') applyDiscount()
  })

  // Done button
  document.getElementById('sm-btn-done')?.addEventListener('click', closeSeatModal)

  // Download button
  document.getElementById('sm-btn-download')?.addEventListener('click', () => {
    if (currentTicket) {
      downloadQR(currentTicket)
        .catch(err => {
          console.error('Download QR failed:', err)
          showToast('❌ Lỗi khi tải vé. Vui lòng thử lại.', 'error')
        })
    }
  })

  // ESC key
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSeatModal()
      document.removeEventListener('keydown', escHandler)
    }
  }
  document.addEventListener('keydown', escHandler)
}

function goToStep(step: 1 | 2 | 3) {
  seatState.currentStep = step
  const step1Panel = document.getElementById('sm-step1-panel')!
  const step2Panel = document.getElementById('sm-step2-panel')!
  const step3Panel = document.getElementById('sm-step3-panel')!
  const backBtn    = document.getElementById('sm-btn-back')    as HTMLButtonElement
  const confirmBtn = document.getElementById('sm-btn-confirm') as HTMLButtonElement

  const s1 = document.getElementById('step-1')!
  const s2 = document.getElementById('step-2')!
  const s3 = document.getElementById('step-3')!

  // Hide all panels
  step1Panel.style.display = 'none'
  step2Panel.style.display = 'none'
  step3Panel.style.display = 'none'
  backBtn.style.display = ''
  confirmBtn.disabled = false

  if (step === 1) {
    step1Panel.style.display = ''
    backBtn.style.display = 'none'
    confirmBtn.textContent = 'Tiếp theo →'
    s1.className = 'sm-step active'
    s2.className = 'sm-step'
    s3.className = 'sm-step'
  } else if (step === 2) {
    step2Panel.style.display = ''
    confirmBtn.textContent = 'Tiếp theo →'
    confirmBtn.disabled = seatState.selectedSeats.length === 0
    s1.className = 'sm-step done'
    s2.className = 'sm-step active'
    s3.className = 'sm-step'
  } else {
    step3Panel.style.display = ''
    confirmBtn.textContent = '💳 Xác nhận & Thanh toán'
    s1.className = 'sm-step done'
    s2.className = 'sm-step done'
    s3.className = 'sm-step active'
    populateCheckout()
  }
}

function updateSummaryTime() {
  const timeEl = document.getElementById('sm-summary-time')
  const activeTime = document.querySelector('.sm-time-btn.active') as HTMLButtonElement
  const timeType = activeTime?.querySelector('.time-type')?.textContent || ''
  if (timeEl) {
    timeEl.textContent = `${seatState.selectedDate} – ${seatState.selectedTime} (${timeType})`
  }
}

function updateSummary(movie: Movie) {
  const seatsEl   = document.getElementById('sm-summary-seats')!
  const countEl   = document.getElementById('sm-summary-count')!
  const totalEl   = document.getElementById('sm-summary-total')!
  const confirmBtn = document.getElementById('sm-btn-confirm') as HTMLButtonElement

  const seats = seatState.selectedSeats

  // Calculate price
  let total = 0
  seats.forEach(seatId => {
    const btn = document.querySelector(`[data-seat="${seatId}"]`) as HTMLElement
    const type = (btn?.dataset.type || 'normal') as 'normal' | 'vip' | 'sweetbox'
    total += getSeatPrice(type)
  })
  seatState.totalSeat = total   // store for checkout

  seatsEl.textContent = seats.length > 0 ? seats.join(', ') : 'Chưa chọn ghế'
  countEl.textContent = `${seats.length} ghế`
  totalEl.textContent = total > 0
    ? total.toLocaleString('vi-VN') + ' ₫'
    : '0 ₫'

  if (confirmBtn) {
    confirmBtn.disabled = seats.length === 0
  }
  void movie
}

function confirmBooking(movie: Movie) {
  if (seatState.currentStep === 2) {
    if (seatState.selectedSeats.length === 0) {
      showToast('Vui lòng chọn ít nhất 1 ghế', 'error'); return
    }
    goToStep(3)
    return
  }
  // Step 3 → process payment
  processPayment(movie)
}

function populateCheckout() {
  const titleEl    = document.getElementById('ck-movie-title')
  const timeEl     = document.getElementById('ck-showtime')
  const seatsEl    = document.getElementById('ck-seats')
  const seatTotEl  = document.getElementById('ck-seat-total')
  const grandTotEl = document.getElementById('ck-grand-total')
  const comboTotEl = document.getElementById('ck-combo-total')

  const movie = nowShowingMovies.find(m => m.id === seatState.movieId)
  if (titleEl) titleEl.textContent = movie?.title || '—'

  const activeTime = document.querySelector('.sm-time-btn.active')
  const timeType = activeTime?.querySelector('.time-type')?.textContent || ''
  if (timeEl) timeEl.textContent = `${seatState.selectedDate} – ${seatState.selectedTime} (${timeType})`
  if (seatsEl) seatsEl.textContent = seatState.selectedSeats.join(', ')

  if (seatTotEl) seatTotEl.textContent = seatState.totalSeat.toLocaleString('vi-VN') + ' ₫'
  const comboTotal = calcComboTotal()
  if (comboTotEl) comboTotEl.textContent = comboTotal > 0 ? comboTotal.toLocaleString('vi-VN') + ' ₫' : '0 ₫'
  if (grandTotEl) grandTotEl.textContent = (seatState.totalSeat + comboTotal).toLocaleString('vi-VN') + ' ₫'

  // AUTO-FILL USER INFO
  const user = Auth.getCurrentUser()
  if (user) {
    const nameInput  = document.getElementById('ck-name')  as HTMLInputElement
    const phoneInput = document.getElementById('ck-phone') as HTMLInputElement
    const emailInput = document.getElementById('ck-email') as HTMLInputElement
    if (nameInput && !nameInput.value)   nameInput.value = user.name
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone
    if (emailInput && !emailInput.value) emailInput.value = user.email
  }
}

function calcComboTotal(): number {
  const prices: Record<string, number> = { c1: 65000, c2: 120000, c3: 85000 }
  return Object.entries(seatState.selectedCombos)
    .reduce((sum, [id, qty]) => sum + (prices[id] || 0) * qty, 0)
}

function calcDiscount(subtotal: number): number {
  if (!seatState.discountCode) return 0
  if (seatState.discountPercent > 0) {
    return Math.round(subtotal * seatState.discountPercent / 100)
  }
  return Math.min(seatState.discountAmount, subtotal)
}

function applyDiscount() {
  const input    = document.getElementById('coupon-input')    as HTMLInputElement
  const feedback = document.getElementById('coupon-feedback') as HTMLElement
  const code     = input.value.trim().toUpperCase()

  feedback.style.display = 'block'

  if (!code) {
    feedback.className = 'coupon-feedback error'
    feedback.textContent = '⚠️ Vui lòng nhập mã giảm giá'
    return
  }

  const coupon = COUPONS[code]
  if (!coupon) {
    feedback.className = 'coupon-feedback error'
    feedback.textContent = '❌ Mã không hợp lệ hoặc đã hết hạn'
    seatState.discountCode = ''
    seatState.discountAmount = 0
    seatState.discountPercent = 0
    updateCheckoutTotals()
    return
  }

  const subtotal = seatState.totalSeat + calcComboTotal()
  if (subtotal < coupon.minOrder) {
    feedback.className = 'coupon-feedback error'
    feedback.textContent = `❌ Mã này yêu cầu đơn tối thiểu ${coupon.minOrder.toLocaleString('vi-VN')} ₫`
    seatState.discountCode = ''
    seatState.discountAmount = 0
    seatState.discountPercent = 0
    updateCheckoutTotals()
    return
  }

  // Valid!
  seatState.discountCode = code
  seatState.discountAmount  = coupon.type === 'fixed'   ? coupon.value : 0
  seatState.discountPercent = coupon.type === 'percent' ? coupon.value : 0

  feedback.className = 'coupon-feedback success'
  feedback.textContent = `✅ Áp dụng thành công: ${coupon.label}`
  input.value = code

  updateCheckoutTotals()
  showToast(`🎟️ Mã "${code}" - ${coupon.label}`, 'success')
}

function updateCheckoutTotals() {
  const comboTotal    = calcComboTotal()
  const subtotal      = seatState.totalSeat + comboTotal
  const discountOff   = calcDiscount(subtotal)
  const grand         = Math.max(0, subtotal - discountOff)

  const comboEl    = document.getElementById('ck-combo-total')
  const grandEl    = document.getElementById('ck-grand-total')
  const discRow    = document.getElementById('ck-discount-row')    as HTMLElement | null
  const discLabel  = document.getElementById('ck-discount-label')
  const discVal    = document.getElementById('ck-discount-val')

  if (comboEl)   comboEl.textContent   = comboTotal > 0 ? comboTotal.toLocaleString('vi-VN') + ' ₫' : '0 ₫'
  if (grandEl)   grandEl.textContent   = grand.toLocaleString('vi-VN') + ' ₫'

  if (discRow) {
    if (discountOff > 0) {
      discRow.style.display = ''
      if (discLabel) discLabel.textContent = `Giảm giá (${seatState.discountCode})`
      if (discVal)   discVal.textContent   = `− ${discountOff.toLocaleString('vi-VN')} ₫`
    } else {
      discRow.style.display = 'none'
    }
  }
}

function processPayment(_movie: Movie) {
  const nameEl  = document.getElementById('ck-name')  as HTMLInputElement
  const phoneEl = document.getElementById('ck-phone') as HTMLInputElement

  if (!nameEl?.value.trim()) {
    showToast('Vui lòng nhập họ tên', 'error'); nameEl?.focus(); return
  }
  if (!phoneEl?.value.trim()) {
    showToast('Vui lòng nhập số điện thoại', 'error'); phoneEl?.focus(); return
  }
  const phoneRe = /^[0-9]{9,11}$/
  if (!phoneRe.test(phoneEl.value.replace(/\s/g, ''))) {
    showToast('Số điện thoại không hợp lệ', 'error'); phoneEl?.focus(); return
  }

  const confirmBtn = document.getElementById('sm-btn-confirm') as HTMLButtonElement
  confirmBtn.disabled = true
  confirmBtn.textContent = '⏳ Đang xử lý...'

  // Simulate payment processing
  setTimeout(() => {
    const mainContent = document.getElementById('sm-main-content')!
    const successEl   = document.getElementById('sm-success')!
    const codeEl      = document.getElementById('sm-booking-code')!
    const infoEl      = document.getElementById('success-info')

    document.getElementById('step-3')!.className = 'sm-step done'

    const code = 'CB' + Math.random().toString(36).substring(2, 8).toUpperCase()
    codeEl.textContent = code

    const payLabel: Record<string, string> = {
      momo: 'MoMo', vnpay: 'VNPay', banking: 'Chuyển khoản', counter: 'Tại quầy'
    }
    const subtotal    = seatState.totalSeat + calcComboTotal()
    const discountOff = calcDiscount(subtotal)
    const grand       = Math.max(0, subtotal - discountOff)

    const comboTotal  = calcComboTotal()
    
    // Generate ticket data
    currentTicket = {
      bookingCode: code,
      movieTitle: _movie.title,
      cinema: 'CGV Vincom Center Bà Triệu', 
      date: seatState.selectedDate,
      time: seatState.selectedTime,
      seats: seatState.selectedSeats,
      customerName: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      totalAmount: grand,
      paymentMethod: payLabel[seatState.paymentMethod],
      selectedCombos: { ...seatState.selectedCombos },
      comboTotal: comboTotal,
      ...(seatState.discountCode ? { discountCode: seatState.discountCode } : {})
    }

    // Render QR Code to the canvas
    const canvas = document.getElementById('sm-qr-canvas') as HTMLCanvasElement
    if (canvas && currentTicket) {
      renderQRToCanvas(canvas, currentTicket).catch(err => {
        console.error('QR rendering failed:', err)
      })
    }

    if (infoEl) {
      const comboRow = comboTotal > 0
        ? `<div class="sd-row"><span>Đồ ăn & Uống</span><b>${comboTotal.toLocaleString('vi-VN')} ₫</b></div>`
        : ''
      const discountRow = discountOff > 0
        ? `<div class="sd-row"><span>Giảm giá (${seatState.discountCode})</span><b style="color:#10b981">− ${discountOff.toLocaleString('vi-VN')} ₫</b></div>`
        : ''
      infoEl.innerHTML = `
        <div class="success-detail-grid">
          <div class="sd-row"><span>Khách hàng</span><b>${nameEl.value.trim()}</b></div>
          <div class="sd-row"><span>Ghế</span><b>${seatState.selectedSeats.join(', ')}</b></div>
          <div class="sd-row"><span>Lịch chiếu</span><b>${seatState.selectedTime} – ${seatState.selectedDate}</b></div>
          ${comboRow}
          <div class="sd-row"><span>Thanh toán</span><b>${payLabel[seatState.paymentMethod]}</b></div>
          ${discountRow}
          <div class="sd-row total"><span>Tổng cộng</span><b>${grand.toLocaleString('vi-VN')} ₫</b></div>
        </div>
      `
    }

    mainContent.style.display = 'none'
    successEl.classList.add('show')
    showToast('🎟️ Đặt vé thành công!', 'success')
    stopBookingTimer()

    // Save to history
    if (currentTicket) {
      saveBooking(currentTicket)
      
      // PERSIST SEATS FOR REAL-TIME
      saveOccupiedSeats(seatState.movieId, seatState.selectedDate, seatState.selectedTime, seatState.selectedSeats)
      
      // UPDATE MEMBERSHIP IF LOGGED IN
      const user = Auth.getCurrentUser()
      if (user) {
        Auth.updateMembership(grand)
        refreshNavbar()
      }
    }
  }, 1200)
}

// ---- Patch handleBooking to open the seat modal ----
// ---- Admin Dashboard Integration ----
function openAdminDashboard() {
  const app = document.getElementById('app')!
  const container = document.createElement('div')
  container.id = 'admin-root'
  document.body.appendChild(container)
  app.style.display = 'none'

  renderAdminDashboard(container, () => {
    app.style.display = ''
    container.remove()
    window.location.hash = '#'
  })
}

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#admin') {
    openAdminDashboard()
  }
})

// Check initial hash
if (window.location.hash === '#admin') {
  setTimeout(openAdminDashboard, 500)
}

document.getElementById('nav-admin-btn')?.addEventListener('click', (e) => {
  e.preventDefault()
  window.location.hash = '#admin'
})

// ---- Booking History Modal ----
function renderHistoryModal(): string {
  const bookings = getBookings()
  let listHTML = ''

  if (bookings.length === 0) {
    listHTML = `
      <div class="history-empty">
        <div class="empty-icon">🎟️</div>
        <h3>Chưa có lịch sử đặt vé</h3>
        <p>Bạn chưa thực hiện giao dịch nào. Hãy chọn phim và đặt vé ngay!</p>
        <button class="btn-primary" onclick="closeHistoryModal()">Khám phá ngay</button>
      </div>
    `
  } else {
    listHTML = bookings.map((b, index) => {
      // Find movie poster
      const movie = [...nowShowingMovies, ...comingSoonMovies].find(m => m.title === b.movieTitle)
      const poster = movie?.poster || 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=100&h=150&fit=crop&q=80'

      return `
        <div class="history-item">
          <img src="${poster}" class="hi-poster" alt="${b.movieTitle}" />
          <div class="hi-content">
            <div class="hi-header">
              <h4 class="hi-title">${b.movieTitle}</h4>
              <span class="hi-code">${b.bookingCode}</span>
            </div>
            <div class="hi-details">
              <div class="hi-row">
                <span>📍 Suất chiếu:</span>
                <b>${b.time} – ${b.date}</b>
              </div>
              <div class="hi-row">
                <span>💺 Ghế:</span>
                <b>${b.seats.join(', ')}</b>
              </div>
              <div class="hi-row">
                <span>💰 Tổng tiền:</span>
                <b class="hi-price">${b.totalAmount.toLocaleString('vi-VN')} ₫</b>
              </div>
              ${b.comboTotal && b.comboTotal > 0 ? `
                <div class="hi-row" style="font-size: 11px; opacity: 0.8; margin-top: -4px;">
                  <span>🍿 Bao gồm:</span>
                  <span>${Object.entries(b.selectedCombos || {}).filter(([_,q]) => q > 0).map(([id, q]) => `${q}x ${id === 'c1' ? 'Bắp đơn' : id === 'c2' ? 'Combo đôi' : 'Hotdog'}`).join(', ')}</span>
                </div>
              ` : ''}
            </div>
            <div class="hi-footer">
              <button class="hi-btn-view" onclick="viewTicketFromHistory(${index})">
                👁️ Xem vé & QR
              </button>
            </div>
          </div>
        </div>
      `
    }).join('')
  }

  return `
    <div class="modal-backdrop" id="history-modal-backdrop">
      <div class="modal-content history-modal">
        <div class="sm-header">
          <div class="sm-title-box">
            <h2 class="sm-title">Lịch Sử Đặt Vé</h2>
            <p class="sm-subtitle">Danh sách các vé phim bạn đã đặt gần đây</p>
          </div>
          <button class="sm-close-btn" id="history-close-btn">×</button>
        </div>
        
        <div class="history-list">
          ${listHTML}
        </div>
      </div>
    </div>
  `
}

function openHistoryModal() {
  document.getElementById('history-modal-backdrop')?.remove()
  document.body.insertAdjacentHTML('beforeend', renderHistoryModal())
  
  const backdrop = document.getElementById('history-modal-backdrop')!
  requestAnimationFrame(() => backdrop.classList.add('active'))

  // Close handlers
  document.getElementById('history-close-btn')?.addEventListener('click', closeHistoryModal)
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeHistoryModal()
  })
}

function closeHistoryModal() {
  const backdrop = document.getElementById('history-modal-backdrop')
  if (!backdrop) return
  backdrop.classList.remove('active')
  setTimeout(() => backdrop.remove(), 350)
}

window.closeHistoryModal = closeHistoryModal

window.viewTicketFromHistory = (index: number) => {
  const bookings = getBookings()
  const b = bookings[index]
  if (!b) return

  closeHistoryModal()
  
  // Reuse currentTicket for rendering
  currentTicket = b
  
  // Simulate opening success modal with this ticket
  const movie = [...nowShowingMovies, ...comingSoonMovies].find(m => m.title === b.movieTitle)
  if (!movie) {
    showToast('Không tìm thấy thông tin phim', 'error')
    return
  }

  openSeatModal(movie.id)
  
  // Skip to step 3 success
  setTimeout(() => {
    // We need to bypass the normal flow to show success directly
    const mainContent = document.getElementById('sm-main-content')!
    const successEl   = document.getElementById('sm-success')!
    const codeEl      = document.getElementById('sm-booking-code')!
    const infoEl      = document.getElementById('success-info')
    
    document.getElementById('step-1')?.classList.add('done')
    document.getElementById('step-2')?.classList.add('done')
    document.getElementById('step-3')?.classList.add('done')

    codeEl.textContent = b.bookingCode
    
    if (infoEl) {
      const discountRow = (b.discountCode)
        ? `<div class="sd-row"><span>Giảm giá (${b.discountCode})</span><b style="color:#10b981">Đã áp dụng</b></div>`
        : ''
      infoEl.innerHTML = `
        <div class="success-detail-grid">
          <div class="sd-row"><span>Khách hàng</span><b>${b.customerName}</b></div>
          <div class="sd-row"><span>Ghế</span><b>${b.seats.join(', ')}</b></div>
          <div class="sd-row"><span>Lịch chiếu</span><b>${b.time} – ${b.date}</b></div>
          <div class="sd-row"><span>Thanh toán</span><b>${b.paymentMethod}</b></div>
          ${discountRow}
          <div class="sd-row total"><span>Tổng</span><b>${b.totalAmount.toLocaleString('vi-VN')} ₫</b></div>
        </div>
      `
    }

    // Render QR
    const canvas = document.getElementById('sm-qr-canvas') as HTMLCanvasElement
    if (canvas) renderQRToCanvas(canvas, b)

    mainContent.style.display = 'none'
    successEl.classList.add('show')
  }, 100)
}

function openProfileModal() {
  const user = Auth.getCurrentUser()
  if (!user) return

  let isEditing = false

  function renderModalContent() {
    // Tier Progress Calculation
    const thresholds = { Silver: 1000000, Gold: 5000000 }
    let nextTier: string | null = null
    let progress = 100
    let remaining = 0

    if (user!.tier === 'Member') {
      nextTier = 'Silver'
      progress = Math.min(100, (user!.totalSpent / thresholds.Silver) * 100)
      remaining = thresholds.Silver - user!.totalSpent
    } else if (user!.tier === 'Silver') {
      nextTier = 'Gold'
      progress = Math.min(100, (user!.totalSpent / thresholds.Gold) * 100)
      remaining = thresholds.Gold - user!.totalSpent
    }

    return `
      <div class="modal-backdrop active" id="profile-modal-backdrop">
        <div class="modal-content profile-modal">
          <div class="sm-header">
            <div class="sm-title-box">
              <h2 class="sm-title">Tài Khoản & Thành Viên</h2>
              <p class="sm-subtitle">Quản lý thông tin và theo dõi ưu đãi của bạn</p>
            </div>
            <button class="sm-close-btn" id="profile-close-btn">×</button>
          </div>

          <div class="profile-content">
            <!-- Membership Card -->
            <div class="membership-card tier-${user?.tier}">
              <div class="membership-header">
                <div class="tier-name">${user?.tier} Member</div>
                <div class="points-display">
                  <span class="points-label">Điểm tích lũy</span>
                  <span class="points-val">${user?.points}</span>
                </div>
              </div>
              
              <div class="membership-footer">
                ${nextTier ? `
                  <div class="progress-info">
                    <span>Tiến trình lên ${nextTier}</span>
                    <span>${Math.round(progress)}%</span>
                  </div>
                  <div class="progress-track">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                  </div>
                  <p style="font-size: 10px; margin-top: 8px; opacity: 0.8;">
                    Bạn cần chi tiêu thêm <b>${remaining.toLocaleString('vi-VN')} ₫</b> để đạt hạng ${nextTier}
                  </p>
                ` : `
                  <div class="progress-info">
                    <span>Hạng cao nhất: ${user?.tier}</span>
                    <span>100%</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill" style="width: 100%"></div></div>
                  <p style="font-size: 10px; margin-top: 8px; opacity: 0.8;">Bạn đang tận hưởng ưu đãi cao nhất của CineBooking!</p>
                `}
              </div>
            </div>

            <!-- Profile Form -->
            <div class="profile-section">
              <div class="section-h">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Thông tin cá nhân
              </div>

              ${isEditing ? `
                <div class="profile-row">
                  <label class="profile-label">Họ và tên</label>
                  <input type="text" id="edit-name" class="profile-input" value="${user?.name}">
                </div>
                <div class="profile-row">
                  <label class="profile-label">Số điện thoại</label>
                  <input type="tel" id="edit-phone" class="profile-input" value="${user?.phone}">
                </div>
              ` : `
                <div class="profile-row">
                  <span class="profile-label">Họ và tên</span>
                  <span class="profile-val">${user?.name}</span>
                </div>
                <div class="profile-row">
                  <span class="profile-label">Số điện thoại</span>
                  <span class="profile-val">${user?.phone}</span>
                </div>
              `}
              <div class="profile-row">
                <span class="profile-label">Email đăng ký</span>
                <span class="profile-val" style="opacity: 0.6;">${user?.email}</span>
              </div>
            </div>

            <!-- Profile Actions -->
            <div class="profile-actions">
              ${isEditing ? `
                <button class="btn-profile btn-profile-save" id="profile-save-btn">Lưu thay đổi</button>
                <button class="btn-profile btn-profile-edit" id="profile-cancel-btn">Hủy</button>
              ` : `
                <button class="btn-profile btn-profile-edit" id="profile-edit-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Chỉnh sửa
                </button>
                <button class="btn-profile btn-logout" id="profile-logout-btn">Đăng xuất</button>
              `}
            </div>
          </div>
        </div>
      </div>
    `
  }

  function updateModalDOM() {
    const existing = document.getElementById('profile-modal-backdrop')
    if (existing) existing.remove()
    document.body.insertAdjacentHTML('beforeend', renderModalContent())
    attachListeners()
    
    // Animation trigger
    requestAnimationFrame(() => {
      document.getElementById('profile-modal-backdrop')?.classList.add('active')
    })
  }

  function attachListeners() {
    const backdrop = document.getElementById('profile-modal-backdrop')!
    
    document.getElementById('profile-close-btn')?.addEventListener('click', () => {
      backdrop.classList.remove('active')
      setTimeout(() => backdrop.remove(), 350)
    })

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active')
        setTimeout(() => backdrop.remove(), 350)
      }
    })

    document.getElementById('profile-edit-btn')?.addEventListener('click', () => {
      isEditing = true
      updateModalDOM()
    })

    document.getElementById('profile-cancel-btn')?.addEventListener('click', () => {
      isEditing = false
      updateModalDOM()
    })

    document.getElementById('profile-save-btn')?.addEventListener('click', () => {
      const newName = (document.getElementById('edit-name') as HTMLInputElement).value
      const newPhone = (document.getElementById('edit-phone') as HTMLInputElement).value

      if (!newName || !newPhone) {
        showToast('Vui lòng nhập đầy đủ thông tin', 'error')
        return
      }

      // Update User Data
      user!.name = newName
      user!.phone = newPhone
      Auth.setCurrentUser(user!)
      
      showToast('Cập nhật hồ sơ thành công!', 'success')
      isEditing = false
      updateModalDOM()
      refreshNavbar()
    })
    
    document.getElementById('profile-logout-btn')?.addEventListener('click', () => {
      Auth.logout()
      backdrop.remove()
      refreshNavbar()
      showToast('Đã đăng xuất thành công', 'info')
    })
  }

  updateModalDOM()
}

function refreshNavbar() {
  const navbarRight = document.querySelector('.navbar-right')
  if (!navbarRight) return

  const user = Auth.getCurrentUser()
  navbarRight.innerHTML = `
    <button class="search-btn" id="search-btn" aria-label="Tìm kiếm phim">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <span class="search-text">Tìm phim...</span>
    </button>
    ${user ? `
      <div class="user-profile-nav" id="nav-user-profile" style="display: flex; align-items: center; gap: 10px; cursor: pointer; padding: 5px 12px; border-radius: 30px; background: rgba(255,255,255,0.05);">
        <div class="user-avatar-sm" style="width: 32px; height: 32px; border-radius: 50%; overflow: hidden; border: 1.5px solid var(--accent-gold);">
          <img src="${user.avatar || 'https://i.pravatar.cc/100'}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="user-nav-info" style="display: flex; flex-direction: column; line-height: 1.2;">
          <span class="user-nav-name" style="font-size: 13px; font-weight: 600; color: var(--text-h);">${user.name.split(' ')[0]}</span>
          <span class="user-nav-tier" style="font-size: 10px; font-weight: 700; color: ${Auth.getTierBadgeColor(user.tier)}; text-transform: uppercase;">${user.tier}</span>
        </div>
      </div>
    ` : `
      <a href="#auth" class="btn-primary" id="nav-login-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
        Đăng Nhập
      </a>
    `}
    <button class="hamburger" id="hamburger-btn" aria-label="Mở menu">
      <span></span><span></span><span></span>
    </button>
  `
  attachNavbarListeners()
}

function handleAuthRoute() {
  const container = document.createElement('div')
  container.id = 'auth-root'
  document.body.appendChild(container)
  document.getElementById('app')!.style.display = 'none'

  const goBack = () => {
    document.getElementById('app')!.style.display = ''
    container.remove()
    window.location.hash = '#'
    refreshNavbar()
  }

  const showLogin = () => Auth.renderLogin(container, goBack, showRegister, () => {}, goBack)
  const showRegister = () => Auth.renderRegister(container, goBack, showLogin, goBack)
  
  showLogin()
}

function attachNavbarListeners() {
  document.getElementById('nav-user-profile')?.addEventListener('click', openProfileModal)
  document.getElementById('nav-login-btn')?.addEventListener('click', (e) => {
    e.preventDefault()
    handleAuthRoute()
  })
}

// Initial listeners
attachNavbarListeners()

// Global history handler
document.getElementById('nav-history-btn')?.addEventListener('click', (e) => {
  e.preventDefault()
  if (typeof openHistoryModal === 'function') {
    openHistoryModal()
  } else {
    showToast('Lịch sử đặt vé đang được tải...', 'info')
  }
})

// Initialize Navbar
refreshNavbar()

console.log('🎬 CineBooking + History + Auth loaded!')
