import './style.css'

// =========================================
// DATA: Phim Đang Chiếu
// =========================================
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
      </ul>

      <div class="navbar-right">
        <button class="search-btn" id="search-btn" aria-label="Tìm kiếm phim">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="search-text">Tìm phim...</span>
        </button>
        <a href="#auth" class="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Đăng Nhập
        </a>
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
  }
}

// Toast notifications
function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const container = document.getElementById('toast-container')!
  const icons: Record<string, string> = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  }
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-text">${message}</span>
  `
  container.appendChild(toast)
  setTimeout(() => {
    toast.style.opacity = '0'
    toast.style.transform = 'translateX(100px)'
    toast.style.transition = 'all 0.3s ease'
    setTimeout(() => toast.remove(), 300)
  }, 3500)
}
window.showToast = showToast

// Booking handler
window.handleBooking = (movieId: number) => {
  const movie = nowShowingMovies.find(m => m.id === movieId) ||
                nowShowingMovies.find(m => m.id === movieId)
  const title = movie?.title || 'phim này'
  showToast(`🎟️ Đang mở trang đặt vé cho "${title}"...`, 'success')
}

// Trailer handler
window.handleTrailer = (movieId: number) => {
  const movie = nowShowingMovies.find(m => m.id === movieId)
  showToast(`🎬 Đang tải trailer "${movie?.title}"...`, 'info')
}

// Wishlist handler
window.handleWishlist = (movieId: number, btn: HTMLElement) => {
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

console.log('🎬 CineBooking loaded successfully!')
