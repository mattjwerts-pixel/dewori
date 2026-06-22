'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { createCartAction, addToCartAction, getCartAction } from './actions'

interface CartContextType {
  cartId: string | null
  cartCount: number
  checkoutUrl: string | null
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  refreshCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType>({
  cartId: null,
  cartCount: 0,
  checkoutUrl: null,
  addItem: async () => {},
  refreshCart: async () => {},
  isLoading: false,
})

const CART_ID_KEY = 'dewori-cart-id'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY)
    if (!storedId) return

    setCartId(storedId)
    getCartAction(storedId).then((cart) => {
      if (cart) {
        setCartCount(cart.totalQuantity)
        setCheckoutUrl(cart.checkoutUrl)
      } else {
        localStorage.removeItem(CART_ID_KEY)
      }
    })
  }, [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity = 1) => {
      setIsLoading(true)
      try {
        let id = cartId
        if (!id) {
          const newCart = await createCartAction()
          id = newCart.id
          setCartId(id)
          localStorage.setItem(CART_ID_KEY, id)
        }
        const updated = await addToCartAction(id, merchandiseId, quantity)
        setCartCount(updated.totalQuantity)
        setCheckoutUrl(updated.checkoutUrl)
      } finally {
        setIsLoading(false)
      }
    },
    [cartId]
  )

  // Re-fetch cart from Shopify and sync count — called after cart page mutations
  const refreshCart = useCallback(async () => {
    const storedId = localStorage.getItem(CART_ID_KEY)
    if (!storedId) return
    const cart = await getCartAction(storedId)
    if (cart) {
      setCartCount(cart.totalQuantity)
      setCheckoutUrl(cart.checkoutUrl)
    } else {
      setCartCount(0)
      setCheckoutUrl(null)
      localStorage.removeItem(CART_ID_KEY)
    }
  }, [])

  return (
    <CartContext.Provider value={{ cartId, cartCount, checkoutUrl, addItem, refreshCart, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
