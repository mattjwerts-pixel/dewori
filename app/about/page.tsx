import Link from 'next/link'
import Button from '@/components/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Dewori Skin — the story behind our Korean collagen night wrapping mask and nightly glow ritual mission.',
}

const values = [
  {
    icon: '🌿',
    title: 'Clean Ingredients',
    description:
      'Every mask is made with thoughtfully sourced, skin-loving ingredients. No harsh chemicals. Just pure hydration.',
  },
  {
    icon: '💧',
    title: 'Deep Hydration',
    description:
      'Our proprietary serum blend draws from Korean skincare science to deliver lasting moisture deep into the skin barrier.',
  },
  {
    icon: '♻️',
    title: 'Mindful Packaging',
    description:
      'Our pouches are designed to minimize waste. We are actively working toward fully compostable packaging.',
  },
  {
    icon: '✨',
    title: 'Ritual Over Routine',
    description:
      'Skincare is not a chore — it is a moment for yourself. We design every product to feel like a small luxury.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="gradient-cream">
        <div className="container-base py-20 md:py-28 max-w-3xl">
          <span className="inline-block bg-rose/15 text-rose text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Our Story
          </span>
          <h1 className="heading-display text-5xl md:text-6xl text-charcoal mb-6 text-balance">
            Skincare as a<br />
            <span className="italic text-rose">Daily Ritual.</span>
          </h1>
          <p className="text-warm-gray text-lg leading-relaxed">
            Dewori Skin was born from a simple belief: the best skincare is the kind you actually do.
            Not the 12-step routine you save for weekends — the quiet, consistent ritual that becomes
            the best part of your day.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* BRAND STORY                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-base max-w-3xl">
          <div className="prose prose-lg max-w-none space-y-6 text-charcoal">
            <h2 className="heading-display text-3xl text-charcoal">Where It Started</h2>
            <p className="text-warm-gray leading-relaxed">
              The idea for Dewori Skin started with a late-night skincare session and a realization:
              the Korean collagen wrapping masks we had fallen in love with on trips abroad were impossible to
              find at home — and when you did find them, they were expensive, hard to stock up on,
              or came in overwhelming variety.
            </p>
            <p className="text-warm-gray leading-relaxed">
              We wanted something simple. One mask. Done beautifully. A collagen night wrapping mask with the same
              deep-hydration science that Korean skincare is known for — formulated for a nightly ritual,
              not just a special occasion. And it comes with a professional brush applicator, so every
              application feels intentional.
            </p>
            <p className="text-warm-gray leading-relaxed">
              So we made it. Dewori Skin is that mask.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MISSION                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-charcoal">
        <div className="container-base max-w-3xl text-center">
          <span className="inline-block text-rose text-xs font-semibold tracking-widest uppercase mb-6">
            Our Mission
          </span>
          <blockquote className="font-display text-2xl md:text-3xl text-white leading-relaxed italic">
            &ldquo;To make glowing skin feel effortless — because you deserve a ritual, not a chore.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VALUES                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-cream">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="heading-display text-3xl md:text-4xl text-charcoal mb-3">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map(({ icon, title, description }) => (
              <div key={title} className="card-base p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-lg font-bold text-charcoal mb-2">{title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="section-padding bg-white">
        <div className="container-base text-center max-w-lg">
          <h2 className="heading-display text-3xl text-charcoal mb-4">
            Start Your Ritual Today
          </h2>
          <p className="text-warm-gray mb-8">
            Your nightly glow ritual is one collagen mask away.
          </p>
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
        </div>
      </section>
    </>
  )
}
