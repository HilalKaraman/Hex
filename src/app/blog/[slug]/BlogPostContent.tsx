'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, notFound } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLanguage } from '../../components/LanguageContext'
import { blogPosts } from '../../../data/blogPosts'

export default function BlogPostContent() {
    const { lang } = useLanguage()
    const params = useParams()
    const slug = params.slug as string

    // Find post by slug
    // Note: In a real app this might be passed from server, but for static data this works
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return (
            <main>
                <div className="container">
                    <Navbar />
                    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                        <h1>404 - Post Not Found</h1>
                        <Link href="/blog" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main>
            <div className="container">
                <Navbar />

                <article className="blog-post" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '120px', paddingBottom: '60px' }}>

                    {/* Header */}
                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                            {post.tags.map(tag => (
                                <span key={tag} className="tech-tag">{tag}</span>
                            ))}
                        </div>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: 1.2 }}>
                            {post.title[lang === 'tr' ? 'tr' : 'en']}
                        </h1>
                        <div style={{ color: '#666' }}>
                            {post.date} • Hex Studio Team
                        </div>
                    </div>

                    {/* Featured Image Placeholder */}
                    <div style={{
                        width: '100%',
                        height: '400px',
                        background: 'linear-gradient(45deg, #FF6B35, #F7C59F)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        marginBottom: '40px'
                    }}>
                        📰
                    </div>

                    {/* Content */}
                    <div
                        className="blog-content"
                        style={{ fontSize: '1.2rem', lineHeight: 1.8, color: '#333' }}
                        dangerouslySetInnerHTML={{ __html: post.content[lang === 'tr' ? 'tr' : 'en'] }}
                    />

                    {/* Back Button */}
                    <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '40px' }}>
                        <Link href="/blog" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#FF6B35',
                            fontWeight: 600,
                            textDecoration: 'none'
                        }}>
                            ← {lang === 'tr' ? 'Blog\'a Dön' : 'Back to Blog'}
                        </Link>
                    </div>

                </article>
            </div>

            <Footer />
        </main>
    )
}
