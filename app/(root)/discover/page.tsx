import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Discover = () => {
  return (
    <>
    <main className='bg-background h-screen flex items-center justify-center'>
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
        {/* Movie Card */}
        <div className="w-52 md:w-64 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
            <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="text-3xl font-bold text-center" style={{
                background: 'linear-gradient(to bottom, #ff00cc, #3333cc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
            }}>
                MOVIE<br />TV SERIE
            </div>
           
            <Link href="/movie/feed" >
                <Button variant="secondary" className="absolute left-8 bottom-4 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                    Discover
                </Button>
            </Link>
            </div>
        </div>

        {/* Game Card */}
        <div className="w-52 md:w-72 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
            <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center ">
            <div className="text-3xl font-bold" style={{
                background: 'linear-gradient(to bottom, #405FBA, #1D2B54)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
                }}>
                GAME<br />
                </div>
            <Link href="/game/feed" >
                <Button variant="secondary" className="absolute  bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                    Discover
                </Button>
            </Link>
            </div>
        </div>

        {/* Anime Card */}
        <div className="w-52 md:w-64 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
            <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center">
            <div className="text-4xl font-bold text-white">
                ANIME
            </div>
            <Link href="/anime/feed" >
                <Button variant="secondary" className="absolute  left-8 bottom-4 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                    Discover
                </Button>
            </Link>
            </div>
        </div>
        </div>
    </main>
    </>
  )
}

export default Discover