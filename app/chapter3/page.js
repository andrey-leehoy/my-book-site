'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter3() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

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

  // Проверка экрана
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
          src="/chapter3header.jpg"
          draggable={false}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* ЗАГОЛОВОК */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Глава 3
        </h1>
      </div>

      {/* КОНТЕНТ */}
      <div className="max-w-3xl mx-auto px-6 space-y-6 pb-12">

        {isMobile ? (
          <>
            <img src="/mobile/rp3-1m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-2m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-3m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-4m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-5m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-6m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-7m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-8m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-9m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-10m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-11m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-12m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-13m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-14m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-15m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-16m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-17m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-18m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-19m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp3-20m.png" draggable={false} className="w-full rounded-2xl" />

          </>
        ) : (
          <>
            <img src="/rp3-1.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-2.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-3.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-4.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-5.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-6.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp3-7.png" draggable={false} className="w-full rounded-2xl" />          </>
        )}

      </div>

      {/* КНОПКИ */}
      <div className="max-w-3xl mx-auto px-6 pb-20 flex justify-between items-center">

        <button
          onClick={() => router.push('/chapter2')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 2
        </button>

        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          На главную
        </button>

        <button
          onClick={() => router.push('/chapter4')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 4
        </button>

      </div>

    </div>
  )
}