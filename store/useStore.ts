import { create } from 'zustand'

interface Movie {
  id: number
  name: string
  price: number
  poster_path: string | undefined
}

interface StoreState {
  cart: Movie[]
  addToCart: (item: Movie) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
}

const useCartStore = create<StoreState>((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((cartItem) => cartItem.id === item.id)
      if (!existingItem) {
        return { cart: [...state.cart, item] }
      }
      return state
    }),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cart: [] }),
}))

export default useCartStore

