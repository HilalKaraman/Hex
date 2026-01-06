import { Metadata } from 'next'
import BlogListContent from './BlogListContent'

export const metadata: Metadata = {
    title: 'Blog - AI & Tech Insights | Hex Studio',
    description: 'Read the latest insights on Artificial Intelligence, Web Development, and Digital Transformation from Hex Studio experts. | Hex Studio uzmanlarından Yapay Zeka, Web Geliştirme ve Dijital Dönüşüm hakkında en son içgörüleri okuyun.',
    alternates: {
        canonical: 'https://www.hexstudio.com.tr/blog',
    }
}

export default function BlogListPage() {
    return <BlogListContent />
}
