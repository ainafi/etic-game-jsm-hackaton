import React from 'react'
import { ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import useCartStore from '@/store/useStore'

const OrderCard = () => {
  const cart = useCartStore((state) => state.cart)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const clearCart = useCartStore((state) => state.clearCart)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-transparent">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Shopping Cart</span>
          <div className="absolute -top-3  -right-2 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center text-red font-semibold bg-white">
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
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-secondary rounded-lg">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                    alt={item.name}
                    width={60}
                    height={90}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  <Button
                    
                    className='bg-red'
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
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
                <Button className="mt-4 w-full bg-success">
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
  )
}

export default OrderCard

