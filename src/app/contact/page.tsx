import { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
    title: 'Contact Hex Studio | İletişim',
    description: 'Get in touch with Hex Studio for your AI and software needs. | Yapay zeka ve yazılım ihtiyaçlarınız için Hex Studio ile iletişime geçin.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/contact',
    }
}

export default function ContactPage() {
    return <ContactContent />
}
