import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProduct } from '@/lib/shopify'
import ProductActions from '@/components/ProductActions'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: { handle: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.handle)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.title,
    description: product.description.slice(0, 160),
  }
}

const benefits = [
  { icon: '💧', label: 'Deep Hydration', detail: 'Collagen formula locks in moisture overnight for plump, supple skin' },
  { icon: '🌿', label: 'Soothing Formula', detail: 'Calms redness and irritation while you sleep' },
  { icon: '✨', label: 'Instant Glow', detail: 'Wake up to brighter, more even skin tone' },
  { icon: '🛡️', label: '75ml Per Tube', detail: 'Each tube gives approximately 15–20 full-face applications' },
]

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.handle)
  if (!product) notFound()

  const variants = product.variants.edges.map((e) => e.node)
  const images = product.images.edges.map((e) => e.node)
  const mainImage = product.featuredImage ?? images[0] ?? null

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="container-base py-4">
        <nav className="flex items-center gap-2 text-xs text-warm-gray min-w-0">
          <Link href="/" className="hover:text-rose transition-colors shrink-0">Home</Link>
          <span className="shrink-0">/</span>
          <Link href="/shop" className="hover:text-rose transition-colors shrink-0">Shop</Link>
          <span className="shrink-0">/</span>
          <span className="text-charcoal truncate">{product.title}</span>
        </nav>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* PRODUCT DETAIL                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-base pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Image */}
          <div className="space-y-3">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-warm-gray-light">
              {mainImage ? (
                <Image
                  src={mainImage.url}
                  alt={mainImage.altText ?? product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-warm-gray text-sm">No image yet</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.slice(0, 4).map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-warm-gray-light flex-shrink-0"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText ?? `${product.title} ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Details */}
          <div className="lg:pt-2 space-y-6">
            <div>
              <span className="text-rose text-xs font-semibold tracking-widest uppercase">
                Korean Collagen Night Wrapping Mask
              </span>
              <h1 className="heading-display text-3xl md:text-4xl text-charcoal mt-2 mb-3">
                {product.title}
              </h1>
              {product.description && (
                <p className="text-warm-gray leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Add to cart — client component */}
            <div className="py-2">
              <ProductActions variants={variants} />
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-2 border-t border-warm-gray-light">
              {[
                { icon: '🚚', text: 'Free shipping over $30' },
                { icon: '↩️', text: '30-day returns' },
                { icon: '🔒', text: 'Secure checkout' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-warm-gray">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INGREDIENTS & BENEFITS                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-white section-padding">
        <div className="container-base">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

            {/* Benefits */}
            <div>
              <h2 className="heading-display text-2xl text-charcoal mb-6">Key Benefits</h2>
              <div className="space-y-4">
                {benefits.map(({ icon, label, detail }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-rose/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{label}</p>
                      <p className="text-warm-gray text-sm">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to use */}
            <div>
              <h2 className="heading-display text-2xl text-charcoal mb-6">How to Use</h2>
              <ol className="space-y-4">
                {[
                  'Cleanse your face and pat dry.',
                  'Use the included brush to apply a thin, even layer of the collagen paste across your face, avoiding the eye area.',
                  'Leave on for 15–20 minutes (or overnight) until dry.',
                  'Slowly peel off the mask and gently pat any remaining serum into your skin.',
                  'Rinse with warm water if needed. One tube gives approximately 15–20 uses.',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-rose text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-warm-gray text-sm leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Full ingredients list from Shopify description HTML or static */}
          {product.descriptionHtml && (
            <div
              className="mt-12 max-w-4xl mx-auto prose prose-sm text-warm-gray"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          )}
        </div>
      </section>
    </div>
  )
}
