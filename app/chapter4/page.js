'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter4() {
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
          src="/chapter4header.jpg"
          draggable={false}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* ЗАГОЛОВОК */}
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Глава 4
        </h1>
      </div>

      {/* КОНТЕНТ */}
      <div className="max-w-3xl mx-auto px-6 space-y-6 pb-12">

        {isMobile ? (
          <>
            <img src="/mobile/rp4-1m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-2m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-3m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-4m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-5m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-6m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-7m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-8m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-9m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-10m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-11m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-12m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-13m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-14m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-15m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-16m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-17m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-18m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-19m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-20m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-21m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-22m.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/mobile/rp4-23m.png" draggable={false} className="w-full rounded-2xl" />
            
          </>
        ) : (
          <>
            <img src="/rp4-1.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-2.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-3.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-4.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-5.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-6.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-7.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-8.png" draggable={false} className="w-full rounded-2xl" />
            <img src="/rp4-9.png" draggable={false} className="w-full rounded-2xl" />
          </>
        )}

      </div>

      {/* КНОПКИ */}
      <div className="max-w-3xl mx-auto px-6 pb-20 flex justify-between items-center">

        <button
          onClick={() => router.push('/chapter3')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Глава 3
        </button>

        <button
          onClick={() => router.push('/')}
          className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          На главную
        </button>

        <div className="w-[110px]" />

      </div>

    </div>
  )
}