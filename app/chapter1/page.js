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
        return
      }

      const session = data.session

      // 👇 ВОТ ЗДЕСЬ ДОБАВЛЯЕМ ПРОВЕРКУ УСТРОЙСТВ

      const { data: devices } = await supabase
        .from('user_devices')
        .select('*')
        .eq('user_id', session.user.id)

      if (devices.length > 3) {
        await supabase.auth.signOut()
        router.replace('/login')
        return
      }

      // 👆 конец проверки устройств

      setAuthorized(true)
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
    <div className="min-h-screen bg-[#0f1115] text-white">

      {/* Хедер */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="/chapter1header.jpg"
          className="w-full h-full object-cover"
          alt="Header"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">

        <h1 className="text-3xl font-semibold mb-8 text-center">
          Глава 1 — Начало
        </h1>

        <div className="space-y-6">
          <img src="/rp1.png" className="w-full" />
          <img src="/rp2.png" className="w-full" />
          <img src="/rp3.png" className="w-full" />
          <img src="/rp4.png" className="w-full" />
          <img src="/rp5.png" className="w-full" />
          <img src="/rp6.png" className="w-full" />
          <img src="/rp7.png" className="w-full" />
          <img src="/rp8.png" className="w-full" />
          <img src="/rp9.png" className="w-full" />
        </div>

      </div>

    </div>
  )
}