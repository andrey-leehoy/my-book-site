'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
        return
      }

      setUser(data.session.user)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">
        Проверка доступа...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f1115] text-white relative">

      {/* КНОПКА ВЫХОДА */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="px-5 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Выйти
        </button>
      </div>

      {/* ХЕДЕР */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src="/header.jpg"
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* КНИГА */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-4xl font-semibold">
          Случайный Прометей
        </h1>
      </div>

      {/* ГЛАВЫ */}
      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 gap-6">

        <a href="/chapter1" className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition">
          Глава 1
        </a>

        <a href="/chapter2" className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition">
          Глава 2
        </a>

        <a href="/chapter3" className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition">
          Глава 3
        </a>

        <a href="/chapter4" className="p-6 border border-white/10 rounded-2xl hover:border-white/20 transition">
          Глава 4
        </a>

      </div>

    </div>
  )
}