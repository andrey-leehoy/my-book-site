'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    // 1️⃣ Логин
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      alert(error?.message || 'Ошибка входа')
      setLoading(false)
      return
    }

    const user = data.user

    // 2️⃣ Проверяем устройства
    const { data: devices, error: devicesError } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', user.id)

    if (devicesError) {
      alert('Ошибка проверки устройств')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    // 3️⃣ Лимит 3 устройства
    if (devices.length >= 3) {
      await supabase.auth.signOut()
      alert('Достигнут лимит устройств (3)')
      setLoading(false)
      return
    }

    // 4️⃣ Создаём device_id
    const deviceId = crypto.randomUUID()

    const { error: insertError } = await supabase
      .from('user_devices')
      .insert({
        user_id: user.id,
        device_id: deviceId,
      })

    if (insertError) {
      alert('Ошибка сохранения устройства')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    // 5️⃣ Сохраняем в браузере
    localStorage.setItem('device_id', deviceId)

    // 6️⃣ Переход на главную
    router.replace('/')

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-80 space-y-4 border border-white/10"
      >

        <h1 className="text-2xl font-semibold text-center">
          Вход
        </h1>

        <input
          type="email"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-white/10"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-zinc-800 border border-white/10"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded-lg hover:opacity-80 transition"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

      </form>

    </div>
  )
}