import { Suspense } from 'react'
import { getProducts } from '@/lib/shopify'
import VariantCard from '@/components/VariantCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop Dewori Skin Korean collagen night face masks. Available in Starter, Duo, and Ritual Set bundles.',
}

async function ProductGrid() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try {
    products = await getProducts()
  } catch {
    // Shopify not connected — show placeholder state
  }

  const main = products.find((p) => p.title !== 'Mask') ?? products[0]
  const variants = main?.variants.edges.map((e) => e.node) ?? []

  if (variants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🌙</div>
        <h2 className="font-display text-2xl text-glow mb-2">Products Coming Soon</h2>
        <p className="text-glow/40 text-sm max-w-xs">
          Add products to your Shopify store to display them here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {variants.map((variant, i) => (
        <VariantCard
          key={variant.id}
          variantId={variant.id}
          title={variant.title.split('/')[0].trim()}
          price={parseFloat(variant.price.amount)}
          availableForSale={variant.availableForSale}
          tubeCount={i + 1}
          productHandle={main!.handle}
          isBestValue={variants.length === 3 && i === 1}
        />
      ))}
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="card-base animate-pulse">
          <div className="aspect-square bg-white/5" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-white/5 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
            <div className="h-10 bg-white/5 rounded-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ShopPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-midnight border-b border-white/5">
        <div className="container-base py-12 md:py-16">
          <p className="text-amber text-xs font-semibold tracking-widest uppercase mb-3">
            The Collection
          </p>
          <h1 className="heading-display text-4xl md:text-5xl text-glow mb-3">
            Korean Collagen<br className="hidden sm:block" /> Face Masks
          </h1>
          <p className="text-glow/50 text-base max-w-md">
            Choose the bundle that fits your ritual. The more masks, the more you save, and the more you glow.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding bg-dusk">
        <div className="container-base">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>
    </>
  )
}
