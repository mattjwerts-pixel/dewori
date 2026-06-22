'use server'

// Server Actions — cart mutations run on the server so the Storefront token
// never touches the browser.

import {
  createCart,
  addToCart,
  updateCartLine,
  removeFromCart,
  getCart,
} from './shopify'
import type { ShopifyCart } from '@/types/shopify'

export async function createCartAction(): Promise<ShopifyCart> {
  return createCart()
}

export async function addToCartAction(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<ShopifyCart> {
  return addToCart(cartId, [{ merchandiseId, quantity }])
}

export async function updateCartLineAction(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<ShopifyCart> {
  return updateCartLine(cartId, lineId, quantity)
}

export async function removeFromCartAction(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  return removeFromCart(cartId, lineIds)
}

export async function getCartAction(cartId: string): Promise<ShopifyCart | null> {
  return getCart(cartId)
}
