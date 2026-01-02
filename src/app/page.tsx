'use client'

import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLanguage } from './components/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <main>
      <div className="container">
        <Navbar />

        {/* Hero Section */}
        <section className="hero-section">
          <h1 className="hero-title">
            {t.hero.titlePlain}<span className="serif-italic">{t.hero.titleItalic}</span>{t.hero.titleSuffix}<br />
            {t.hero.titleLine2}
          </h1>

          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="bento-grid">
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
