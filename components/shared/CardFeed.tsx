"use client"

import { Bookmark, BookmarkCheck, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import useCartStore from "@/store/useStore"

interface CardFeedProps {
  id: number
  poster_path?: string | undefined
  media_type: string
  isSkeleton?: boolean
  backdrop_path?: string
  isLoading?: boolean
  title: string
  price: number
}

const CardFeed = React.forwardRef<HTMLDivElement, CardFeedProps>(
  ({ id, backdrop_path, poster_path, media_type, title, price, isSkeleton = false }, ref) => {
    const [isHover, setIsHover] = React.useState(false)
    const [isAddingToCart, setIsAddingToCart] = React.useState(false)
    const addToCart = useCartStore((state) => state.addToCart)
    const [isFavorite, setIsFavorite] = React.useState(false)

    if (isSkeleton) {
      return (
        <div ref={ref} className="group relative w-full max-w-[280px] mx-auto">
          <div className="aspect-[2/3] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          <div className="mt-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      )
    }

    const handleAddToCart = async () => {
      setIsAddingToCart(true)
      try {
        addToCart({ id, name: title, price, poster_path: poster_path || backdrop_path })
        // Add a small delay for better UX feedback
        await new Promise((resolve) => setTimeout(resolve, 500))
      } finally {
        setIsAddingToCart(false)
      }
    }

    const toggleFavorite = () => {
      setIsFavorite(!isFavorite)
    }

    const imageUrl = poster_path || backdrop_path
    const imageSrc = imageUrl ? `https://image.tmdb.org/t/p/w500/${imageUrl}` : "/placeholder.svg?height=420&width=280"
    // console.log(media_type)
    return (
      <div
        ref={ref}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="group relative w-full max-w-[280px] mx-auto transition-all duration-300 ease-out hover:scale-[1.02]"
      >
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
          {/* Media Type Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 z-10 bg-black/70 text-white border-0 text-xs font-medium backdrop-blur-sm"
          >
            {media_type}
          </Badge>

          {/* Favorite Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFavorite}
            className={`absolute top-3 right-3 z-10 h-8 w-8 rounded-full backdrop-blur-sm transition-all duration-200 ${
              isFavorite ? "bg-red-500/90 text-white hover:bg-red-600/90" : "bg-black/50 text-white hover:bg-black/70"
            }`}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>

          {/* Main Image */}
          <Image
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            src={imageSrc || "/placeholder.svg"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`${title} poster`}
            priority={false}
          />

          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
              isHover ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Action Buttons */}
          <div
            className={`absolute bottom-4 left-4 right-4 space-y-2 transition-all duration-300 ${
              isHover ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Link href={`/movie/feed/${id}`} className="block">
              <Button
                variant="secondary"
                className="w-full bg-white/90 text-black hover:bg-white font-medium backdrop-blur-sm"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </Link>

            <Button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {isAddingToCart ? "Adding..." : `Add to Cart `}
            </Button>
          </div>
        </div>

        {/* Card Info */}
        
        <div className="mt-4 space-y-1">
          <h3 className="font-semibold text-gray-200 line-clamp-2 leading-tight">{title}</h3>
          {media_type &&(
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {media_type}
            </Badge>
          </div>
          )}
        </div>

      </div>
    )
  },
)

CardFeed.displayName = "CardFeed"

export default CardFeed
