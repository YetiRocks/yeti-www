// Blog post data — fetched from local BlogPost table (synced from GitHub by server resource).

export interface Post {
  id?: string
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  content?: string
  heroImage?: string
}

const API_BASE = `${__STATIC_ROOT__}/${__RESOURCES_ROOT__}`
const PREVIEW_COOKIE = 'blog_preview_date'

let postsCache: Post[] | null = null
let postsCacheTime = 0
const CACHE_TTL = 10_000

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; SameSite=Lax`
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`
}

/** Get the preview date from URL param or cookie. On /blog without ?date=, clears the cookie. */
function getPreviewDate(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  const dateParam = urlParams.get('date')

  if (dateParam) {
    setCookie(PREVIEW_COOKIE, dateParam)
    return dateParam
  }

  // On /blog without ?date=, clear preview mode
  if (window.location.pathname.endsWith('/blog') || window.location.pathname.endsWith('/blog/')) {
    deleteCookie(PREVIEW_COOKIE)
    return null
  }

  // On other pages (e.g. /blog/some-slug), use cookie if set
  return getCookie(PREVIEW_COOKIE)
}

export async function fetchPosts(): Promise<Post[]> {
  const now = Date.now()
  if (postsCache && (now - postsCacheTime) < CACHE_TTL) return postsCache
  try {
    const previewDate = getPreviewDate()
    const dateQuery = previewDate ? `?date=${previewDate}` : ''
    const resp = await fetch(`${API_BASE}/BlogPost/${dateQuery}`)
    if (!resp.ok) return postsCache || []
    const records: Post[] = await resp.json()
    const posts = records.map(r => ({
      slug: r.id || (r as any).slug || '',
      title: r.title || '',
      description: r.description || '',
      date: r.date || '',
      author: r.author || 'Yeti Team',
      category: r.category || 'Engineering',
      readingTime: r.readingTime || '5 min read',
    }))
    posts.sort((a, b) => b.date.localeCompare(a.date))
    postsCache = posts
    postsCacheTime = now
    return posts
  } catch { return postsCache || [] }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const previewDate = getPreviewDate()
    const dateQuery = previewDate ? `?date=${previewDate}` : ''
    const resp = await fetch(`${API_BASE}/BlogPost/${slug}${dateQuery}`)
    if (!resp.ok) return null
    const r: any = await resp.json()
    return {
      slug: r.id || slug,
      title: r.title || slug,
      description: r.description || '',
      date: r.date || '',
      author: r.author || 'Yeti Team',
      category: r.category || 'Engineering',
      readingTime: r.readingTime || '5 min read',
      content: r.content || '',
      heroImage: r.heroImage || undefined,
    }
  } catch { return null }
}
