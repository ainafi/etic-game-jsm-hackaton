/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import useCartStore from '@/store/useStore';

interface Anime {
  mal_id: number
  title?: string
  images: {
    jpg: {
      image_url: string
    }
  }
}
interface Movie {
  id: number
  name: string
  price: number
  poster_path: string | undefined
}

interface Game {
  id: number
  name?: string
  title?: string
  background_image: string
}

const OrderCard = () => {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const handleCheckOut = async () => {
    const cart = useCartStore.getState().cart;  
  
  
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Shopping Cart</span>
          <div className="absolute -top-3 -right-2 h-5 w-5 rounded-full bg-white text-xs text-primary-foreground flex items-center justify-center text-red font-semibold ">
            {cart.length}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
          <SheetDescription>
            <div className="mt-8 space-y-4">
              {cart.map((item) => (
                <div key={'mal_id' in item ? item.mal_id : item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                  <Image
                    src={
                      'poster_path' in item
                        ? `https://image.tmdb.org/t/p/w500/${item.poster_path}`
                        : 'background_image' in item
                        ? item.background_image
                        : item.images.jpg.image_url
                    }
                     /* @ts-expect-error */
                    alt={item.name || item.title}
                    width={60}
                    height={90}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    {/* @ts-expect-error */}
                    <h3 className="font-semibold">{item.name || item.title}</h3>
                  </div>
                  <Button
                    className='bg-red'
                    size="icon"
                    onClick={() => removeFromCart('mal_id' in item ? item.mal_id : item.id)}
                      /* @ts-expect-error */
                    aria-label={`Remove ${item.name || item.title} from cart`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div>
                <Button onClick={clearCart} className="mt-4 w-full bg-red">
                  Clear Cart
                </Button>
                <Button onClick={handleCheckOut} className="mt-4 w-full bg-success">
                  Checkout
                </Button>
              </div>
            )}
          </SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <Button className="mt-4" variant="outline">
            Close
          </Button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

export default OrderCard;
