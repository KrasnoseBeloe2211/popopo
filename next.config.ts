import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	reactCompiler: true,
	async headers() {
		return [
			{
				source: '/api/:path*', // Применяется ко всем API маршрутам
				headers: [
					{ key: 'Access-Control-Allow-Credentials', value: 'true' },
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
					},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Type, Authorization',
					},
				],
			},
			// Можно добавить для статических файлов, если нужно
			{
				source: '/static/:path*',
				headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
			},
		]
	},
}

export default nextConfig
