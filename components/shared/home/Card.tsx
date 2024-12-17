
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
    <div className='bg-white w-[150px] md:w-[300px] md:h-[420px] h-[230px] p-2 rounded-2xl'>
        <Image className='w-[300px]' src={image} width={200} height={300} alt={"image"}/>
        <div className='pt-3'>
            <Link href={`/${link}`}>
                <Button className='w-full bg-primary'>Discover</Button>
            </Link>
        </div>
    </div>
  )
}

export default Card