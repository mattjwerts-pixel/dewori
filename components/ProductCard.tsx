'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import Button from './Button'
import type { ShopifyProduct } from '@/types/shopify'

interface ProductCardProps {
  product: ShopifyProduct
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isLoading } = useCart()
  const [added, setAdded] = useState(false)

  const price = parseFloat(product.priceRange.minVariantPrice.amount)
  const currency = product.priceRange.minVariantPrice.currencyCode
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)

  const firstVariant = product.variants.edges[0]?.node

  async function handleAddToCart() {
    if (!firstVariant) return
    await addItem(firstVariant.id, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="card-base flex flex-col group">
      {/* Product image */}
      <Link href={`/shop/${product.handle}`} className="block relative overflow-hidden">
        <div className="relative w-full aspect-square bg-warm-gray-light">
          {product.featuredImage ? (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <PlaceholderIcon />
            </div>
          )}
        </div>
      </Link>

      {/* Product info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <Link href={`/shop/${product.handle}`}>
            <h3 className="font-display text-base font-semibold text-charcoal leading-snug hover:text-rose transition-colors">
              {product.title}
            </h3>
          </Link>
          <p className="text-warm-gray text-sm mt-1 line-clamp-2">{product.description}</p>
        </div>

        {/* Price + button — stacked on mobile, inline on sm+ */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-auto pt-2 border-t border-warm-gray-light">
          <span className="font-semibold text-charcoal">{formattedPrice}</span>
          <Button
            size="md"
            className="w-full sm:w-auto"
            onClick={handleAddToCart}
            loading={isLoading}
            disabled={!product.availableForSale}
          >
            {added ? '✓ Added' : product.availableForSale ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  )
}

function PlaceholderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D4A5A5"
      strokeWidth="1"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  )
}
