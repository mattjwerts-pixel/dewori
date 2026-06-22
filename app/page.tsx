import Link from 'next/link'
import Button from '@/components/Button'
import BundleCard from '@/components/BundleCard'
import { getProducts } from '@/lib/shopify'
import type { ShopifyProduct } from '@/types/shopify'

type BundleProps = {
  title: string
  maskCount: number
  price: number
  pricePerMask: number
  isBestValue: boolean
  variantId: string | undefined
}

// ── Fallback bundles shown before any products exist in Shopify ─────────────
const fallbackBundles: BundleProps[] = [
  { title: 'Starter', maskCount: 1, price: 25.99, pricePerMask: 25.99, isBestValue: false, variantId: undefined },
  { title: 'Duo', maskCount: 2, price: 39.99, pricePerMask: 20.00, isBestValue: true, variantId: undefined },
  { title: 'Ritual Set', maskCount: 3, price: 54.99, pricePerMask: 18.33, isBestValue: false, variantId: undefined },
]

// Convert a product's variants into bundle cards (one card per variant)
function variantsToBundles(product: ShopifyProduct): BundleProps[] {
  const variants = product.variants.edges.map((e) => e.node)
  return variants.map((variant, i) => {
    const price = parseFloat(variant.price.amount)
    const title = variant.title.split('/')[0].trim() // strip "/ United States" DSers suffix
    const maskCount = i + 1
    return {
      title,
      maskCount,
      price,
      pricePerMask: Math.round((price / maskCount) * 100) / 100,
      isBestValue: variants.length === 3 && i === 1,
      variantId: variant.id,
    }
  })
}

const reviews = [
  {
    name: 'Sarah K.',
    rating: 5,
    text: "I use this every night before bed. My skin has never looked more hydrated — friends keep asking what I'm doing differently.",
    verified: true,
  },
  {
    name: 'Mia T.',
    rating: 5,
    text: 'The Duo is such great value. Each mask feels luxurious, and the collagen serum is so generous. My new self-care ritual.',
    verified: true,
  },
  {
    name: 'Priya L.',
    rating: 5,
    text: "Obsessed. I've tried so many collagen masks and these are by far the best. My skin literally glows the next morning.",
    verified: true,
  },
]

const steps = [
  {
    icon: '🌿',
    step: '01',
    title: 'Apply',
    description: 'Use the included brush applicator to apply an even layer of the collagen mask across your face.',
  },
  {
    icon: '💧',
    step: '02',
    title: 'Wait',
    description: 'Relax for 15–20 minutes while the collagen formula works deep into your skin.',
  },
  {
    icon: '✨',
    step: '03',
    title: 'Glow',
    description: 'Slowly peel off the mask and gently pat any remaining serum into your skin. No rinsing needed — just glow.',
  },
]

