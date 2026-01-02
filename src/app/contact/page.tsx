'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../components/LanguageContext'

export default function ContactPage() {
    const { t } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // Create mailto link with form data
        const mailtoLink = `mailto:hilaalkaramann@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`

        // Open mailto link
        window.location.href = mailtoLink

        setFormData({ name: '', email: '', subject: '', message: '' })
    }

    return (
        <main>
            <div className="container">
                <Navbar />

                {/* Page Hero */}
                <section className="page-hero">
                    <h1 className="page-hero-title">{t.contactPage.hero.title}</h1>
                    <p className="page-hero-subtitle">{t.contactPage.hero.subtitle}</p>
                </section>

                {/* Contact Section */}
                <section className="section" style={{ paddingTop: '40px' }}>
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t.contactPage.form.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="email">{t.contactPage.form.email}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="subject">{t.contactPage.form.subject}</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="form-input"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="message">{t.contactPage.form.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="form-textarea"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn-primary submit-btn">
                                {t.contactPage.form.submit}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                            </button>
                        </form>

                        {/* Contact Info */}
                        <div className="contact-info-card">
                            <h3 className="contact-info-title">{t.contactPage.info.title}</h3>

                            <div className="contact-info-item">
                                <span className="contact-info-icon">📧</span>
                                <div className="contact-info-text">
                                    <h4>Email</h4>
                                    <p>{t.contactPage.info.email}</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <span className="contact-info-icon">📱</span>
                                <div className="contact-info-text">
                                    <h4>Phone</h4>
                                    <p>{t.contactPage.info.phone}</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <span className="contact-info-icon">📍</span>
                                <div className="contact-info-text">
                                    <h4>Address</h4>
                                    <p>{t.contactPage.info.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
