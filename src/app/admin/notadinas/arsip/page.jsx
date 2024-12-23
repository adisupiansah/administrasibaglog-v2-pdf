import ArsipNotaDinas from '@/components/comp-notadinas/ArsipNotaDinas'
import Title from '@/components/comp-title/Title'
import React from 'react'

const Arsip = () => {
  return (
    <div>
      <Title title={"Nota Dinas"} subTitle={"nota dinas > arsip"}/>
      <ArsipNotaDinas/>
    </div>
  )
}

export default Arsip
