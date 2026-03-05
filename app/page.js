'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {

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

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

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

      {/* кнопка выхода */}

      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm border border-white/20 rounded-lg hover:bg-white/10 transition"
        >
          Выйти
        </button>
      </div>

      {/* хедер */}

      <div className="relative h-80 w-full overflow-hidden">
        <img
          src="/header.jpg"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1115]/40 to-[#0f1115]" />
      </div>

      {/* название книги */}

      <div className="text-center mt-10 mb-12">

        <h1 className="text-4xl font-semibold">
          Случайный Прометей
        </h1>

      </div>

      {/* сетка глав */}

      <div className="max-w-5xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-2 gap-6">

          {/* Глава 1 */}

          <div
            onClick={() => router.push('/chapter1')}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
          >

            <img
              src="/chapter1header.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/70 to-transparent" />

            <div className="relative p-6">

              <h2 className="text-xl font-semibold">
                Глава 1
              </h2>

            </div>

          </div>


          {/* Глава 2 */}

          <div
            onClick={() => router.push('/chapter2')}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
          >

            <img
              src="/chapter2header.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/70 to-transparent" />

            <div className="relative p-6">

              <h2 className="text-xl font-semibold">
                Глава 2
              </h2>

            </div>

          </div>


          {/* Глава 3 */}

          <div
            onClick={() => router.push('/chapter3')}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
          >

            <img
              src="/chapter3header.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/70 to-transparent" />

            <div className="relative p-6">

              <h2 className="text-xl font-semibold">
                Глава 3
              </h2>

            </div>

          </div>


          {/* Глава 4 */}

          <div
            onClick={() => router.push('/chapter4')}
            className="relative cursor-pointer rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition"
          >

            <img
              src="/chapter4header.jpg"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#0f1115] via-[#0f1115]/70 to-transparent" />

            <div className="relative p-6">

              <h2 className="text-xl font-semibold">
                Глава 4
              </h2>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}