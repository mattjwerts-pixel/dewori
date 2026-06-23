'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Button from './Button'

interface BundleCardProps {
  title: string
  maskCount: number
  price: number
  isBestValue?: boolean
  variantId?: string
}

export default function BundleCard({
  title,
  maskCount,
  price,
  isBestValue = false,
  variantId,
}: BundleCardProps) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  async function handleAddToCart() {
    if (!variantId) return
    await addItem(variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div
      className={`relative flex flex-col rounded-3xl p-6 transition-all duration-200 ${
        isBestValue
          ? 'bg-surface text-glow shadow-glow ring-1 ring-amber/40 md:scale-[1.02] mt-6 md:mt-0'
          : 'bg-surface text-glow border border-white/5 hover:border-amber/20'
      }`}
    >
      {isBestValue && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber text-midnight text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase whitespace-nowrap">
          Best Value
        </span>
      )}

      {/* Tube count bar visual */}
      <div className="flex items-end gap-1 mb-4">
        {Array.from({ length: Math.min(maskCount, 5) }).map((_, i) => (
          <div
            key={i}
            className={`rounded-sm ${isBestValue ? 'bg-amber' : 'bg-amber/30'}`}
            style={{ width: '10px', height: `${16 + i * 4}px` }}
          />
        ))}
      </div>

      <h3 className="font-display text-2xl font-bold text-glow mb-1">{title}</h3>

      <p className="text-sm mb-4 text-glow/50">
        {maskCount} tube{maskCount !== 1 ? 's' : ''} (75ml each) + brush applicator
      </p>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold text-glow">${price.toFixed(2)}</span>
      </div>

      <p className="text-xs mb-6 text-glow/40">
        est. ${(price / (maskCount * 17)).toFixed(2)} per use (~15–20 uses per tube)
      </p>

      <div className="mt-auto">
        <Button
          variant={isBestValue ? 'primary' : 'secondary'}
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          loading={isLoading}
          disabled={!variantId}
        >
          {added ? '✓ Added to Cart' : `Add ${title} $${price.toFixed(2)}`}
        </Button>

        {!variantId && (
          <p className="text-xs text-center mt-2 text-glow/30">Connect Shopify to enable</p>
        )}
        <p className="text-xs text-center mt-1 text-glow/30">Ships in 3–7 business days</p>
      </div>
    </div>
  )
}
