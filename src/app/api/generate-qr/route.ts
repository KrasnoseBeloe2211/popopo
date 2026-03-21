import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { url } = await request.json()

		if (!url) {
			return NextResponse.json(
				{ error: 'URL обязателен' },
				{ status: 400 }
			)
		}

		// Генерация QR-кода через внешний API
		const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}&color=000000&bgcolor=ffffff`

		// Возвращаем URL для изображения QR-кода
		return NextResponse.json({
			qrCodeUrl: qrApiUrl,
		})
	} catch (error) {
		console.error('Ошибка генерации QR-кода:', error)
		return NextResponse.json(
			{ error: 'Ошибка генерации QR-кода' },
			{ status: 500 }
		)
	}
}
