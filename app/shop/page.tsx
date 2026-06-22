import { Suspense } from 'react'
import { getProducts } from '@/lib/shopify'
import VariantCard from '@/components/VariantCard'
import type { Metadata } from 'next'

// Always fetch fresh — no build-time prerender so missing credentials don't break the build
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Shop Dewori Skin Korean collagen night wrapping masks. Available in Starter, Duo, and Ritual Set bundles.',
}

async function ProductGrid() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try {
    products = await getProducts()
  } catch {
    // Shopify not connected yet — show placeholder state
  }

  const main = products.find((p) => p.title !== 'Mask') ?? products[0]
  const variants = main?.variants.edges.map((e) => e.node) ?? []

  if (variants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🌸</div>
        <h2 className="font-display text-2xl text-charcoal mb-2">Products Coming Soon</h2>
        <p className="text-warm-gray text-sm max-w-xs">
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
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="card-base animate-pulse">
          <div className="aspect-square bg-warm-gray-light" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-warm-gray-light rounded w-3/4" />
            <div className="h-3 bg-warm-gray-light rounded w-1/2" />
            <div className="h-10 bg-warm-gray-light rounded-full mt-4" />
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
      <section className="bg-white border-b border-warm-gray-light">
        <div className="container-base py-12 md:py-16">
          <p className="text-rose text-xs font-semibold tracking-widest uppercase mb-3">
            The Collection
          </p>
          <h1 className="heading-display text-4xl md:text-5xl text-charcoal mb-3">
            Korean Collagen<br className="hidden sm:block" /> Wrapping Masks
          </h1>
          <p className="text-warm-gray text-base max-w-md">
            Choose the bundle that fits your ritual. The more masks, the more you save — and the more you glow.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>
    </>
  )
}
