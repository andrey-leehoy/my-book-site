'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const chapters = [
    { title: 'Глава 1 — Начало', image: '/chapter1header.jpg', path: '/chapter1' },
    { title: 'Глава 2 — Путь', image: '/chapter2header.jpg', path: '/chapter2' },
    { title: 'Глава 3 — Испытание', image: '/chapter3header.jpg', path: '/chapter3' },
    { title: 'Глава 4 — Пробуждение', image: '/chapter4header.jpg', path: '/chapter4' },
  ]

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">

      {/* Шапка */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src="/header.jpg"
          alt="Header"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-semibold mb-12 text-center">
          Случайный Прометей
        </h1>

        {/* 2 ряда (по 2 блока) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => router.push(chapter.path)}
              className="cursor-pointer relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-600 transition"
            >

              <div className="flex h-40">

                {/* Текст слева */}
                <div className="w-1/2 p-6 flex items-center">
                  <h2 className="text-lg font-medium leading-snug">
                    {chapter.title}
                  </h2>
                </div>

                {/* Картинка справа */}
                <div className="w-1/2 relative">
                  <img
                    src={chapter.image}
                    alt={chapter.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-900" />
                </div>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  )
}