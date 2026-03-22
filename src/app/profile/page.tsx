'use client'

import { Profile } from '@/_pages'

// Моковые данные (в реальности будут приходить из API/аутентификации)
const psychologistData = {
	photoUrl:
		'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
	full_name: 'Иванова Мария Александровна',
	email: 'maria.ivanova@psychology.com',
	phone: '+7 (999) 123-45-67',
	about: `# Привет! 👋

Я **профессиональный психолог** с *более чем 10-летним опытом* работы.

## Мои специализации:
- Индивидуальное консультирование
- Семейная терапия
- Работа с тревожностью и депрессией
- Личностный рост

## Образование:
1. МГУ им. Ломоносова - Факультет психологии
2. Московский Институт Психоанализа

> Важно: я создаю безопасное пространство для каждого клиента!

**Давайте вместе сделаем вашу жизнь счастливее!** 🌟`,
	publicUrl: 'https://psychology.example.com/specialist/maria-ivanova',
}

export default function ProfilePage() {
	return <Profile />
}
