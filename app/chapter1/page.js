'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter1() {
  const router = useRouter()

  // Проверка авторизации
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
      }
    }

    checkAuth()
  }, [router])

  return (
    <div
      className="min-h-screen bg-[#0f1115] text-white select-none"
      onContextMenu={(e) => e.preventDefault()}
    >

      {/* ХЕДЕР */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="/chapter1header.jpg"
          draggable={false}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* ЗАГОЛОВОК */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Глава 1
        </h1>
      </div>

      {/* КОНТЕНТ */}
      <div className="max-w-3xl mx-auto px-6 space-y-6 pb-12">

        <img src="/rp1.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp3.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp4.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp5.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp6.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp7.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp8.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp9.png" draggable={false} className="w-full rounded-2xl" />

      </div>

      {/* НАВИГАЦИЯ */}
      <div className="max-w-3xl mx-auto px-6 pb-16 relative flex items-center justify-center">

        {/* На главную (центр) */}
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          На главную
        </button>

        {/* Глава 2 (справа) */}
        <button
          onClick={() => router.push('/chapter2')}
          className="absolute right-6 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 2
        </button>

      </div>

    </div>
  )
}