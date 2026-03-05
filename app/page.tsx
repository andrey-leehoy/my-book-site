'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

export default function Home() {
  const router = useRouter()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

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
    <div className="min-h-screen bg-[#0f1115] text-white">

      {/* Кнопка выхода */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-zinc-800 border border-zinc-600 rounded-lg hover:bg-zinc-700 transition"
        >
          Выйти
        </button>
      </div>

      <div className="p-10">
        <h1 className="text-3xl font-semibold mb-8">
          Случайный Прометей
        </h1>

        <div className="grid grid-cols-2 gap-6">

          <a href="/chapter1" className="p-6 border border-white/10 rounded-2xl">
            Глава 1
          </a>

          <a href="/chapter2" className="p-6 border border-white/10 rounded-2xl">
            Глава 2
          </a>

          <a href="/chapter3" className="p-6 border border-white/10 rounded-2xl">
            Глава 3
          </a>

          <a href="/chapter4" className="p-6 border border-white/10 rounded-2xl">
            Глава 4
          </a>

        </div>
      </div>

    </div>
  )
}