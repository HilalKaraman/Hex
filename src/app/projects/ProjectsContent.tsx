'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../components/LanguageContext'

export default function ProjectsContent() {
    const { t } = useLanguage()
    const [activeFilter, setActiveFilter] = useState('all')

    const filters = [
        { key: 'all', label: t.projectsPage.filters.all },
        { key: 'AI', label: t.projectsPage.filters.ai },
        { key: 'Web', label: t.projectsPage.filters.web },
        { key: 'Mobile', label: t.projectsPage.filters.mobile },
    ]

    const filteredProjects = activeFilter === 'all'
        ? t.projectsPage.items
        : t.projectsPage.items.filter(p => p.category === activeFilter)

    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ]

    const icons = ['🤖', '🛒', '💪', '📄', '🏠', '🍔']

    return (
        <main>
            <div className="container">
                <Navbar />

                {/* Page Hero */}
                <section className="page-hero">
                    <h1 className="page-hero-title">{t.projectsPage.hero.title}</h1>
                    <p className="page-hero-subtitle">{t.projectsPage.hero.subtitle}</p>
                </section>

                {/* Filter Buttons */}
                <div className="filter-buttons">
                    {filters.map(filter => (
                        <button
                            key={filter.key}
                            className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                            onClick={() => setActiveFilter(filter.key)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <section className="section" style={{ paddingTop: '0' }}>
                    <div className="projects-grid">
                        {filteredProjects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <div
                                    className="project-image"
                                    style={{ background: gradients[index % gradients.length] }}
                                >
                                    <span>{icons[index % icons.length]}</span>
                                </div>
                                <div className="project-content">
                                    <span className="project-category">{project.category}</span>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-desc">{project.desc}</p>
                                    <div className="project-tech">
                                        {project.tech.map((tech, tIndex) => (
                                            <span className="tech-tag" key={tIndex}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
