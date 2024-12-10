// import Image from 'next/image'
import React from 'react'

import { Input } from '../ui/input'
import { Search } from 'lucide-react'
const Navbar = () => {

  return (
    <div className='flex items-center justify-center relative'>
        
        <div>
            <Input className='w-[30rem]' placeholder="Search" />
            <Search className='absolute top-1 right-3'/>
        </div>
    </div>
  )
}

export default Navbar