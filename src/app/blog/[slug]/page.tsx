import { Metadata } from 'next'
import BlogPostContent from './BlogPostContent'
import { blogPosts } from '../../../data/blogPosts'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params
    const slug = resolvedParams.slug
    const post = blogPosts.find(p => p.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found | Hex Studio'
        }
    }

    return {
        title: `${post.title.en} | Hex Studio Blog`, // Using English title as default for metadata, ideally we'd detect locale
        description: post.summary.en,
        alternates: {
            canonical: `https://www.hexstudio.com.tr/blog/${slug}`,
        },
        openGraph: {
            title: post.title.en,
            description: post.summary.en,
            type: 'article',
            publishedTime: post.date,
            authors: ['Hex Studio'],
        }
    }
}

export default function BlogPostPage() {
    return <BlogPostContent />
}
