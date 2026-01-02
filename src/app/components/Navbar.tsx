'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from './LanguageContext'

export default function Navbar() {
    const { t, toggleLanguage } = useLanguage()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="nav-bar">
            <Link href="/" className="logo-link">
                <Image
                    src="/logo_ai_hex.svg"
                    alt="Hex Studio"
                    width={0}
                    height={0}
                    priority
                    sizes="100vw"
                    style={{ height: '40px', width: 'auto' }}
                />
            </Link>

            {/* Desktop Navigation */}
            <div className="nav-links desktop-nav">
                <Link href="/services" className="nav-link">{t.nav.services}</Link>
                <Link href="/projects" className="nav-link">{t.nav.projects}</Link>
                <Link href="/about" className="nav-link">{t.nav.about}</Link>
                <Link href="/contact" className="nav-link">{t.nav.contact}</Link>
            </div>

            <div className="nav-actions">
                <button
                    onClick={toggleLanguage}
                    className="btn-primary lang-toggle"
                >
                    {t.nav.toggle}
                </button>

                {/* Mobile Hamburger */}
                <button
                    className="hamburger"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
                <Link href="/services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    {t.nav.services}
                </Link>
                <Link href="/projects" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    {t.nav.projects}
                </Link>
                <Link href="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    {t.nav.about}
                </Link>
                <Link href="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                    {t.nav.contact}
                </Link>
            </div>
        </nav>
    )
}
