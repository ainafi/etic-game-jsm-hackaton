import React from 'react';
import Navbar from '@/components/shared/home/Navbar';
import { FlipWords } from '@/components/ui/flip-words';
import CardHero from './CardHero';

const Header = () => {
  const words = ["Movie", "Game", "Tv serie", "Anime"];
  return (
    <div className='bg-hero-pattern h-screen bg-cover bg-center relative'>
      <div className='max-w-[1400px] mx-auto  px-2'>
        <Navbar/>
        <div>
          <h1 className='text-white font-extrabold text-center mt-36 text-3xl leading-[44px]'>Access Always Up-to-date
            <br />
            <FlipWords words={words} className='text-secondary'/>
            Catalogs
          </h1>
          <div className='flex items-center justify-center'>
            <p className='text-white text-center  mt-5 w-[300px]'>Dream Big with Movies at Only Ar400 – Start Your Order</p>
          </div>
        </div>
        <CardHero/>
      </div>
    </div>
  );
};

export default Header;
