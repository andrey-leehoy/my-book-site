'use client'

import { useRouter } from 'next/navigation'

export default function Chapter1() {

  const router = useRouter()

  return (

    <div className="min-h-screen bg-[#0f1115] text-white">

      {/* Хедер */}

      <div className="relative h-64 w-full overflow-hidden">

        <img
          src="/chapter1header.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />

      </div>

      {/* Контент */}

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-semibold mb-8 text-center">
          Глава 1 — Начало
        </h1>

        <div className="space-y-6">

          <img src="/rp1.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp2.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp3.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp4.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp5.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp6.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp7.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp8.png" className="w-full rounded-2xl select-none pointer-events-none" />
          <img src="/rp9.png" className="w-full rounded-2xl select-none pointer-events-none" />

        </div>

        {/* Навигация */}

        <div className="flex justify-between items-center mt-16">

          <div></div>

          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition"
          >
            На главную
          </button>

          <button
            onClick={() => router.push('/chapter2')}
            className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition"
          >
            Следующая глава
          </button>

        </div>

      </div>

    </div>

  )
}