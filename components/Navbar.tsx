'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 bg-midnight/95 backdrop-blur-sm transition-all duration-200 ${
        scrolled
          ? 'border-b border-white/8 shadow-[0_1px_20px_rgba(0,0,0,0.4)]'
          : 'border-b border-white/5'
      }`}
    >
      <nav className="container-base flex items-center justify-between h-16 md:h-20" aria-label="Main navigation">

        <Link
          href="/"
          className="font-display text-xl md:text-2xl font-bold text-glow tracking-tight hover:text-amber transition-colors"
        >
          Dewori Skin
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm font-medium transition-colors hover:text-amber ${
                  pathname === href ? 'text-amber' : 'text-glow/60'
                }`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label={`Cart, ${cartCount} item${cartCount !== 1 ? 's' : ''}`}
            className="relative p-2.5 text-glow/60 hover:text-amber transition-colors"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 bg-amber text-midnight text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-glow/60 hover:text-amber transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul id="mobile-menu" className="flex flex-col bg-midnight border-t border-white/5 px-4 pb-4 pt-2 gap-1">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block py-3 text-base font-medium border-b border-white/5 last:border-0 transition-colors hover:text-amber ${
                  pathname === href ? 'text-amber' : 'text-glow/60'
                }`}
                aria-current={pathname === href ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

function CartIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
