"use client"

import { Card, CardContent } from '@/components/ui/card'
import { fetchDataAnime } from '@/lib/fetchAnime'
import { useQuery } from '@tanstack/react-query'
import { Star, Calendar, Badge } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'

interface IGenre {
  name: string
}

const AnimeDetails = () => {
  const { mal_id } = useParams() as { mal_id: string }

  const { data, isLoading, error } = useQuery({
    queryKey: ['anime', mal_id],
    queryFn: () => fetchDataAnime(`/anime/${mal_id}`),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  const anime = data.data
  console.log(anime)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Image
              src={anime.images?.jpg?.large_image_url}
              alt={anime.title}
              width={350}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{anime.title}</h1>
            <div className="flex items-center mb-4">
              <Star className="text-yellow-400 mr-2" />
              <span className="text-xl font-semibold">{anime.score}</span>
              <span className="text-sm text-muted-foreground ml-2">({anime.scored_by?.toLocaleString()} votes)</span>
            </div>
            <div className="flex items-center mb-4">
              <Calendar className="mr-2" />
              <span>{anime.aired.string}</span>
            </div>
            <div className="mb-4">
              {anime.genres.map((genre: IGenre) => (
                <Badge key={genre.name} className="mr-2 mb-2">
                  {genre.name}
                </Badge>
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                <p className="text-sm text-muted-foreground">{anime.synopsis}</p>
              </CardContent>
            </Card>
            {anime.trailer && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AnimeDetails
