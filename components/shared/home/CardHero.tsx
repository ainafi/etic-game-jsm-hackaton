import React from 'react'
import Card from './Card'
import { Categories } from '@/constant'

const CardHero = () => {
  return (
    <div className='bg-stat-pattern w-full h-[425px] bg-cover bg-center mt-36 rounded-xl p-2 relative'>
        <div className='max-w-4xl mx-auto'>
            <div className='absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-6'>
                    {Categories.map((category) => (
                        <Card key={category.id}  {...category}/>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CardHero