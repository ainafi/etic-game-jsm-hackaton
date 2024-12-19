import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface IAnime {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
      };
    };
}

const CardAnime = React.forwardRef<HTMLDivElement, IAnime>(({ mal_id, title, images }, ref) => {
  return (
    <div ref={ref} className='w-[300px]'>
      <Image className='rounded-lg h-[300px] object-cover' src={images.jpg.image_url} width={300} height={300} alt='anime' />
      <div className='my-4'>
        <h2>{title}</h2>
      </div>
      <div>
        <Link href={`/anime/feed/${mal_id}`}>
          <Button className='mr-4 bg-transparent border border-primary'>details</Button>
        </Link>
        <Button>Order</Button>
      </div>
    </div>
  );
});

CardAnime.displayName = 'CardAnime';

export default CardAnime;
