'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const getDeviceId = () => {
    let deviceId = localStorage.getItem('device_id')

    if (!deviceId) {
      deviceId = uuidv4()
      localStorage.setItem('device_id', deviceId)
    }

    return deviceId
  }

  const handleLogin = async (e:any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError('Неверный логин или пароль')
      setLoading(false)
      return
    }

    const userId = data.user.id
    const deviceId = getDeviceId()

    // проверяем устройство
    const { data: existingDevice } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', userId)
      .eq('device_id', deviceId)
      .single()

    if (!existingDevice) {

      const { data: devices } = await supabase
        .from('user_devices')
        .select('*')
        .eq('user_id', userId)

      if (devices && devices.length >= 3) {
        setError('Превышен лимит устройств (3)')
        await supabase.auth.signOut()
        setLoading(false)
        return
      }

      await supabase.from('user_devices').insert({
        user_id: userId,
        device_id: deviceId
      })

    }

    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-md space-y-4"
      >

        <h1 className="text-2xl font-semibold text-center mb-4">
          Вход
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 border border-zinc-700"
        />

        {error && (
          <div className="text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-zinc-700 rounded hover:bg-zinc-600 transition"
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>

      </form>

    </div>
  )
}