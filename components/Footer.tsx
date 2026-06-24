import Link from 'next/link'

const shopLinks = [
  { href: '/shop', label: 'All Products' },
  { href: '/shop', label: 'Face Oil Roller' },
  { href: '/shop', label: 'Exfoliating Towel' },
]

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/', label: 'How It Works' },
  { href: '/refund-policy', label: 'Refund Policy' },
]

export default function Footer() {
  return (
    <footer className="bg-midnight border-t border-white/5">
      <div className="container-base py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          <div className="col-span-2 md:col-span-2">
            <p className="font-display text-2xl font-bold text-glow mb-2">Dewori Skin</p>
            <p className="text-glow/40 text-sm leading-relaxed max-w-xs">
              Your nightly glow ritual. Premium Korean collagen face mask crafted
              for real results. Apply, peel, reveal your glow.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <SocialLink href="#" label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href="#" label="TikTok"><TikTokIcon /></SocialLink>
              <SocialLink href="#" label="Pinterest"><PinterestIcon /></SocialLink>
            </div>
          </div>

          <nav aria-label="Shop links">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber/60 mb-4">
              Shop
            </p>
            <ul className="flex flex-col gap-1">
              {shopLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="block py-2 text-sm text-glow/40 hover:text-amber transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company links">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber/60 mb-4">
              Company
            </p>
            <ul className="flex flex-col gap-1">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="block py-2 text-sm text-glow/40 hover:text-amber transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="divider mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-glow/50">
            © {new Date().getFullYear()} Dewori Skin. All rights reserved.
          </p>
          <p className="text-xs text-glow/50">dewori.store</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-glow/30 hover:text-amber hover:border-amber/30 transition-colors"
    >
      {children}
    </a>
  )
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  )
}

function PinterestIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  )
}
