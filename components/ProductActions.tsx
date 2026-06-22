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
      {/* Variant picker — shown only when there are multiple sizes */}
      {variants.length > 1 && (
        <div>
          <p className="text-sm font-semibold text-charcoal mb-3">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                disabled={!v.availableForSale}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all min-h-[44px] ${
                  v.id === selectedId
                    ? 'bg-rose border-rose text-white'
                    : v.availableForSale
                    ? 'bg-white border-warm-gray-light text-charcoal hover:border-rose'
                    : 'bg-warm-gray-light border-warm-gray-light text-warm-gray cursor-not-allowed line-through'
                }`}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price display */}
      {selected && (
        <p className="text-3xl font-bold text-charcoal">{price}</p>
      )}

      {/* Add to cart */}
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
          ? `Add to Cart — ${price}`
          : 'Sold Out'}
      </Button>

      {/* Upsell nudge */}
      <p className="text-sm text-warm-gray text-center">
        💧 Free shipping on all orders — try the Starter bundle to begin your collagen ritual
      </p>
    </div>
  )
}
