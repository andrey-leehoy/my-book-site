'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const chapters = [
    { title: 'Глава 1 — Начало', path: '/chapter1' },
  ]

  return (
    <div className="min-h-screen bg-[#0f1115] text-white">

      <div className="relative h-72 w-full overflow-hidden">
        <img
          src="/header.jpg"
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-semibold mb-10 text-center">
          Случайный Прометей
        </h1>

        <div className="grid grid-cols-1 gap-6">
          {chapters.map((chapter, index) => (
            <div
              key={index}
              onClick={() => router.push(chapter.path)}
              className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition"
            >
              {chapter.title}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}