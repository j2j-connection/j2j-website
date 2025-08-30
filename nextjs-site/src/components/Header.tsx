'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-black/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 relative">
              <Image
                src="/J2J_logo.svg"
                alt="J2J Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white">
              <div className="text-xl font-bold">J2J</div>
              <div className="text-xs text-yellow-500 font-medium">AI FOR ALL</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-white hover:text-yellow-500 transition-colors font-medium">
              Home
            </Link>
            <Link href="/bikr" className="text-white hover:text-yellow-500 transition-colors font-medium">
              BIKR
            </Link>
            <Link href="/testr" className="text-white hover:text-yellow-500 transition-colors font-medium">
              TESTR
            </Link>
            <Link href="/#about" className="text-white hover:text-yellow-500 transition-colors font-medium">
              About
            </Link>
            <Link
              href="/#contact"
              className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col gap-1 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-80 pb-6' : 'max-h-0'}`}>
          <nav className="flex flex-col gap-4 pt-4 border-t border-white/10">
            <Link
              href="/"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/bikr"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              BIKR
            </Link>
            <Link
              href="/testr"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              TESTR
            </Link>
            <Link
              href="/#about"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold text-center hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}