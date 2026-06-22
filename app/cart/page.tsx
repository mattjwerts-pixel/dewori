'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getCartAction, updateCartLineAction, removeFromCartAction } from '@/lib/actions'
import { useCart } from '@/lib/cart-context'
import Button from '@/components/Button'
import type { ShopifyCart } from '@/types/shopify'

const CART_ID_KEY = 'dewori-cart-id'

export default function CartPage() {
  const { refreshCart } = useCart()
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [loading, setLoading] = useState(true)
  const [mutating, setMutating] = useState(false)

  const loadCart = useCallback(async () => {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) { setLoading(false); return }

    const data = await getCartAction(cartId)
    setCart(data)
    setLoading(false)
  }, [])

  useEffect(() => { loadCart() }, [loadCart])

  async function handleUpdateQty(lineId: string, qty: number) {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    setMutating(true)
    const updated = await updateCartLineAction(cartId, lineId, qty)
    setCart(updated)
    await refreshCart()
    setMutating(false)
  }

  async function handleRemove(lineId: string) {
    const cartId = localStorage.getItem(CART_ID_KEY)
    if (!cartId) return
    setMutating(true)
    const updated = await removeFromCartAction(cartId, [lineId])
    setCart(updated)
    await refreshCart()
    setMutating(false)
  }

  // ── Loading state ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="container-base section-padding">
        <div className="max-w-2xl mx-auto space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="card-base flex gap-4 p-4">
              <div className="w-24 h-24 rounded-xl bg-warm-gray-light flex-shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-4 bg-warm-gray-light rounded w-2/3" />
                <div className="h-3 bg-warm-gray-light rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Empty cart ────────────────────────────────────────────────────────────
  const lines = cart?.lines.edges.map((e) => e.node) ?? []
  if (lines.length === 0) {
    return (
      <div className="container-base section-padding text-center">
        <div className="max-w-sm mx-auto">
          <div className="text-6xl mb-6">🛍️</div>
          <h1 className="heading-display text-3xl text-charcoal mb-3">Your cart is empty</h1>
          <p className="text-warm-gray mb-8">
            Looks like you have not added any masks yet. Start your glow ritual today.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = cart!.cost.subtotalAmount
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: subtotal.currencyCode,
  }).format(parseFloat(subtotal.amount))

  // ── Cart with items ───────────────────────────────────────────────────────
  return (
    <div className="bg-cream min-h-screen">
      <div className="container-base py-10 md:py-16">
        <h1 className="heading-display text-3xl md:text-4xl text-charcoal mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Cart lines */}
          <div className="lg:col-span-2 space-y-4">
            {lines.map((line) => {
              const { merchandise, quantity, cost } = line
              const itemPrice = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: cost.totalAmount.currencyCode,
              }).format(parseFloat(cost.totalAmount.amount))

              return (
                <div
                  key={line.id}
                  className={`card-base flex gap-4 p-4 transition-opacity ${
                    mutating ? 'opacity-60 pointer-events-none' : ''
                  }`}
                >
                  {/* Product image */}
                  <Link
                    href={`/shop/${merchandise.product.handle}`}
                    className="flex-shrink-0"
                  >
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-warm-gray-light">
                      {merchandise.product.featuredImage ? (
                        <Image
                          src={merchandise.product.featuredImage.url}
                          alt={merchandise.product.featuredImage.altText ?? merchandise.product.title}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🌸</div>
                      )}
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${merchandise.product.handle}`}>
                      <p className="font-semibold text-charcoal text-sm leading-snug hover:text-rose transition-colors">
                        {merchandise.product.title}
                      </p>
                    </Link>
                    {merchandise.title !== 'Default Title' && (
                      <p className="text-warm-gray text-xs mt-0.5">{merchandise.title}</p>
                    )}
                    <p className="font-bold text-charcoal mt-1">{itemPrice}</p>

                    {/* Quantity + remove */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border-2 border-warm-gray-light rounded-full overflow-hidden">
                        <button
                          onClick={() => handleUpdateQty(line.id, Math.max(0, quantity - 1))}
                          className="px-3 text-charcoal hover:text-rose transition-colors text-lg font-light min-h-[44px] min-w-[44px] flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm font-semibold text-charcoal min-w-[32px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQty(line.id, quantity + 1)}
                          className="px-3 text-charcoal hover:text-rose transition-colors text-lg font-light min-h-[44px] min-w-[44px] flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemove(line.id)}
                        className="text-xs text-warm-gray hover:text-rose transition-colors underline underline-offset-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-28">
            <div className="card-base p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-charcoal">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-warm-gray">
                  <span>Subtotal</span>
                  <span className="text-charcoal font-medium">{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between text-warm-gray">
                  <span>Shipping</span>
                  <span className="text-charcoal font-medium">
                    {parseFloat(subtotal.amount) >= 30 ? (
                      <span className="text-rose font-semibold">Free</span>
                    ) : (
                      'Calculated at checkout'
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-warm-gray-light pt-3 flex justify-between font-bold text-charcoal">
                <span>Total</span>
                <span className="text-lg">{formattedSubtotal}</span>
              </div>

              {parseFloat(subtotal.amount) < 30 && (
                <p className="text-xs text-warm-gray bg-rose/10 rounded-xl px-3 py-2 text-center">
                  Add ${(30 - parseFloat(subtotal.amount)).toFixed(2)} more for free shipping 🌸
                </p>
              )}

              {/* Checkout — goes straight to Shopify's native checkout */}
              <a href={cart!.checkoutUrl} className="block w-full">
                <Button size="lg" className="w-full">
                  Checkout →
                </Button>
              </a>

              <Link href="/shop" className="block text-center text-sm text-warm-gray hover:text-rose transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
