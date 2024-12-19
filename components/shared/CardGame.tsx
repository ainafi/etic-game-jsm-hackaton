import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface IGame {
  id:string,
  background_image: string;
  name: string;
}

const CardGame = React.forwardRef<HTMLDivElement, IGame>(({ background_image, name,id }, ref) => {
  return (
    <div ref={ref} className='w-[300px]'>
      <Image className='rounded-lg h-[300px] object-cover' src={background_image} width={300} height={300} alt='game' />
      <div className='my-4'>
        <h2>{name}</h2>
      </div>
      <div>
        <Link href={`/game/feed/${id}`}>
        <Button className='mr-4 bg-transparent border border-primary '>details</Button>
        </Link>
        <Button>Order</Button>
      </div>
    </div>
  );
});

CardGame.displayName = 'CardGame';

export default CardGame;
