'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Button from './Button'
import type { ShopifyProductVariant } from '@/types/shopify'

interface ProductActionsProps {
  variants: ShopifyProductVariant[]
}

export default function ProductActions({ variants }: ProductActionsProps) {
  const [selectedId, setSelectedId] = useState(variants[0]?.id ?? '')
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const selected = variants.find((v) => v.id === selectedId)
  const price = selected
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: selected.price.currencyCode,
      }).format(parseFloat(selected.price.amount))
    : ''

  async function handleAddToCart() {
    if (!selectedId) return
    await addItem(selectedId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="space-y-5">
      {variants.length > 1 && (
        <div>
          <p className="text-sm font-semibold text-glow mb-3">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                disabled={!v.availableForSale}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all min-h-[44px] ${
                  v.id === selectedId
                    ? 'bg-amber border-amber text-midnight'
                    : v.availableForSale
                    ? 'bg-transparent border-white/10 text-glow/70 hover:border-amber/50 hover:text-amber'
                    : 'bg-white/5 border-white/5 text-glow/20 cursor-not-allowed line-through'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <p className="text-3xl font-bold text-glow">{price}</p>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        loading={isLoading}
        disabled={!selected?.availableForSale}
      >
        {added
          ? '✓ Added to Cart'
          : selected?.availableForSale
          ? `Add to Cart ${price}`
          : 'Sold Out'}
      </Button>

      <p className="text-sm text-glow/40 text-center">
        🌙 Free shipping on all orders. Begin your collagen ritual tonight
      </p>
    </div>
  )
}
