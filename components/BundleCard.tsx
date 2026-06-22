'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Button from './Button'

interface BundleCardProps {
  title: string
  maskCount: number
  price: number
  pricePerMask: number
  isBestValue?: boolean
  variantId?: string
}

export default function BundleCard({
  title,
  maskCount,
  price,
  pricePerMask,
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
          ? 'bg-charcoal text-white shadow-xl ring-2 ring-rose md:scale-[1.02] mt-6 md:mt-0'
          : 'bg-white text-charcoal shadow-sm hover:shadow-md'
      }`}
    >
      {/* Best Value badge */}
      {isBestValue && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide uppercase whitespace-nowrap">
          Best Value
        </span>
      )}

      {/* Mask count bar visual */}
      <div className="flex items-end gap-1 mb-4">
        {Array.from({ length: Math.min(maskCount, 5) }).map((_, i) => (
          <div
            key={i}
            className={`rounded-sm ${isBestValue ? 'bg-rose' : 'bg-rose-light'}`}
            style={{ width: '10px', height: `${16 + i * 4}px` }}
          />
        ))}
        {maskCount > 5 && (
          <span
            className={`text-xs font-medium ml-1 self-end ${
              isBestValue ? 'text-rose-light' : 'text-warm-gray'
            }`}
          >
            ×{maskCount}
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl font-bold mb-1">{title}</h3>

      <p className={`text-sm mb-4 ${isBestValue ? 'text-rose-light' : 'text-warm-gray'}`}>
        {maskCount} Korean hydrating sheet masks
      </p>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold">${price.toFixed(2)}</span>
      </div>

      <p className={`text-xs mb-6 ${isBestValue ? 'text-rose-light' : 'text-warm-gray'}`}>
        ${pricePerMask.toFixed(2)} per mask
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
          {added ? '✓ Added to Cart' : `Add ${title} — $${price.toFixed(2)}`}
        </Button>

        {!variantId && (
          <p className="text-xs text-center mt-2 opacity-60">Connect Shopify to enable</p>
        )}
      </div>
    </div>
  )
}
