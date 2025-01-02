import PengajuanNotaDinas from '@/components/comp-notadinas/Pengajuan'
import Title from '@/components/comp-title/Title'
import React from 'react'
import { Card } from 'primereact/card'
const Pengajuan = () => {
  return (
    <div>
      <Title title={"Nota dinas"} subTitle={"nota dinas > pengajuan"}/>
      <PengajuanNotaDinas/>
     
    </div>
  )
}

export default Pengajuan
