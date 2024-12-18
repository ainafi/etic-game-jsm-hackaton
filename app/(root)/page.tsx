import BentoGrid from '@/components/shared/home/Bento'
import { FAQ } from '@/components/shared/home/Faq'
import Footer from '@/components/shared/home/Footer'
import Header from '@/components/shared/home/Header'
import Trend from '@/components/shared/home/Trend'
import React from 'react'

const Home = () => {
  return (
    <div className='bg-background'>
      <Header/>
      <div className='max-w-7xl mx-auto'>
       <Trend/>
      <BentoGrid/>
      <FAQ/>
      <Footer/>
      </div>
    </div>
  )
}

export default Home