/**
 * qr.service.ts
 * Tạo và hiển thị QR code vé xem phim
 */
import QRCode from 'qrcode'

// ---- Types ----
export interface TicketData {
  bookingCode: string
  movieTitle: string
  cinema: string
  date: string
  time: string
  seats: string[]
  customerName: string
  phone: string
  totalAmount: number   // VND, đã tính giảm giá
  paymentMethod: string
  selectedCombos?: Record<string, number>
  comboTotal?: number
  discountCode?: string
  pointsUsed?: number
}

// ---- Encode ticket data thành chuỗi cho QR ----
function encodeTicket(ticket: TicketData): string {
  // Dùng JSON compact để encode vào QR
  return JSON.stringify({
    id:      ticket.bookingCode,
    mv:      ticket.movieTitle,
    ci:      ticket.cinema,
    dt:      ticket.date,
    tm:      ticket.time,
    st:      ticket.seats.join(','),
    nm:      ticket.customerName,
    amt:     ticket.totalAmount,
    pay:     ticket.paymentMethod,
    ...(ticket.discountCode ? { dc: ticket.discountCode } : {}),
  })
}

// ---- Sinh QR vào canvas element ----
export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  ticket: TicketData,
): Promise<void> {
  const text = encodeTicket(ticket)
  await QRCode.toCanvas(canvas, text, {
    width: 220,
    margin: 2,
    color: {
      dark:  '#0a0a0f',   // QR squares – tối (khớp nền app)
      light: '#ffffff',   // nền trắng
    },
    errorCorrectionLevel: 'M',
  })
}

// ---- Sinh QR dạng Data URL (PNG base64) ----
export async function generateQRDataURL(ticket: TicketData): Promise<string> {
  const text = encodeTicket(ticket)
  return QRCode.toDataURL(text, {
    width: 440,
    margin: 3,
    color: { dark: '#0a0a0f', light: '#ffffff' },
    errorCorrectionLevel: 'M',
  })
}

// ---- Tải QR về máy dưới dạng PNG ----
export async function downloadQR(ticket: TicketData): Promise<void> {
  const dataURL = await generateQRDataURL(ticket)

  // Vẽ lại lên canvas to hơn có thêm text phía dưới
  const canvas = document.createElement('canvas')
  const W = 440, H = 560
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!

  // Nền trắng
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, W, H)

  // Vẽ QR image
  const img = new Image()
  img.src = dataURL
  await new Promise<void>(resolve => { img.onload = () => resolve() })
  ctx.drawImage(img, W / 2 - 220 / 2, 24, 220, 220)

  // Border nhẹ quanh QR
  ctx.strokeStyle = '#e5e4e7'
  ctx.lineWidth = 1
  ctx.strokeRect(W / 2 - 220 / 2 - 1, 23, 222, 222)

  // Text thông tin
  ctx.textAlign = 'center'
  ctx.fillStyle = '#08060d'
  ctx.font = 'bold 22px "Outfit", system-ui, sans-serif'
  ctx.fillText('🎬 CineBooking', W / 2, 278)

  ctx.font = 'bold 18px "Outfit", system-ui, sans-serif'
  ctx.fillStyle = '#ff3d5a'
  ctx.fillText(ticket.bookingCode, W / 2, 305)

  ctx.font = '14px "Outfit", system-ui, sans-serif'
  ctx.fillStyle = '#333'
  ctx.fillText(ticket.movieTitle, W / 2, 333)

  ctx.font = '13px system-ui, sans-serif'
  ctx.fillStyle = '#666'
  ctx.fillText(`${ticket.date}  •  ${ticket.time}`, W / 2, 356)
  ctx.fillText(`Ghế: ${ticket.seats.join(', ')}`, W / 2, 376)
  ctx.fillText(ticket.cinema, W / 2, 396)

  // Divider
  ctx.strokeStyle = '#e5e4e7'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(40, 414); ctx.lineTo(W - 40, 414)
  ctx.stroke()

  ctx.font = '13px system-ui, sans-serif'
  ctx.fillStyle = '#999'
  ctx.fillText('Xuất trình mã QR này khi đến rạp', W / 2, 433)

  ctx.font = 'bold 14px system-ui, sans-serif'
  ctx.fillStyle = '#0a0a0f'
  ctx.fillText(
    `Tổng: ${ticket.totalAmount.toLocaleString('vi-VN')} ₫  •  ${ticket.paymentMethod}`,
    W / 2, 454
  )

  ctx.font = '11px system-ui, sans-serif'
  ctx.fillStyle = '#bbb'
  ctx.fillText('Powered by CineBooking · cinebooking.vn', W / 2, 490)

  // Download
  const link = document.createElement('a')
  link.download = `ve-${ticket.bookingCode}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
