/**
 * Room.ts
 * Quản lý dữ liệu và logic phòng chiếu phim
 */
import { cinemas } from './Cinema'

export interface Room {
  id: string
  name: string
  cinemaId: string
  cinemaName: string
  capacity: number
  type: '2D' | '3D' | 'IMAX' | '4DX'
  status: 'active' | 'maintenance'
}

export let rooms: Room[] = [
  {
    id: 'r1',
    name: 'Phòng 01',
    cinemaId: 'c1',
    cinemaName: 'CGV Vincom Center Bà Triệu',
    capacity: 120,
    type: '2D',
    status: 'active'
  },
  {
    id: 'r2',
    name: 'Phòng 02',
    cinemaId: 'c1',
    cinemaName: 'CGV Vincom Center Bà Triệu',
    capacity: 80,
    type: '3D',
    status: 'active'
  },
  {
    id: 'r3',
    name: 'Phòng 01',
    cinemaId: 'c2',
    cinemaName: 'Lotte Cinema Gò Vấp',
    capacity: 150,
    type: 'IMAX',
    status: 'active'
  },
  {
    id: 'r4',
    name: 'Phòng 02',
    cinemaId: 'c2',
    cinemaName: 'Lotte Cinema Gò Vấp',
    capacity: 100,
    type: '2D',
    status: 'maintenance'
  }
]

export function addRoom(room: Omit<Room, 'id' | 'cinemaName'>) {
  const cinema = cinemas.find(c => c.id === room.cinemaId)
  const newRoom = {
    ...room,
    id: 'r' + (rooms.length + 1),
    cinemaName: cinema?.name || 'Unknown'
  }
  rooms.push(newRoom)
  return newRoom
}

export function updateRoom(id: string, updated: Partial<Room>) {
  const index = rooms.findIndex(r => r.id === id)
  if (index !== -1) {
    if (updated.cinemaId) {
      const cinema = cinemas.find(c => c.id === updated.cinemaId)
      updated.cinemaName = cinema?.name || rooms[index].cinemaName
    }
    rooms[index] = { ...rooms[index], ...updated }
    return true
  }
  return false
}

export function deleteRoom(id: string) {
  const index = rooms.findIndex(r => r.id === id)
  if (index !== -1) {
    rooms.splice(index, 1)
    return true
  }
  return false
}
