// app/feed/[id]/page.tsx
"use client"
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/lib/fetchdata';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Recommendation from '@/components/shared/Recommendation';
// Define the type for movie data
interface Genre{
  id:string;
  name:string
}
interface Movie {
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average:number;
  release_date:string
  genres:Genre[]
}

// Fetch function for movie data
const fetchMovie = async (id: string): Promise<Movie> => {
  return fetchData(`movie/${id}`);
};

const MovieDetails: React.FC = () => {
  const { id } = useParams() as { id: string };

  const { data: movie, error, isLoading } = useQuery<Movie, Error>({
    queryKey: ['movie', id],
    queryFn: () => fetchMovie(id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }
  console.log(movie)
  return (
    <div className='relative'>
      <div
        className='relative after:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-70 p-10'
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
        }}
      >
        <div className='absolute top-[400px] right-[0px] left-0 z-50 p-4 flex gap-4 '>
          <div className=' '>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={250}
              height={250}
              className='rounded-xl w-full h-full object-fill'
            />
          </div>
          <div className='pt-24'>
            <h2 className='text-lg font-semibold'>{movie.title}</h2>
            <p className='my-2 font-extralight text-gray-500'>{movie.release_date}</p>
            <div className='my-4 flex flex-wrap gap-2'>
              <div className='w-[60px]'>
                <CircularProgressbar 
                value={movie.vote_average} 
                maxValue={10} 
                text={`${movie.vote_average }`} />
              </div>
              <div className='flex gap-2 flex-wrap'>
                  {movie.genres.map((genre:Genre)=>(
                    <div key={genre.id} className=' bg-gray-700 p-2 rounded-3xl capitalize px-3 md:text-center flex items-center'>
                        <span >{genre.name}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[290px] md:mt-[300px] lg:mt-[350px]'>
        <div>
          <h2 className='text-2xl'>Overview</h2>
          <p className='text-gray-500'>{movie.overview}</p>
        </div>
        <Recommendation id={id} />
      </div>
    </div>
  );
};

export default MovieDetails;
