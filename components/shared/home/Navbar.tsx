import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center py-4'>
        <div className='flex items-center'>
            <Link href={"/"}>
                <Image src={"/image/logo.png"} width={70} height={100} alt='logo'/>
            </Link>
            <h2 className='font-bold text-white'>Etic <span className='text-secondary'>Game</span></h2>
        </div>
        <Link href={"/sign-up"}>
            <Button className='bg-primary rounded-xl'>Signup</Button>
        </Link>
    </nav>
  )
}

export default Navbar