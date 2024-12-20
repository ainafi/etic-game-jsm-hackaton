import { create } from 'zustand'

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

interface Anime {
  mal_id: number
  title?: string
  images: {
    jpg: {
      image_url: string
    }
  }
}

type CartItem = Movie | Game | Anime

interface StoreState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
}

const useCartStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) =>
        'mal_id' in cartItem ? cartItem.mal_id === (item as Anime).mal_id : cartItem.id === (item as Movie | Game).id
      )
      if (!existingItem) {
        return { cart: [...state.cart, item] }
      }
      return state
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) =>
        'mal_id' in item ? item.mal_id !== itemId : item.id !== itemId
      ),
    })),
  clearCart: () => set({ cart: [] }),
}))

export default useCartStore
