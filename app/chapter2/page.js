'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter2() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => window.removeEventListener('resize', checkScreen)
  }, [])

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

        {isMobile ? (
          <>
            <img src="/mobile/rp2-1m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-2m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-3m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-4m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-5m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-6m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-7m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-8m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-9m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-10m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-11m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-12m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-13m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-14m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-15m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-16m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-17m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-18m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-19m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-20m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-21m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-22m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp2-23m.png" draggable={false} className="w-full rounded-2xl" />
          </>
        ) : (
          <>
            <img src="/rp2-1.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-2.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-3.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-4.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-5.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-6.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-7.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-8.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp2-9.png" draggable={false} className="w-full rounded-2xl" />
          </>
        )}

      </div>

      {/* НАВИГАЦИЯ */}
      <div className="max-w-3xl mx-auto px-6 pb-16 relative flex items-center justify-center">

        {/* Предыдущая глава */}
        <button
          onClick={() => router.push('/chapter1')}
          className="absolute left-6 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 1
        </button>

        {/* Главная */}
        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          На главную
        </button>

        {/* Следующая глава */}
        <button
          onClick={() => router.push('/chapter3')}
          className="absolute right-6 px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 3
        </button>

      </div>

    </div>
  )
}