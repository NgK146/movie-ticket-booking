/**
 * Coupon.ts
 * Quản lý dữ liệu và logic mã giảm giá
 */

export interface Coupon {
  id: string
  code: string
  label: string
  type: 'percent' | 'fixed'
  value: number
  minOrder: number
  status: 'active' | 'expired'
}

export let coupons: Coupon[] = [
  {
    id: 'cp1',
    code: 'CINE10',
    label: 'Giảm 10% tổng hóa đơn',
    type: 'percent',
    value: 10,
    minOrder: 0,
    status: 'active'
  },
  {
    id: 'cp2',
    code: 'SAVE50K',
    label: 'Giảm 50.000đ cho đơn từ 200K',
    type: 'fixed',
    value: 50000,
    minOrder: 200000,
    status: 'active'
  },
  {
    id: 'cp3',
    code: 'WELCOME',
    label: 'Giảm 20% cho thành viên mới',
    type: 'percent',
    value: 20,
    minOrder: 100000,
    status: 'active'
  },
  {
    id: 'cp4',
    code: 'EXPIRED2024',
    label: 'Mã đã hết hạn',
    type: 'fixed',
    value: 20000,
    minOrder: 0,
    status: 'expired'
  }
]

export function addCoupon(coupon: Omit<Coupon, 'id'>) {
  const newCoupon = {
    ...coupon,
    id: 'cp' + (coupons.length ? Math.max(...coupons.map(c => parseInt(c.id.slice(2)))) + 1 : 1)
  }
  coupons.push(newCoupon)
  return newCoupon
}

export function updateCoupon(id: string, updated: Partial<Coupon>) {
  const index = coupons.findIndex(c => c.id === id)
  if (index !== -1) {
    coupons[index] = { ...coupons[index], ...updated }
    return true
  }
  return false
}

export function deleteCoupon(id: string) {
  const index = coupons.findIndex(c => c.id === id)
  if (index !== -1) {
    coupons.splice(index, 1)
    return true
  }
  return false
}
