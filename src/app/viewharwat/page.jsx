'use client'
import ViewHarwat from '@/components/component-client/comp-viewharwat/ViewHarwat'
import React, {useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
const page = () => {
  const router = useRouter()
  
    const pesan = () => {
      Swal.fire({
        title: 'Error',
        text: 'Mohon Maaf Halaman Ini Sedang Dalam Perbaikan',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: "#72bf78",
        allowOutsideClick: false,
        allowEscapeKey: false,
        color: "#D9D9D9",
        background: "#212529",
      }).then((reslut) => {
        if (reslut.isConfirmed) {
          router.push('/')
        }
      })
  
      return null
    }
  
    useEffect(() => {
      pesan()
    }, [router])
  return (
    <div>
      <ViewHarwat />
    </div>
  )
}

export default page
