import type { Metadata } from 'next'

// Metadata lives here because cart/page.tsx is a client component and
// cannot export `metadata` directly.
export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'Review your Dewori Skin order and proceed to checkout.',
}

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
