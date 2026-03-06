'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const MAX_DEVICES = 3

  function getDeviceId() {

    let deviceId = localStorage.getItem('device_id')

    if (!deviceId) {
      deviceId = crypto.randomUUID()
      localStorage.setItem('device_id', deviceId)
    }

    return deviceId
  }

  const handleLogin = async () => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert('Ошибка входа')
      return
    }

    const user = data.user
    const deviceId = getDeviceId()

    // проверяем есть ли устройство
    const { data: existing } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', user.id)
      .eq('device_id', deviceId)
      .maybeSingle()

    if (existing) {
      router.push('/')
      return
    }

    // считаем устройства
    const { data: devices } = await supabase
      .from('user_devices')
      .select('*')
      .eq('user_id', user.id)

    if (devices.length >= MAX_DEVICES) {

      await supabase.auth.signOut()

      alert('Достигнут лимит устройств (3)')
      return
    }

    // добавляем устройство
    await supabase
      .from('user_devices')
      .insert({
        user_id: user.id,
        device_id: deviceId
      })

    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1115] text-white">

      <div className="w-[320px] space-y-4">

        <h1 className="text-2xl text-center">Вход</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-zinc-800 rounded"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-3 bg-zinc-800 rounded"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 bg-zinc-700 rounded hover:bg-zinc-600"
        >
          Войти
        </button>

      </div>

    </div>
  )
}