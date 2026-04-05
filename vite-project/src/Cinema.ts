/**
 * Cinema.ts
 * Quản lý dữ liệu và logic rạp chiếu phim
 */

export interface Cinema {
  id: string
  name: string
  location: string
  contact: string
  image: string
}

export let cinemas: Cinema[] = [
  {
    id: 'c1',
    name: 'CGV Vincom Center Bà Triệu',
    location: '191 Bà Triệu, Hai Bà Trưng, Hà Nội',
    contact: '1900 6017',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&h=120&fit=crop&q=80'
  },
  {
    id: 'c2',
    name: 'Lotte Cinema Gò Vấp',
    location: '242 Nguyễn Văn Lượng, Gò Vấp, TP.HCM',
    contact: '028 3588 5666',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=200&h=120&fit=crop&q=80'
  },
  {
    id: 'c3',
    name: 'BHD Star Vincom Thảo Điền',
    location: '159 Xa lộ Hà Nội, Thảo Điền, Quận 2, TP.HCM',
    contact: '1900 1234',
    image: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=200&h=120&fit=crop&q=80'
  }
]

export function addCinema(cinema: Omit<Cinema, 'id'>) {
  const newCinema = {
    ...cinema,
    id: 'c' + (cinemas.length + 1)
  }
  cinemas.push(newCinema)
  return newCinema
}

export function updateCinema(id: string, updated: Partial<Cinema>) {
  const index = cinemas.findIndex(c => c.id === id)
  if (index !== -1) {
    cinemas[index] = { ...cinemas[index], ...updated }
    return true
  }
  return false
}

export function deleteCinema(id: string) {
  const index = cinemas.findIndex(c => c.id === id)
  if (index !== -1) {
    cinemas.splice(index, 1)
    return true
  }
  return false
}
