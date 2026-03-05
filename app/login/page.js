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

    // 1️⃣ Вход
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    const user = data.user

    if (!user) {
      setLoading(false)
      return
    }

    // 2️⃣ Получаем или создаём device_id
    let deviceId = localStorage.getItem('device_id')

    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem('device_id', deviceId)
    }

    // 3️⃣ Проверяем устройства пользователя
    const { data: devices, error: devicesError } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', user.id)

    if (devicesError) {
      alert(devicesError.message)
      setLoading(false)
      return
    }

    const isNewDevice = !devices.find(
      (d) => d.device_id === deviceId
    )

    // 4️⃣ Если это новое устройство и лимит достигнут
    if (isNewDevice && devices.length >= 3) {
      alert('Достигнут лимит устройств (максимум 3).')
      await supabase.auth.signOut()
      setLoading(false)
      return
    }

    // 5️⃣ Если новое устройство — сохраняем его
    if (isNewDevice) {
      const { error: insertError } = await supabase
        .from('user_devices')
        .insert({
          user_id: user.id,
          device_id: deviceId,
        })

      if (insertError) {
        alert(insertError.message)
        setLoading(false)
        return
      }
    }

    // 6️⃣ Переход на главную
    router.push('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#161a20] p-8 rounded-2xl border border-zinc-800"
      >
        <h1 className="text-2xl mb-6 text-center">Вход</h1>

        <input
          type="email"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-[#0f1115] border border-zinc-700"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-lg bg-[#0f1115] border border-zinc-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-zinc-500 transition"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

    </div>
  )
}