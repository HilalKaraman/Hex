import { Metadata } from 'next'
import ProjectsContent from './ProjectsContent'

export const metadata: Metadata = {
    title: 'Our Projects - Hex Studio | Projelerimiz',
    description: 'Explore our portfolio of AI solutions, web applications, and mobile projects. | Yapay zeka çözümlerimiz, web uygulamalarımız ve mobil projelerimizden oluşan portföyümüzü keşfedin.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/projects',
    }
}

export default function ProjectsPage() {
    return <ProjectsContent />
}
