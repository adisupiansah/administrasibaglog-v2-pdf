import React from 'react';
import CardNotaDinas from '@/components/comp-notadinas/CardNotaDinas'
import TablesNotadinas from '@/components/comp-notadinas/TablesNotadinas'
import Title from '@/components/comp-title/Title'

const page = () => {

  return (
    <div>
        <Title title={"Nota dinas"} subTitle={"nota dinas > dashboard"}/>
        <CardNotaDinas/>
        <TablesNotadinas/>
    </div>
  )
}

export default page
