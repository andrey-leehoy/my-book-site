'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
        return
      }

      setLoading(false)
    }

    checkAuth()
  }, [router])

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

      {/* Кнопка выхода */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-zinc-800 border border-zinc-600 rounded-lg hover:bg-zinc-700 transition"
        >
          Выйти
        </button>
      </div>

      {/* Хедер */}
      <div className="relative h-72 w-full overflow-hidden">
        <img
          src="/header.jpg"
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* Название */}
      <div className="text-center mt-10 mb-12">
        <h1 className="text-4xl font-semibold">
          Случайный Прометей
        </h1>
      </div>

      {/* Главы */}
      <div className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-2 gap-6">

        {/* Глава 1 */}
        <a href="/chapter1" className="relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">

          <img
            src="/chapter1header.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/60 to-transparent" />

          <div className="relative z-10 p-6 text-lg font-medium">
            Глава 1
          </div>

        </a>

        {/* Глава 2 */}
        <a href="/chapter2" className="relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">

          <img
            src="/chapter2header.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/60 to-transparent" />

          <div className="relative z-10 p-6 text-lg font-medium">
            Глава 2
          </div>

        </a>

        {/* Глава 3 */}
        <a href="/chapter3" className="relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">

          <img
            src="/chapter3header.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/60 to-transparent" />

          <div className="relative z-10 p-6 text-lg font-medium">
            Глава 3
          </div>

        </a>

        {/* Глава 4 */}
        <a href="/chapter4" className="relative h-40 rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition">

          <img
            src="/chapter4header.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/60 to-transparent" />

          <div className="relative z-10 p-6 text-lg font-medium">
            Глава 4
          </div>

        </a>

      </div>

    </div>
  )
}