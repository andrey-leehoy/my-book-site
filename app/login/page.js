'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (!error) {
      router.push('/chapter1')
    } else {
      alert('Ошибка входа')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#1c1f24] to-[#0f1115] text-white relative overflow-hidden">

      {/* Сплющенный мягкий свет */}
      <div
        className="absolute top-0 left-0 w-full h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.07), transparent 70%)',
        }}
      />

      {/* Карточка */}
      <div className="w-full max-w-sm p-8 rounded-2xl bg-zinc-900 border border-zinc-800 relative z-10">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Вход в библиотеку
        </h1>

        <input
          type="email"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:border-zinc-500 transition"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          {loading ? 'Входим...' : 'Войти'}
        </button>

      </div>
    </div>
  )
}