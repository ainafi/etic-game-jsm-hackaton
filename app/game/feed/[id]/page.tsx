/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { fetchGame } from '@/lib/fetchGame'
import { useQuery } from '@tanstack/react-query'

const GameDetails = () => {
  const params = useParams();
  const { id } = params;

  const { data, isLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => fetchGame(`games/${id}`),
  });

  if (isLoading) {
    return <div>Loading...</div>
  }

  const game = data;  // Assuming the API response structure matches the given data format

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative h-[50vh] md:h-[70vh]">
        <Image
          src={game.background_image}
          alt={game.name}
          className="object-cover"
          priority
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{game.name}</h1>
          <div className="flex items-center space-x-4">
            <Button size="lg">Order Now</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-6 w-6" />
              <span className="sr-only">Add to favorites</span>
            </Button>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About the Game</h2>
          <p className="text-lg" dangerouslySetInnerHTML={{ __html: game.description }}></p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Additional Information</h2>
          <ul>
            <li><strong>Released:</strong> {game.released}</li>
            <li><strong>Metacritic Score:</strong> {game.metacritic}</li>
            <li><strong>Playtime:</strong> {game.playtime} hours</li>
            <li><strong>Rating:</strong> {game.rating}</li>
            <li><strong>ESRB Rating:</strong> {game.esrb_rating?.name}</li>
            <li><strong>Genres:</strong> {game.genres.map((genre: any) => genre.name).join(', ')}</li>
            <li><strong>Platforms:</strong> {game.platforms.map((platform: any) => platform.platform.name).join(', ')}</li>
            <li><strong>Website:</strong> <a href={game.website} target="_blank" rel="noopener noreferrer">{game.website}</a></li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Alternative Names</h2>
          <ul>
            {game.alternative_names?.map((name: any, index: number) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {game.screenshots?.map((screenshot: any, index: number) => (
              <Image
                key={index}
                src={screenshot.image}
                alt={`Screenshot ${index + 1}`}
                className="object-cover"
                width={640}
                height={360}
              />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Reddit</h2>
          <a href={game.reddit_url} target="_blank" rel="noopener noreferrer">
            Visit the subreddit
          </a>
        </section>
      </main>
    </div>
  );
}

export default GameDetails;
