'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter2() {
  const router = useRouter()

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
          src="/chapter2header.jpg"
          draggable={false}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* ЗАГОЛОВОК */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Глава 2
        </h1>
      </div>

      {/* КОНТЕНТ */}
      <div className="max-w-3xl mx-auto px-6 space-y-6 pb-12">

        <img src="/rp2-1.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-2.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-3.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-4.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-5.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-6.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-7.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-8.png" draggable={false} className="w-full rounded-2xl" />
        <img src="/rp2-9.png" draggable={false} className="w-full rounded-2xl" />

      </div>

      {/* НАВИГАЦИЯ */}
      <div className="max-w-3xl mx-auto px-6 pb-16 flex justify-between items-center">

        {/* Предыдущая глава */}
        <button
          onClick={() => router.push('/chapter1')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 1
        </button>

        {/* На главную */}
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          На главную
        </button>

       {/* Следующая глава */}
        <button
          onClick={() => router.push('/chapter3')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 3
        </button>

      </div>

    </div>
  )
}