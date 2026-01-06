import { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
    title: 'About Hex Studio - Our Mission & Vision | Hakkımızda',
    description: 'Learn about Hex Studio, our mission to democratize AI, and our team of experts. | Hex Studio, misyonumuz ve uzman ekibimiz hakkında bilgi edinin.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/about',
    }
}

export default function AboutPage() {
    return <AboutContent />
}
