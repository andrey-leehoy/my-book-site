'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // получение ID устройства
  function getDeviceId() {
    let deviceId = localStorage.getItem('device_id')

    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem('device_id', deviceId)
    }

    return deviceId
  }

  async function handleLogin(e: any) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError('Неверный email или пароль')
      setLoading(false)
      return
    }

    const user = data.user
    const deviceId = getDeviceId()

    // получаем список устройств пользователя
    const { data: devices } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', user.id)

    const existingDevice = devices?.find(
      (d) => d.device_id === deviceId
    )

    // если устройство новое
    if (!existingDevice) {

      if (devices && devices.length >= 3) {
        setError('Достигнут лимит устройств (3)')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      await supabase
        .from('user_devices')
        .insert({
          user_id: user.id,
          device_id: deviceId
        })
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 bg-[#151821] p-8 rounded-2xl"
      >

        <h1 className="text-2xl font-semibold text-center">
          Вход
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 bg-[#0f1115] border border-white/10 rounded-lg"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 bg-[#0f1115] border border-white/10 rounded-lg"
        />

        {error && (
          <div className="text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <button
          disabled={loading}
          className="w-full py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

      </form>

    </div>
  )
}