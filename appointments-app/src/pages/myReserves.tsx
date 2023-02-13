import Navbar from '@/components/Navbar'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const myReserves = () => {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token) router.push('login')
  }, [])

  return (
    <div>
      <Navbar />
      myReserves
    </div>
  )
}

export default myReserves