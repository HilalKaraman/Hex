'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../components/LanguageContext'

export default function ServicesContent() {
    const { t } = useLanguage()

    return (
        <main>
            <div className="container">
                <Navbar />

                {/* Page Hero */}
                <section className="page-hero">
                    <h1 className="page-hero-title">{t.servicesPage.hero.title}</h1>
                    <p className="page-hero-subtitle">{t.servicesPage.hero.subtitle}</p>
                </section>

                {/* Service Details */}
                <section className="section" style={{ paddingTop: '40px' }}>
                    {t.servicesPage.items.map((service, index) => (
                        <div className="service-detail-card" key={index}>
                            <div className="service-detail-header">
                                <span className="service-detail-icon">{service.icon}</span>
                                <div>
                                    <h2 className="service-detail-title">{service.title}</h2>
                                    <p className="service-detail-desc">{service.desc}</p>
                                </div>
                            </div>
                            <div className="service-features">
                                {service.features.map((feature, fIndex) => (
                                    <div className="feature-item" key={fIndex}>
                                        <span className="feature-check">✓</span>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            <Footer />
        </main>
    )
}
