import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import useCartStore from '@/store/useStore';

interface IGame {
  id: number;
  background_image: string;
  name: string;
}

const CardGame = React.forwardRef<HTMLDivElement, IGame>(({ background_image, name, id }, ref) => {
  const addToCart = useCartStore((state) => state.addToCart);
  
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
        <Button onClick={() => addToCart({ id, name, background_image })}>Order</Button>
      </div>
    </div>
  );
});

CardGame.displayName = 'CardGame';

export default CardGame;
