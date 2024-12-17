import React from 'react'
import Card from './Card'
import { Categories, Stat } from '@/constant'

const CardHero = () => {
  return (
    <div className='bg-stat-pattern w-full h-[350px] md:h-[400px] bg-cover bg-center mt-36 rounded-xl p-2 pb-4 relative'>
        <div className='max-w-5xl mx-auto'>
            <div className='absolute top-20 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-6'>
                    {Categories.map((category) => (
                        <Card key={category.id}  {...category}/>
                    ))}
                </div>
            </div>
            <div className='md:mt-[320px] mt-[250px] flex justify-between text-white z-40'>
                {Stat.map((stat)=>(
                    <div className='text-white text-center  ' key={stat.id}>
                        <div>
                            <h2 className='text-4xl font-semibold'>{stat.count}</h2>
                            <p className='text-md capitalize'>{stat.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default CardHero