/**
 * Showtime.ts
 * Quản lý dữ liệu và logic suất chiếu phim
 */

export interface Showtime {
  id: string
  movieId: number
  movieTitle: string
  cinemaId: string
  cinemaName: string
  roomId: string
  roomName: string
  date: string
  startTime: string
  price: number
  language: string
}

export let showtimes: Showtime[] = [
  {
    id: 's1',
    movieId: 1,
    movieTitle: 'Địa Ngục Trần Gian',
    cinemaId: 'c1',
    cinemaName: 'CGV Vincom Center Bà Triệu',
    roomId: 'r1',
    roomName: 'Phòng 01',
    date: '2025-04-10',
    startTime: '10:30',
    price: 95000,
    language: 'Lồng tiếng'
  },
  {
    id: 's2',
    movieId: 1,
    movieTitle: 'Địa Ngục Trần Gian',
    cinemaId: 'c1',
    cinemaName: 'CGV Vincom Center Bà Triệu',
    roomId: 'r2',
    roomName: 'Phòng 02',
    date: '2025-04-10',
    startTime: '13:45',
    price: 115000,
    language: 'Phụ đề'
  },
  {
    id: 's3',
    movieId: 2,
    movieTitle: 'Ánh Sáng Cuối Đường',
    cinemaId: 'c2',
    cinemaName: 'Lotte Cinema Gò Vấp',
    roomId: 'r3',
    roomName: 'Phòng 01',
    date: '2025-04-10',
    startTime: '15:20',
    price: 85000,
    language: 'Phụ đề'
  }
]

export function addShowtime(showtime: Omit<Showtime, 'id'>) {
  const newShowtime = {
    ...showtime,
    id: 's' + (showtimes.length ? Math.max(...showtimes.map(s => parseInt(s.id.slice(1)))) + 1 : 1)
  }
  showtimes.push(newShowtime)
  return newShowtime
}

export function updateShowtime(id: string, updated: Partial<Showtime>) {
  const index = showtimes.findIndex(s => s.id === id)
  if (index !== -1) {
    showtimes[index] = { ...showtimes[index], ...updated }
    return true
  }
  return false
}

export function deleteShowtime(id: string) {
  const index = showtimes.findIndex(s => s.id === id)
  if (index !== -1) {
    showtimes.splice(index, 1)
    return true
  }
  return false
}
