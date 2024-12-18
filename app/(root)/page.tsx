import Header from '@/components/shared/home/Header'
import Trend from '@/components/shared/home/Trend'
import React from 'react'

const Home = () => {
  return (
    <div className='bg-background'>
      <Header/>
      <div className='max-w-7xl mx-auto'>
       <Trend/>

      </div>
    </div>
  )
}

export default Home