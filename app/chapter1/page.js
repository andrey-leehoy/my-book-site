'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Chapter1() {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.replace('/login')
      } else {
        setAuthorized(true)
      }

      setChecking(false)
    }

    checkAuth()
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">
        Проверка доступа...
      </div>
    )
  }

  if (!authorized) return null

  return (
    <div
      className="min-h-screen bg-[#0f1115] text-white select-none"
      onContextMenu={(e) => e.preventDefault()}
    >

      {/* Хедер */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="/chapter1header.jpg"
          className="w-full h-full object-cover pointer-events-none"
          alt="Header"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-semibold mb-8 text-center">
          Глава 1 — Начало
        </h1>

        {/* Картинки */}
        <div className="space-y-6 mb-12 relative">

          <div className="absolute inset-0 z-10" />

          {[
            '/rp1.png',
            '/rp2.png',
            '/rp3.png',
            '/rp4.png',
            '/rp5.png',
            '/rp6.png',
            '/rp7.png',
            '/rp8.png',
            '/rp9.png',
          ].map((src, index) => (
            <img
              key={index}
              src={src}
              className="w-full rounded-2xl pointer-events-none"
              draggable={false}
              alt=""
            />
          ))}

        </div>

        {/* Навигация */}
        <div className="flex justify-between items-center">

          <div className="w-32"></div>

          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition"
          >
            На главную
          </button>

          <button
            onClick={() => router.push('/chapter2')}
            className="px-6 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition"
          >
            Следующая глава →
          </button>

        </div>

      </div>
    </div>
  )
}