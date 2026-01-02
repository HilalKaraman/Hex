'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../components/LanguageContext'

export default function AboutPage() {
    const { t } = useLanguage()

    return (
        <main>
            <div className="container">
                <Navbar />

                {/* Page Hero */}
                <section className="page-hero">
                    <h1 className="page-hero-title">{t.aboutPage.hero.title}</h1>
                    <p className="page-hero-subtitle">{t.aboutPage.hero.subtitle}</p>
                </section>

                {/* Mission Section */}
                <section className="mission-section">
                    <h2 className="section-title">{t.aboutPage.mission.title}</h2>
                    <p className="mission-text">{t.aboutPage.mission.desc}</p>
                </section>

                {/* Values Section */}
                <section className="section" style={{ paddingTop: '0' }}>
                    <div className="section-header">
                        <h2 className="section-title">{t.aboutPage.values.title}</h2>
                    </div>
                    <div className="values-grid">
                        {t.aboutPage.values.items.map((value, index) => (
                            <div className="value-card" key={index}>
                                <span className="value-icon">{value.icon}</span>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
