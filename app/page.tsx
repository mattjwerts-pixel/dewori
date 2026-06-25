import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'

const reviews = [
  {
    name: 'Sarah K.',
    rating: 5,
    text: "I use Dewori products every night before bed. My skin has never looked more hydrated. Friends keep asking what I'm doing differently.",
    verified: true,
  },
  {
    name: 'Mia T.',
    rating: 5,
    text: 'Finally a skincare brand that gets the nighttime ritual. Everything feels luxurious and my skin shows it every morning.',
    verified: true,
  },
  {
    name: 'Priya L.',
    rating: 5,
    text: "Obsessed. I've tried so many Korean skincare products and Dewori is by far the best. My skin literally glows the next morning.",
    verified: true,
  },
]

const steps = [
  {
    icon: '🌙',
    step: '01',
    title: 'Cleanse',
    description: 'Start your ritual with a clean canvas. Wash your face and pat dry before applying any products.',
  },
  {
    icon: '💧',
    step: '02',
    title: 'Treat',
    description: 'Apply your chosen Dewori treatment. Let the Korean-inspired formula work deep into your skin overnight.',
  },
  {
    icon: '✨',
    step: '03',
    title: 'Glow',
    description: 'Wake up to visibly brighter, more hydrated skin. Consistent nightly rituals create lasting results.',
  },
]

export default async function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="gradient-night overflow-hidden relative">
        <TwinkleStar top="12%" left="8%"  size={5} opacity={0.35} />
        <TwinkleStar top="22%" left="55%" size={4} opacity={0.25} />
        <TwinkleStar top="8%"  left="78%" size={6} opacity={0.30} />
        <TwinkleStar top="65%" left="90%" size={4} opacity={0.20} />
        <TwinkleStar top="80%" left="15%" size={5} opacity={0.25} />

        <div className="container-base grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 md:py-28">
          <div className="flex flex-col items-start">
            <span className="inline-block bg-amber/10 text-amber text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-amber/20">
              Korean Skincare Ritual
            </span>
            <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl text-glow mb-6 text-balance">
              Glow<br />
              <span className="italic text-amber">Different.</span>
            </h1>
            <p className="text-glow/60 text-lg leading-relaxed max-w-md mb-8">
              Your nightly Korean skincare ritual, simplified. Premium tools and treatments designed to help you wake up glowing every morning.
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

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80 rounded-3xl overflow-hidden shadow-glow ring-1 ring-amber/20">
              <Image
                src="/hero-model.png"
                alt="Dewori Skin nightly ritual"
                fill
                priority
                sizes="320px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-padding bg-dusk">
        <div className="container-base text-center max-w-2xl mx-auto">
          <span className="inline-block bg-amber/10 text-amber text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-amber/20">
            The Collection
          </span>
          <h2 className="heading-display text-3xl md:text-4xl text-glow mb-4">
            Build Your Ritual
          </h2>
          <p className="text-glow/50 text-lg leading-relaxed mb-8">
            Premium Korean skincare tools and treatments — curated for your nightly glow ritual. Free shipping on every order.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-padding bg-midnight">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-glow mb-3">
              The Dewori Ritual
            </h2>
            <p className="text-glow/50 text-base">Three steps to glowing skin, every morning.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map(({ icon, step, title, description }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-amber/15">
                  {icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-amber/70 uppercase mb-2">
                  Step {step}
                </span>
                <h3 className="font-display text-xl font-bold text-glow mb-2">{title}</h3>
                <p className="text-glow/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section-padding bg-dusk">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-glow mb-3">
              What Our Community Says
            </h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
              <span className="text-glow/40 text-sm ml-2">5.0 from 200+ reviews</span>
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
                <p className="text-glow/70 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-amber/15 flex items-center justify-center text-amber font-bold text-xs">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-glow">{name}</p>
                    {verified && <p className="text-xs text-glow/30">Verified Purchase</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="gradient-dusk py-20">
        <div className="container-base text-center">
          <h2 className="heading-display text-3xl md:text-4xl text-glow mb-4">Ready to Glow?</h2>
          <p className="text-glow/50 mb-8 max-w-sm mx-auto">
            Join thousands of people who have made the Dewori Skin nightly ritual part of their routine.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </section>
    </>
  )
}

function TwinkleStar({
  top, left, size = 5, opacity = 0.3,
}: { top: string; left: string; size?: number; opacity?: number }) {
  const half = size / 2
  return (
    <svg
      style={{ position: 'absolute', top, left, opacity, pointerEvents: 'none' }}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d={`M${half} 0 L${half * 1.15} ${half * 0.85} L${size} ${half} L${half * 1.15} ${half * 1.15} L${half} ${size} L${half * 0.85} ${half * 1.15} L0 ${half} L${half * 0.85} ${half * 0.85} Z`}
        fill="#E8C49A"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#C9956A" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
