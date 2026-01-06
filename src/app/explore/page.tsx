import { Metadata } from 'next'
import ExploreContent from './ExploreContent'

export const metadata: Metadata = {
    title: 'Explore Hex World - 3D Interactive Experience | Keşfet',
    description: 'Drive through our 3D world to explore our services and projects interactively. | Hizmetlerimizi ve projelerimizi interaktif olarak keşfetmek için 3D dünyamızda sürüş yapın.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/explore',
    }
}

export default function ExplorePage() {
    return <ExploreContent />
}
