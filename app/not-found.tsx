import Link from 'next/link'
import Button from '@/components/Button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="gradient-cream min-h-[70vh] flex items-center justify-center">
      <div className="container-base text-center max-w-md py-20">
        <p className="font-display text-8xl font-bold text-rose/30 mb-4" aria-hidden="true">
          404
        </p>
        <h1 className="heading-display text-3xl text-charcoal mb-3">Page not found</h1>
        <p className="text-warm-gray mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved.
          Head back to the shop to find your perfect glow ritual.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/shop">
            <Button size="lg" className="w-full sm:w-auto">Shop the Collection</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">Go Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