export default async function HomePage() {
  // Fetch live products from Shopify, fall back gracefully if none exist yet
  let bundles = fallbackBundles
  try {
    const products = await getProducts()
    // Find the main product (ignore any placeholder named "Mask")
    const main = products.find((p) => p.title !== 'Mask') ?? products[0]
    if (main) {
      const variantBundles = variantsToBundles(main)
      if (variantBundles.length > 0) bundles = variantBundles
    }
  } catch {
    // Keep fallback if Shopify is unreachable
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="gradient-cream overflow-hidden">
        <div className="container-base grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <div className="flex flex-col items-start">
            <span className="inline-block bg-rose/15 text-rose text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Korean Skincare Ritual
            </span>
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl text-charcoal mb-6 text-balance">
              Glow<br />
              <span className="italic text-rose">Different.</span>
            </h1>
            <p className="text-warm-gray text-lg leading-relaxed max-w-md mb-8">
              Korean collagen wrapping mask for your nightly skin ritual. Apply, wait, and peel away to reveal your glow.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link href="/shop" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto">Shop Now</Button>
              </Link>
              <Link href="/about" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">Our Story</Button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
            <MaskIllustration />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BUNDLE SHOWCASE — live from Shopify                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-3">
              Find Your Ritual
            </h2>
            <p className="text-warm-gray text-base max-w-sm mx-auto">
              Pick the pack that fits your glow goals. The more you stock up, the more you save.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
            {bundles.map((bundle) => (
              <BundleCard key={bundle.title} {...bundle} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW IT WORKS                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-3">
              How It Works
            </h2>
            <p className="text-warm-gray text-base">Three simple steps to your daily glow ritual.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map(({ icon, step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-rose/10 rounded-2xl flex items-center justify-center text-3xl mb-4">
                  {icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-rose uppercase mb-2">
                  Step {step}
                </span>
                <h3 className="font-display text-xl font-bold text-charcoal mb-2">{title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SOCIAL PROOF                                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-3">
              What Our Community Says
            </h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
              <span className="text-warm-gray text-sm ml-2">5.0 from 200+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(({ name, rating, text, verified }) => (
              <div key={name} className="card-base p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: rating }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="text-charcoal text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-3 border-t border-warm-gray-light">
                  <div className="w-8 h-8 rounded-full bg-rose/20 flex items-center justify-center text-rose font-bold text-xs">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-charcoal">{name}</p>
                    {verified && <p className="text-xs text-warm-gray">Verified Purchase</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BOTTOM CTA BANNER                                                    */}
      {/* ------------------------------------------------------------------ */}
      <section className="bg-charcoal py-16">
        <div className="container-base text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-white mb-4">Ready to Glow?</h2>
          <p className="text-warm-gray mb-8 max-w-sm mx-auto">
            Join thousands of people who have made the Dewori Skin collagen ritual part of their nightly routine.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </section>
    </>
  )
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#D4A5A5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function MaskIllustration() {
  return (
    <div className="relative w-80 h-80 flex items-center justify-center">
      {/* Soft glow background circles */}
      <div className="absolute w-64 h-64 rounded-full bg-rose/10 blur-2xl" />
      <div className="absolute w-40 h-40 rounded-full bg-rose/15 blur-xl translate-x-8 translate-y-4" />

      {/* Decorative dots */}
      <div className="absolute top-8 right-12 w-2 h-2 rounded-full bg-rose/40" />
      <div className="absolute top-16 right-8 w-1.5 h-1.5 rounded-full bg-rose/30" />
      <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-rose/40" />
      <div className="absolute bottom-20 left-6 w-1 h-1 rounded-full bg-rose/25" />
      <div className="absolute top-12 left-14 w-1.5 h-1.5 rounded-full bg-rose/30" />

      {/* Moon crescent — night ritual */}
      <div className="absolute top-6 left-8 opacity-30">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M20 14a8 8 0 1 1-8-8 6 6 0 0 0 8 8z" fill="#D4A5A5"/>
        </svg>
      </div>

      {/* Main product group */}
      <div className="relative flex items-end gap-4 z-10">
        {/* Tube */}
        <svg width="72" height="160" viewBox="0 0 72 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tubeBody" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c9919a"/>
              <stop offset="40%" stopColor="#e8b4bb"/>
              <stop offset="100%" stopColor="#c9919a"/>
            </linearGradient>
            <linearGradient id="tubeCap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a87070"/>
              <stop offset="100%" stopColor="#c9919a"/>
            </linearGradient>
          </defs>
          {/* Cap */}
          <rect x="24" y="0" width="24" height="14" rx="7" fill="url(#tubeCap)"/>
          {/* Neck */}
          <rect x="27" y="12" width="18" height="10" rx="4" fill="#c9919a"/>
          {/* Body */}
          <rect x="6" y="20" width="60" height="112" rx="16" fill="url(#tubeBody)"/>
          {/* Highlight */}
          <rect x="14" y="28" width="14" height="72" rx="7" fill="white" opacity="0.2"/>
          {/* Label background */}
          <rect x="10" y="52" width="52" height="44" rx="6" fill="white" opacity="0.18"/>
          {/* Brand name */}
          <text x="36" y="72" textAnchor="middle" fontFamily="Georgia, serif" fontSize="7" fill="white" fontStyle="italic" opacity="0.9">Dewori</text>
          <text x="36" y="83" textAnchor="middle" fontFamily="Georgia, serif" fontSize="5.5" fill="white" opacity="0.75" letterSpacing="2">SKIN</text>
          <text x="36" y="93" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="4.5" fill="white" opacity="0.6" letterSpacing="0.5">COLLAGEN NIGHT MASK</text>
          {/* Bottom crimp */}
          <rect x="6" y="128" width="60" height="14" rx="4" fill="#c0848c"/>
          <rect x="12" y="132" width="48" height="6" rx="3" fill="#a87070" opacity="0.6"/>
          {/* Shine dot */}
          <circle cx="52" cy="34" r="3" fill="white" opacity="0.3"/>
        </svg>

        {/* Brush */}
        <svg width="36" height="140" viewBox="0 0 36 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="brushHandle" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c9919a"/>
              <stop offset="100%" stopColor="#e8b4bb"/>
            </linearGradient>
          </defs>
          {/* Handle */}
          <rect x="13" y="58" width="10" height="78" rx="5" fill="url(#brushHandle)"/>
          {/* Metal ferrule */}
          <rect x="12" y="54" width="12" height="8" rx="3" fill="#a87070"/>
          <rect x="14" y="55" width="8" height="6" rx="2" fill="#c0848c"/>
          {/* Brush head */}
          <ellipse cx="18" cy="34" rx="11" ry="22" fill="#f0dfe0"/>
          {/* Bristle texture */}
          <ellipse cx="18" cy="28" rx="8" ry="14" fill="#e8d0d2" opacity="0.6"/>
          <line x1="18" y1="12" x2="18" y2="54" stroke="#d4a5a8" strokeWidth="1" strokeDasharray="2 4" opacity="0.5"/>
          <line x1="12" y1="18" x2="12" y2="54" stroke="#d4a5a8" strokeWidth="1" strokeDasharray="2 4" opacity="0.4"/>
          <line x1="24" y1="18" x2="24" y2="54" stroke="#d4a5a8" strokeWidth="1" strokeDasharray="2 4" opacity="0.4"/>
          {/* Brush tip highlight */}
          <ellipse cx="18" cy="14" rx="4" ry="5" fill="white" opacity="0.3"/>
        </svg>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 font-display text-xs text-rose/60 tracking-widest uppercase">
        Collagen Night Ritual
      </span>
    </div>
  )
}
