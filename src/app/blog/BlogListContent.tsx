'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../components/LanguageContext'
import { blogPosts } from '../../data/blogPosts'

export default function BlogListContent() {
    const { lang } = useLanguage()

    return (
        <main>
            <div className="container">
                <Navbar />

                {/* Page Hero */}
                <section className="page-hero">
                    <h1 className="page-hero-title">
                        {lang === 'tr' ? 'Blog & İçgörüler' : 'Blog & Insights'}
                    </h1>
                    <p className="page-hero-subtitle">
                        {lang === 'tr'
                            ? 'Teknoloji, yapay zeka ve yazılım dünyasından en son haberler.'
                            : 'Latest news from the world of technology, AI, and software.'}
                    </p>
                </section>

                {/* Blog Grid */}
                <section className="section" style={{ paddingTop: '20px' }}>
                    <div className="projects-grid">
                        {blogPosts.map((post) => (
                            <Link href={`/blog/${post.slug}`} className="project-card" key={post.id}>
                                <div className="project-image" style={{ position: 'relative', height: '240px', background: '#f0f0f0' }}>
                                    {/* Placeholder for image if not exists */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        fontSize: '3rem',
                                        background: 'linear-gradient(45deg, #FF6B35, #F7C59F)'
                                    }}>
                                        📰
                                    </div>
                                </div>
                                <div className="project-content">
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tech-tag" style={{ fontSize: '0.8rem' }}>{tag}</span>
                                        ))}
                                    </div>
                                    <h3 className="project-title" style={{ fontSize: '1.5rem' }}>
                                        {post.title[lang === 'tr' ? 'tr' : 'en']}
                                    </h3>
                                    <p className="project-desc">
                                        {post.summary[lang === 'tr' ? 'tr' : 'en']}
                                    </p>
                                    <div style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666' }}>
                                        {post.date}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
