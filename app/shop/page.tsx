import { Suspense } from 'react'
import { getProducts } from '@/lib/shopify'
import VariantCard from '@/components/VariantCard'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop Dewori Skin — Korean skincare tools and treatments for your nightly glow ritual.',
}

async function ProductGrid() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try {
    products = await getProducts()
  } catch {
    // Shopify not connected
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🌙</div>
        <h2 className="font-display text-2xl text-glow mb-2">Products Coming Soon</h2>
        <p className="text-glow/40 text-sm max-w-xs">
          New collection launching soon. Check back shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const firstVariant = product.variants.edges[0]?.node
        if (!firstVariant) return null
        const featuredImage = product.featuredImage ?? product.images.edges[0]?.node ?? null
        return (
          <VariantCard
            key={product.id}
            variantId={firstVariant.id}
            title={product.title}
            price={parseFloat(firstVariant.price.amount)}
            availableForSale={firstVariant.availableForSale}
            tubeCount={1}
            productHandle={product.handle}
            isBestValue={false}
            imageUrl={featuredImage?.url ?? null}
            imageAlt={featuredImage?.altText ?? product.title}
          />
        )
      })}
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
      <section className="bg-midnight border-b border-white/5">
        <div className="container-base py-12 md:py-16">
          <p className="text-amber text-xs font-semibold tracking-widest uppercase mb-3">
            The Collection
          </p>
          <h1 className="heading-display text-4xl md:text-5xl text-glow mb-3">
            Korean Skincare<br className="hidden sm:block" /> Ritual
          </h1>
          <p className="text-glow/50 text-base max-w-md">
            Curated Korean skincare tools and treatments for your nightly glow ritual. Free shipping on every order.
          </p>
        </div>
      </section>

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
