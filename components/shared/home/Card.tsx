
import React from 'react'
import Image, { StaticImageData }  from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ICard{
    link:string,
    image:StaticImageData
}
const Card = ({link,image}:ICard) => {
  return (
    <>

        <div className='bg-white w-[100px] md:w-[200px] md:h-[300px] lg:w-[300px] lg:h-[420px] h-[170px] p-2 rounded-2xl'>
            <Image className='w-[300px]' src={image} width={100} height={300} alt={"image"}/>
            <div className='pt-3'>
                <Link href={`/${link}`}>
                    <Button className='w-full bg-primary text-xs'>Discover</Button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Card