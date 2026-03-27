import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BetaModal from './components/BetaModal'
import Home from './pages/Home'
import Platform from './pages/Platform'
import Applications from './pages/Applications'
import Demos from './pages/Demos'
import Hosting from './pages/Hosting'
import UseCases from './pages/UseCases'
import Benchmarks from './pages/Benchmarks'
import Legal from './pages/Legal'
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import SoftwareLicense from './pages/legal/SoftwareLicense'
import CookiePolicy from './pages/legal/CookiePolicy'
import AcceptableUse from './pages/legal/AcceptableUse'
import SupportPolicy from './pages/legal/SupportPolicy'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = document.querySelector('.page')
    if (page) page.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <BrowserRouter basename={__BASENAME__}>
      <ScrollToTop />
      <div className="app">
        <Nav onGetStarted={() => setShowModal(true)} />
        <main className="page">
          <Routes>
            <Route path="/" element={<Home onGetStarted={() => setShowModal(true)} />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/cloud" element={<Hosting />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/demos" element={<Demos />} />
            <Route path="/benchmarks" element={<Benchmarks />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/legal/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/legal/software-license" element={<SoftwareLicense />} />
            <Route path="/legal/cookie-policy" element={<CookiePolicy />} />
            <Route path="/legal/acceptable-use" element={<AcceptableUse />} />
            <Route path="/legal/support-policy" element={<SupportPolicy />} />
          </Routes>
          <Footer />
        </main>
        {showModal && <BetaModal onClose={() => setShowModal(false)} />}
      </div>
    </BrowserRouter>
  )
}
