import { Link, useRouterState } from '@tanstack/react-router'
import { useState, useCallback } from 'react'

const THEME_KEY = 'yeti-theme'

const themes = [
  { name: 'black', value: '#0e0e0e' },
  { name: 'blue', value: '#0a0e14' },
  { name: 'green', value: '#0a120a' },
  { name: 'brown', value: '#120e0a' },
] as const

function getSavedTheme(): number {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved !== null) {
      const idx = parseInt(saved, 10)
      if (idx >= 0 && idx < themes.length) return idx
    }
  } catch {}
  return 0
}

function applyTheme(index: number) {
  document.documentElement.style.setProperty('--color-black', themes[index].value)
}

// Apply saved theme immediately to avoid flash
applyTheme(getSavedTheme())

const platformPrefix = '/platform'
const solutionsPrefix = '/solutions'
const developersPrefix = '/developers'

interface NavProps {
  onGetStarted: () => void
}

export default function Nav({ onGetStarted }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeIndex, setThemeIndex] = useState(getSavedTheme)
  const pathname = useRouterState({ select: s => s.location.pathname })

  const isPlatformActive = pathname.startsWith(platformPrefix)
  const isSolutionsActive = pathname.startsWith(solutionsPrefix)
  const isDevelopersActive = pathname.startsWith(developersPrefix)
  const hasSubnav = isPlatformActive || isSolutionsActive || isDevelopersActive

  const cycleTheme = useCallback(() => {
    const next = (themeIndex + 1) % themes.length
    setThemeIndex(next)
    applyTheme(next)
    try { localStorage.setItem(THEME_KEY, String(next)) } catch {}
  }, [themeIndex])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav className="nav">
        <div className="nav-left">
          <Link to="/">
            <img src={"/logo_white.svg"} alt="Yeti" className="nav-logo" />
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/" className="nav-link" activeProps={{ className: 'nav-link active' }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/platform/applications" className={`nav-link${isPlatformActive ? ' active' : ''}`}>
            Platform
          </Link>
          <Link to="/solutions/media-security" className={`nav-link${isSolutionsActive ? ' active' : ''}`}>
            Solutions
          </Link>
          <Link to="/developers/getting-started" className={`nav-link${isDevelopersActive ? ' active' : ''}`}>
            Developers
          </Link>
          <Link to="/pricing" className="nav-link" activeProps={{ className: 'nav-link active' }}>
            Pricing
          </Link>
          <Link to="/blog" className="nav-link" activeProps={{ className: 'nav-link active' }}>
            Blog
          </Link>
        </div>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={cycleTheme}
            aria-label={`Theme: ${themes[themeIndex].name}`}
            title={`Theme: ${themes[themeIndex].name}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <rect x="7" y="7" width="4" height="4" />
              <rect x="13" y="7" width="4" height="4" />
              <rect x="7" y="13" width="4" height="4" />
              <rect x="13" y="13" width="4" height="4" />
            </svg>
          </button>
          <button className="btn btn-primary" onClick={onGetStarted}>
            Get Started
          </button>
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? '\u2715' : '\u2630'}
          </button>
        </div>
      </nav>

      {hasSubnav && (
        <div className="www-subnav">
          {isPlatformActive && <>
            <Link to="/platform/applications" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Applications
            </Link>
            <Link to="/platform/databases" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Databases
            </Link>
            <Link to="/platform/interfaces" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Interfaces
            </Link>
            <Link to="/platform/plugins" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Plugins
            </Link>
            <Link to="/platform/fabric" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Fabric
            </Link>
          </>}
          {isSolutionsActive && <>
            <Link to="/solutions/media-security" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Media Security
            </Link>
            <Link to="/solutions/agentic-harness" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Agentic Harness
            </Link>
            <Link to="/solutions/llm-optimization" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              LLM Optimization
            </Link>
          </>}
          {isDevelopersActive && <>
            <Link to="/developers/getting-started" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Getting Started
            </Link>
            <Link to="/developers/demos" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Demos
            </Link>
            <Link to="/developers/benchmarks" className="subnav-link" activeProps={{ className: 'subnav-link active' }}>
              Benchmarks
            </Link>
            <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="subnav-link">
              Docs
            </a>
          </>}
        </div>
      )}

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMobile}>
          Home
        </Link>
        <span className="nav-mobile-header">Platform</span>
        <Link to="/platform/applications" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Applications
        </Link>
        <Link to="/platform/databases" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Databases
        </Link>
        <Link to="/platform/interfaces" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Interfaces
        </Link>
        <Link to="/platform/plugins" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Plugins
        </Link>
        <Link to="/platform/fabric" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Fabric
        </Link>
        <span className="nav-mobile-header">Solutions</span>
        <Link to="/solutions/media-security" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Media Security
        </Link>
        <Link to="/solutions/agentic-harness" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Agentic Harness
        </Link>
        <Link to="/solutions/llm-optimization" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          LLM Optimization
        </Link>
        <span className="nav-mobile-header">Developers</span>
        <Link to="/developers/getting-started" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Getting Started
        </Link>
        <Link to="/developers/demos" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Demos
        </Link>
        <Link to="/developers/benchmarks" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Benchmarks
        </Link>
        <a href="/documentation/" target="_blank" rel="noopener noreferrer" className="nav-link nav-mobile-indent" onClick={closeMobile}>
          Docs
        </a>
        <Link to="/pricing" className="nav-link" onClick={closeMobile}>
          Pricing
        </Link>
        <Link to="/blog" className="nav-link" onClick={closeMobile}>
          Blog
        </Link>
        <button className="btn btn-primary nav-mobile-cta" onClick={() => { closeMobile(); onGetStarted(); }}>
          Get Started
        </button>
      </div>
    </>
  )
}
