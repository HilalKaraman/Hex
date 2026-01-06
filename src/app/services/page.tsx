import { Metadata } from 'next'
import ServicesContent from './ServicesContent'

export const metadata: Metadata = {
    title: 'AI & Software Services - Hex Studio | Hizmetlerimiz',
    description: 'Custom AI development, web apps, mobile solutions, and digital transformation services. | Özel yapay zeka geliştirme, web uygulamaları ve dijital dönüşüm hizmetleri.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/services',
    }
}

export default function ServicesPage() {
    return <ServicesContent />
}
