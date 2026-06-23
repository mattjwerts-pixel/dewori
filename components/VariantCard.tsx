'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  imageUrl?: string | null
  imageAlt?: string
}

export default function VariantCard({
  variantId,
  title,
  price,
  availableForSale,
  tubeCount,
  productHandle,
  isBestValue = false,
  imageUrl = null,
  imageAlt = 'Dewori Collagen Night Face Mask',
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

  // Scale tube size down slightly when there are more of them
  const tubeW = tubeCount === 1 ? 82 : tubeCount === 2 ? 70 : 60
  const tubeH = tubeCount === 1 ? 210 : tubeCount === 2 ? 195 : 180

  return (
    <div className={`card-base flex flex-col group relative ${isBestValue ? 'ring-1 ring-amber/40 shadow-glow-sm' : ''}`}>
      {isBestValue && (
        <span className="absolute top-3 left-3 z-10 bg-amber text-midnight text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
          Best Value
        </span>
      )}

      {/* Image area */}
      <Link href={`/shop/${productHandle}`} className="block relative overflow-hidden">
        {imageUrl ? (
          <div className="relative w-full h-72">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full h-72 bg-midnight flex items-end justify-center pb-4 gap-2">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 h-48 rounded-full bg-amber/5 blur-2xl" />
            </div>
            {Array.from({ length: tubeCount }).map((_, i) => (
              <TubeSVG key={i} width={tubeW} height={tubeH} />
            ))}
            <BrushSVG width={tubeCount === 1 ? 38 : 32} height={tubeH} />
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <Link href={`/shop/${productHandle}`}>
            <h3 className="font-display text-lg font-semibold text-glow hover:text-amber transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-glow/50 text-sm mt-1">{tubeLabel}</p>
          <p className="text-glow/40 text-xs mt-0.5">
            est. ${(price / (tubeCount * 17)).toFixed(2)} per use
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-auto pt-2 border-t border-white/5">
          <span className="font-semibold text-glow">{formattedPrice}</span>
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

function TubeSVG({ width = 70, height = 195 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 70 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tubeBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7A5530" />
          <stop offset="22%"  stopColor="#B8804A" />
          <stop offset="48%"  stopColor="#E0AA78" />
          <stop offset="72%"  stopColor="#C49060" />
          <stop offset="100%" stopColor="#7A5530" />
        </linearGradient>
        <linearGradient id="tubeCap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6A4828" />
          <stop offset="45%"  stopColor="#A87848" />
          <stop offset="100%" stopColor="#6A4828" />
        </linearGradient>
        <linearGradient id="tubeShoulder" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7A5530" />
          <stop offset="50%"  stopColor="#C49060" />
          <stop offset="100%" stopColor="#7A5530" />
        </linearGradient>
        <linearGradient id="tubeCrimp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#6A4828" />
          <stop offset="50%"  stopColor="#A07040" />
          <stop offset="100%" stopColor="#6A4828" />
        </linearGradient>
        <linearGradient id="labelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.14" />
          <stop offset="100%" stopColor="white" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="22" y="0" width="26" height="20" rx="10" fill="url(#tubeCap)" />
      <rect x="26" y="2" width="8" height="12" rx="4" fill="white" opacity="0.12" />

      {/* Shoulder taper */}
      <path d="M27 19 L10 34 L60 34 L43 19 Z" fill="url(#tubeShoulder)" />

      {/* Body */}
      <rect x="6" y="33" width="58" height="138" rx="13" fill="url(#tubeBody)" />

      {/* Left edge shadow for depth */}
      <rect x="6" y="33" width="10" height="138" rx="8" fill="black" opacity="0.12" />
      {/* Right edge shadow */}
      <rect x="54" y="33" width="10" height="138" rx="8" fill="black" opacity="0.10" />

      {/* Main highlight stripe */}
      <rect x="16" y="38" width="11" height="118" rx="5.5" fill="white" opacity="0.20" />
      {/* Secondary soft highlight */}
      <rect x="29" y="38" width="5" height="118" rx="2.5" fill="white" opacity="0.07" />

      {/* Label background */}
      <rect x="10" y="72" width="50" height="60" rx="6" fill="url(#labelBg)" />
      {/* Label border */}
      <rect x="10" y="72" width="50" height="60" rx="6" fill="none" stroke="white" strokeOpacity="0.10" strokeWidth="0.5" />

      {/* Brand text */}
      <text x="35" y="93" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8" fill="white" fontStyle="italic" opacity="0.90">Dewori</text>
      <text x="35" y="104" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5" fill="white" opacity="0.65" letterSpacing="3">SKIN</text>
      <text x="35" y="116" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="white" opacity="0.45" letterSpacing="0.5">COLLAGEN NIGHT</text>
      <text x="35" y="124" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4" fill="white" opacity="0.45" letterSpacing="0.5">FACE MASK</text>

      {/* Bottom crimp / seal */}
      <rect x="6" y="167" width="58" height="18" rx="5" fill="url(#tubeCrimp)" />
      <line x1="6" y1="172" x2="64" y2="172" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />
      <line x1="6" y1="178" x2="64" y2="178" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />

      {/* Cap shine dot */}
      <ellipse cx="54" cy="8" rx="3" ry="2.5" fill="white" opacity="0.20" />
      {/* Body top-right shine */}
      <ellipse cx="54" cy="44" rx="3" ry="4" fill="white" opacity="0.14" />
    </svg>
  )
}

function BrushSVG({ width = 34, height = 195 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 34 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brushHandle" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7A5530" />
          <stop offset="40%"  stopColor="#C9956A" />
          <stop offset="100%" stopColor="#7A5530" />
        </linearGradient>
        <linearGradient id="ferrule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#8A7050" />
          <stop offset="50%"  stopColor="#D4B880" />
          <stop offset="100%" stopColor="#8A7050" />
        </linearGradient>
        <linearGradient id="bristles" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#C8A070" stopOpacity="0.5" />
          <stop offset="45%"  stopColor="#F0D8B0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#C8A070" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Handle */}
      <rect x="12" y="80" width="10" height="112" rx="5" fill="url(#brushHandle)" />
      {/* Handle highlight */}
      <rect x="14" y="84" width="3" height="100" rx="1.5" fill="white" opacity="0.18" />
      {/* Handle bottom cap */}
      <rect x="12" y="186" width="10" height="8" rx="4" fill="#7A5530" />

      {/* Ferrule ring */}
      <rect x="10" y="72" width="14" height="12" rx="3" fill="url(#ferrule)" />
      <rect x="11" y="73" width="12" height="10" rx="2.5" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="0.5" />
      {/* Ferrule highlight */}
      <rect x="13" y="74" width="4" height="8" rx="2" fill="white" opacity="0.15" />

      {/* Brush head — tapered shape */}
      <path d="M7 72 Q4 50 8 28 Q11 14 17 10 Q23 14 26 28 Q30 50 27 72 Z" fill="url(#bristles)" />

      {/* Bristle detail lines */}
      <line x1="17" y1="12" x2="17" y2="72" stroke="#C9956A" strokeWidth="0.7" strokeDasharray="2 3" strokeOpacity="0.6" />
      <line x1="12" y1="20" x2="12" y2="72" stroke="#C9956A" strokeWidth="0.7" strokeDasharray="2 3" strokeOpacity="0.4" />
      <line x1="22" y1="20" x2="22" y2="72" stroke="#C9956A" strokeWidth="0.7" strokeDasharray="2 3" strokeOpacity="0.4" />
      <line x1="9"  y1="38" x2="9"  y2="72" stroke="#C9956A" strokeWidth="0.6" strokeDasharray="2 3" strokeOpacity="0.3" />
      <line x1="25" y1="38" x2="25" y2="72" stroke="#C9956A" strokeWidth="0.6" strokeDasharray="2 3" strokeOpacity="0.3" />

      {/* Tip highlight */}
      <ellipse cx="17" cy="16" rx="3.5" ry="5" fill="white" opacity="0.22" />
    </svg>
  )
}
