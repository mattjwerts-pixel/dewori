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
              Your nightly glow ritual. Premium Korean skincare tools and treatments
              for glowing skin every morning.
            </p>

            <div className="flex items-center gap-3 mt-6">
              <SocialLink href="https://www.instagram.com/deworiskincare?igsh=aGtiN25uZTkxaXV6" label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href="https://www.tiktok.com/@dewori83?_r=1&_t=ZT-97W8CxhLBXy" label="TikTok"><TikTokIcon /></SocialLink>
              <SocialLink href="https://www.facebook.com/profile.php?id=61590997122382" label="Facebook"><FacebookIcon /></SocialLink>
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

function FacebookIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}
