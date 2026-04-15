import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { fetchPost, type Post } from '../data/posts'
import { useSEO } from '../hooks/useSEO'
import Code from '../components/Code'

interface BlogPostProps {
  slug: string
}

/** Split HTML content into segments: plain HTML and code blocks.
 *  Code blocks are extracted from <pre><code class="language-X">...</code></pre> patterns.
 */
function splitContent(html: string): Array<{ type: 'html' | 'code'; value: string; lang?: string }> {
  const segments: Array<{ type: 'html' | 'code'; value: string; lang?: string }> = []
  const regex = /<pre>\s*<code(?:\s+class="language-([^"]*)")?>([\s\S]*?)<\/code>\s*<\/pre>/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(html)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: 'html', value: html.slice(lastIndex, match.index) })
    }
    // Decode HTML entities back to raw text for Prism
    const raw = match[2]
      .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    segments.push({ type: 'code', value: raw, lang: match[1] || 'bash' })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < html.length) {
    segments.push({ type: 'html', value: html.slice(lastIndex) })
  }

  return segments
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useSEO({
    title: post?.title || 'Blog',
    description: post?.description || 'Yeti Blog',
    ogType: 'article',
    canonicalUrl: post ? `https://yetirocks.com/www/blog/${post.slug}` : undefined,
  })

  useEffect(() => {
    fetchPost(slug).then(p => { setPost(p); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/blog" className="blog-back-link">Blog</Link>
          <h1 className="page-title">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Post not found</h1>
          <p className="page-subtitle">
            <Link to="/blog">Back to blog</Link>
          </p>
        </div>
      </div>
    )
  }

  const segments = splitContent(post.content || '')

  return (
    <div className="container">
      <article className="blog-article">
        <div className="blog-post-byline">
          <div className="blog-article-meta">
            <Link to="/blog" className="blog-meta-back">&laquo; ALL POSTS</Link>
            <span className="blog-meta-sep">|</span>
            <span className="blog-card-category">{post.category}</span>
            <span className="blog-meta-sep">|</span>
            <span>{post.date}</span>
            <span className="blog-meta-sep">|</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="page-title">{post.title}</h1>
        </div>
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.title}
            className="blog-hero-image"
            loading="eager"
          />
        )}
        <p className="blog-post-subtitle">{post.description}</p>
        <hr className="blog-divider" />
        <div className="blog-content">
          {segments.map((seg, i) =>
            seg.type === 'code' ? (
              <Code key={i} label={seg.lang || 'code'} language={seg.lang}>{seg.value}</Code>
            ) : (
              <div key={i} dangerouslySetInnerHTML={{ __html: seg.value }} />
            )
          )}
        </div>
      </article>
    </div>
  )
}
