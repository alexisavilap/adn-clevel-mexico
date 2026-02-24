import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import simonLogo from '../../resources/logo-simon.png'

export default function Nav({ onCTA }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={simonLogo} alt="Simón" className="h-7 bg-white px-1 rounded-sm" />
          <span className="font-display text-off-white font-bold text-sm tracking-wide">
            ADN C-Level · MX
          </span>
        </div>
        <button
          onClick={onCTA}
          className="bg-gold text-black font-mono text-xs font-medium px-5 py-2.5 hover:bg-gold-light transition-colors"
        >
          Calcular mi ruta →
        </button>
      </div>
    </motion.nav>
  )
}
