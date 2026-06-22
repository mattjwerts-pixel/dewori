'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import Button from './Button'

interface VariantCardProps {
  variantId: string
  title: string
  price: number
  availableForSale: boolean
  tubeCount: number
  productHandle: string
  isBestValue?: boolean
}

export default function VariantCard({
  variantId,
  title,
  price,
  availableForSale,
  tubeCount,
  productHandle,
  isBestValue = false,
}: VariantCardProps) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  async function handleAddToCart() {
    if (!variantId) return
    await addItem(variantId, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  const tubeLabel = tubeCount === 1
    ? '1 tube (75ml) + brush'
    : `${tubeCount} tubes (${tubeCount * 75}ml) + brush`

  return (
    <div className="card-base flex flex-col group relative">
      {isBestValue && (
        <span className="absolute top-3 left-3 z-10 bg-rose text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
          Best Value
        </span>
      )}

      {/* Image area with tube illustration */}
      <Link href={`/shop/${productHandle}`} className="block relative overflow-hidden">
        <div className="relative w-full aspect-square bg-rose/5 flex items-end justify-center pb-6 gap-3">
          {Array.from({ length: tubeCount }).map((_, i) => (
            <TubeSVG key={i} />
          ))}
          <BrushSVG />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <Link href={`/shop/${productHandle}`}>
            <h3 className="font-display text-lg font-semibold text-charcoal hover:text-rose transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-warm-gray text-sm mt-1">{tubeLabel}</p>
          <p className="text-warm-gray text-xs mt-0.5">
            est. ${(price / (tubeCount * 17)).toFixed(2)} per use
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-auto pt-2 border-t border-warm-gray-light">
          <span className="font-semibold text-charcoal">{formattedPrice}</span>
          <Button
            size="md"
            className="w-full sm:w-auto"
            onClick={handleAddToCart}
            loading={isLoading}
            disabled={!availableForSale}
          >
            {added ? '✓ Added' : availableForSale ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function TubeSVG() {
  return (
    <svg width="44" height="100" viewBox="0 0 44 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="14" y="0" width="16" height="10" rx="5" fill="#b8888b"/>
      {/* Neck */}
      <rect x="17" y="9" width="10" height="6" rx="2" fill="#c99a9a"/>
      {/* Body */}
      <rect x="5" y="14" width="34" height="68" rx="10" fill="#D4A5A5"/>
      {/* Highlight */}
      <rect x="10" y="18" width="9" height="48" rx="5" fill="white" opacity="0.25"/>
      {/* Label area */}
      <rect x="8" y="38" width="28" height="24" rx="4" fill="white" opacity="0.15"/>
      {/* Bottom crimp */}
      <rect x="5" y="78" width="34" height="8" rx="3" fill="#c99a9a"/>
      <rect x="9" y="80" width="26" height="4" rx="2" fill="#b8888b"/>
    </svg>
  )
}

function BrushSVG() {
  return (
    <svg width="24" height="100" viewBox="0 0 24 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Handle */}
      <rect x="9" y="38" width="6" height="55" rx="3" fill="#D4A5A5"/>
      {/* Metal ring */}
      <rect x="8" y="34" width="8" height="6" rx="2" fill="#c99a9a"/>
      {/* Brush head */}
      <ellipse cx="12" cy="24" rx="7" ry="14" fill="#e8d0d0"/>
      {/* Bristle lines */}
      <line x1="12" y1="10" x2="12" y2="34" stroke="#c99a9a" strokeWidth="1" strokeDasharray="2 3"/>
      <line x1="8" y1="14" x2="8" y2="34" stroke="#c99a9a" strokeWidth="1" strokeDasharray="2 3"/>
      <line x1="16" y1="14" x2="16" y2="34" stroke="#c99a9a" strokeWidth="1" strokeDasharray="2 3"/>
    </svg>
  )
}
