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

  // Блокировка горячих клавиш
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div
      className="min-h-screen bg-[#0f1115] text-white select-none"
      onContextMenu={(e) => e.preventDefault()}
    >

      {/* Хедер */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="/chapter1header.jpg"
          draggable={false}
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* Контент */}
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6">

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

    </div>
  )
}