'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLanguage } from './components/LanguageContext'

// Dynamically import 3D components with no SSR
const Hero3D = dynamic(() => import('./components/Hero3D'), { ssr: false })
const InteractiveShowcase = dynamic(() => import('./components/InteractiveShowcase'), { ssr: false })

export default function Home() {
  const { t } = useLanguage()

  return (
    <main>
      <div className="container">
        <Navbar />

        {/* Hero Section */}
        <section className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Hero3D - Positioned to the right */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-5%',
            transform: 'translateY(-50%)',
            width: '50%',
            height: '120%',
            zIndex: 0,
            opacity: 0.6,
            pointerEvents: 'none'
          }}>
            <Hero3D />
          </div>

          <h1 className="hero-title" style={{ position: 'relative', zIndex: 1 }}>
            {t.hero.titlePlain}<span className="serif-italic">{t.hero.titleItalic}</span>{t.hero.titleSuffix}<br />
            {t.hero.titleLine2}
          </h1>

          <p className="hero-subtitle" style={{ position: 'relative', zIndex: 1 }}>
            {t.hero.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <Link href="/contact">
              <button className="btn-primary">
                {t.hero.primaryBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
            <Link href="/projects">
              <button className="btn-secondary">
                {t.hero.secondaryBtn}
              </button>
            </Link>
            <Link href="/explore">
              <button className="btn-secondary" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)', color: 'white', border: 'none' }}>
                🚗 {t.nav.toggle === 'EN' ? 'Keşfet' : 'Explore'}
              </button>
            </Link>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="bento-grid">

          {/* [NEW] Interactive 3D Showroom - Responsive Split Cards with Connector */}
          <div className="showcase-container" style={{
            gridColumn: '1 / -1',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0',
            alignItems: 'stretch',
            marginBottom: '24px',
            minHeight: '420px',
            height: 'auto'
          }}>
            {/* Text Card */}
            <div className="bento-card" style={{ flex: '1 1 280px', minWidth: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px', borderRadius: '24px 0 0 24px', marginRight: '-1px', height: 'auto', minHeight: '300px' }}>
              <span style={{ color: '#8b5cf6', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '12px', textTransform: 'uppercase' }}>
                {t.hero.interactive?.title}
              </span>
              <h2 className="card-title" style={{ fontSize: '1.8rem', marginBottom: '16px', lineHeight: 1.3 }}>
                {t.hero.interactive?.headline}
              </h2>
              <p className="card-desc" style={{ fontSize: '1rem', opacity: 0.85, lineHeight: 1.6 }}>
                {t.hero.interactive?.desc}
              </p>
            </div>

            {/* Animated Connector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '60px',
              background: 'linear-gradient(90deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.3) 50%, rgba(139,92,246,0.1) 100%)',
              position: 'relative',
              zIndex: 5
            }}>
              {/* Animated Arrow */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                animation: 'pulse 2s ease-in-out infinite'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              {/* Animated Dots */}
              <div style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', display: 'flex', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'dotPulse 1.5s ease-in-out infinite', animationDelay: '0s' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'dotPulse 1.5s ease-in-out infinite', animationDelay: '0.3s' }}></span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6', animation: 'dotPulse 1.5s ease-in-out infinite', animationDelay: '0.6s' }}></span>
              </div>
            </div>

            {/* 3D Model Card */}
            <div className="bento-card" style={{ flex: '1.5 1 350px', minWidth: '300px', height: '420px', padding: 0, overflow: 'hidden', position: 'relative', borderRadius: '0 24px 24px 0', marginLeft: '-1px' }}>
              <InteractiveShowcase />
            </div>
          </div>

          <div className="bento-card card-span-2">
            <h3 className="card-title">{t.bento.card1.title}</h3>
            <p className="card-desc">{t.bento.card1.desc}</p>
            <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', height: '100%', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '4rem' }}>🤖</span>
            </div>
          </div>

          <div className="bento-card">
            <h3 className="card-title">{t.bento.card2.title}</h3>
            <p className="card-desc">{t.bento.card2.desc}</p>
            <div style={{ marginTop: 'auto', paddingTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ background: '#f3f4f6', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>Next.js</span>
              <span style={{ background: '#f3f4f6', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>React</span>
              <span style={{ background: '#f3f4f6', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>Node.js</span>
            </div>
          </div>



          <div className="bento-card card-span-2">
            <h3 className="card-title">{t.bento.card4.title}</h3>
            <p className="card-desc">{t.bento.card4.desc}</p>
            <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', borderRadius: '12px', height: '100%', minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '4rem' }}>🛡️</span>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="section" style={{ marginTop: '40px' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.services.title}</h2>
            <p className="section-subtitle">{t.services.subtitle}</p>
          </div>

          <div className="services-grid">
            {t.services.items.map((service, index) => (
              <div className="service-card" key={index}>
                <span className="service-icon">{service.icon}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">{t.stats.projects}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">80+</span>
              <span className="stat-label">{t.stats.clients}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">{t.stats.experience}</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">{t.stats.support}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-subtitle">{t.projects.subtitle}</p>
          </div>

          <div className="projects-grid">
            {t.projects.items.map((project, index) => (
              <div className="project-card" key={index}>
                <div className={`project-image ${index === 1 ? 'gradient-2' : index === 2 ? 'gradient-3' : ''}`}>
                  <span>{index === 0 ? '🤖' : index === 1 ? '🛒' : '💪'}</span>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link href="/projects">
              <button className="btn-primary">
                {t.projects.viewAll}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t.testimonials.title}</h2>
          </div>

          <div className="testimonials-grid">
            {t.testimonials.items.map((testimonial, index) => (
              <div className="testimonial-card" key={index}>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="testimonial-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{t.cta.title}</h2>
            <p className="cta-subtitle">{t.cta.subtitle}</p>
            <Link href="/contact">
              <button className="cta-button">
                {t.cta.button}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
