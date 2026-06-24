import Link from 'next/link'
import Button from '@/components/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Dewori Skin — the story behind our Korean skincare ritual brand.',
}

const values = [
  {
    icon: '🌿',
    title: 'Thoughtful Curation',
    description:
      'Every product we carry is chosen with care. We only stock what we would use ourselves — effective, skin-loving, and worth your time.',
  },
  {
    icon: '💧',
    title: 'Korean Skincare Science',
    description:
      'We draw from Korean skincare traditions — one of the most advanced in the world — to bring you products that actually deliver results.',
  },
  {
    icon: '🌙',
    title: 'Nighttime First',
    description:
      'Your skin repairs itself while you sleep. We design our ritual around that — giving your skin what it needs during its most productive hours.',
  },
  {
    icon: '✨',
    title: 'Ritual Over Routine',
    description:
      'Skincare is not a chore. It is a moment for yourself. We design every product to feel like a small luxury at the end of your day.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="gradient-night">
        <div className="container-base py-20 md:py-28 max-w-3xl">
          <span className="inline-block bg-amber/10 text-amber text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-amber/20">
            Our Story
          </span>
          <h1 className="heading-display text-5xl md:text-6xl text-glow mb-6 text-balance">
            Skincare as a<br />
            <span className="italic text-amber">Nightly Ritual.</span>
          </h1>
          <p className="text-glow/60 text-lg leading-relaxed">
            Dewori Skin was born from a simple belief: the best skincare is the kind you actually do.
            Not the 12-step routine you save for weekends. The quiet, consistent ritual that becomes
            the best part of your day.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="section-padding bg-dusk">
        <div className="container-base max-w-3xl">
          <div className="space-y-6">
            <h2 className="heading-display text-3xl text-glow">Where It Started</h2>
            <p className="text-glow/60 leading-relaxed text-lg">
              The idea for Dewori Skin started with a late-night skincare session and a realization:
              Korean skincare — one of the most innovative and effective traditions in the world — was
              either hard to find, overpriced, or buried under overwhelming options that made it
              impossible to know where to start.
            </p>
            <p className="text-glow/60 leading-relaxed text-lg">
              We wanted to change that. Dewori Skin is a curated collection of Korean-inspired skincare
              tools and treatments built around one idea: your nightly ritual should feel effortless,
              luxurious, and actually work. No confusion, no 12-step overwhelm. Just the right products
              for your skin, every night.
            </p>
            <p className="text-glow/60 leading-relaxed text-lg">
              We are a small brand that cares deeply about what we put in front of our customers.
              Everything we sell is something we believe in.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="section-padding bg-midnight">
        <div className="container-base max-w-3xl text-center">
          <span className="inline-block text-amber text-xs font-semibold tracking-widest uppercase mb-6">
            Our Mission
          </span>
          <blockquote className="font-display text-2xl md:text-3xl text-glow leading-relaxed italic">
            &ldquo;To make glowing skin feel effortless, because you deserve a ritual, not a chore.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* VALUES */}
      <section className="section-padding bg-dusk">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-glow mb-3">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map(({ icon, title, description }) => (
              <div key={title} className="card-base p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-lg font-bold text-glow mb-2">{title}</h3>
                <p className="text-glow/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-dusk">
        <div className="container-base text-center max-w-lg">
          <h2 className="heading-display text-3xl text-glow mb-4">
            Start Your Ritual Tonight
          </h2>
          <p className="text-glow/50 mb-8">
            Explore our collection of Korean skincare tools and treatments.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
