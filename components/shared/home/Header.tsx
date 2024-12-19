import React from 'react';
import Navbar from '@/components/shared/home/Navbar';
import { FlipWords } from '@/components/ui/flip-words';
import { Button } from '@/components/ui/button';
const Header = () => {
  const words = ["Movie", "Game", "Tv serie", "Anime"];
  return (
    <div className='bg-hero-pattern md:h-screen bg-cover bg-center relative pb-3'>
      <div className='max-w-[1400px] mx-auto  px-2'>
        <Navbar/>
        <div className="container mx-auto px-4 pt-16 text-center">
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
          Access Always Up-to-date<br />
          <span className="">
            <FlipWords className='text-secondary' words={words} /> 
            </span> Catalogs
        </h1>
        <p className="text-gray-400 mb-16">
          Dream Big with Movies at Only 400 MGA – Start Your Order
        </p>

        {/* Cards Section */}
        <div className="relative ">
          {/* Horizontal Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          
          <div className="relative flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
            {/* Movie Card */}
            <div className="w-64 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
              <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-3xl font-bold" style={{
                  background: 'linear-gradient(to bottom, #ff00cc, #3333cc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  MOVIE<br />TIME
                </div>
                <Button variant="secondary" className="absolute bottom-4 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                  Discover
                </Button>
              </div>
            </div>

            {/* Game Card */}
            <div className="w-72 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
              <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center ">
                <div className="text-3xl font-bold" style={{
                    background: 'linear-gradient(to bottom, #405FBA, #1D2B54)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    GAME<br />
                  </div>
                <Button variant="secondary" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                  Discover
                </Button>
              </div>
            </div>

            {/* Anime Card */}
            <div className="w-64 bg-white rounded-3xl p-2 transform transition-transform hover:scale-105">
              <div className="aspect-[9/16] relative bg-[#1a0b2e] rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-4xl font-bold text-white">
                  ANIME
                </div>
                <Button variant="secondary" className="absolute bottom-4 w-3/4 bg-primary text-white hover:bg-[#3d2a54]">
                  Discover
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-16 md:gap-32">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-gray-400">movie</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1K+</div>
              <div className="text-gray-400">Game</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">5K+</div>
              <div className="text-gray-400">Anime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Header;
