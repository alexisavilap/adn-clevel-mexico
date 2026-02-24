import { motion } from 'framer-motion'

const STATS = [
  { value: '120', label: 'perfiles analizados' },
  { value: '84', label: 'empresas' },
  { value: '12+', label: 'industrias' },
  { value: '19', label: 'años al C-Level' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function Hero({ onCTA }) {
  return (
    <section className="min-h-screen bg-ink text-off-white flex flex-col justify-end relative overflow-hidden pb-20 pt-32">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Eyebrow */}
          <motion.p variants={item} className="font-mono text-gold text-xs tracking-widest uppercase mb-6">
            LinkedIn Data &nbsp;·&nbsp; 120 perfiles &nbsp;·&nbsp; México &nbsp;·&nbsp; 2025
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={item}
            className="font-display text-[clamp(3rem,8vw,7.5rem)] font-black leading-[0.95] mb-6"
          >
            El ADN del
            <br />
            <span className="text-gold">C-Level</span>
            <br />
            en México
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="font-sans font-light text-white/70 text-lg md:text-xl max-w-lg mb-12 leading-relaxed">
            Analizamos 120 perfiles reales. Estos son los patrones —
            y lo que significan para tu carrera.
          </motion.p>

          {/* Stat pills */}
          <motion.div variants={item} className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-muted/20 border border-muted/20 mb-12">
            {STATS.map((s, i) => (
              <div key={i} className="bg-ink px-6 py-5">
                <p className="font-display text-2xl font-bold text-gold">{s.value}</p>
                <p className="font-mono text-[11px] text-white/70 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-wrap gap-4 items-center">
            <button
              onClick={onCTA}
              className="bg-gold text-black font-sans font-bold px-8 py-4 text-base hover:bg-gold-light active:scale-95 transition-all"
            >
              Calcula tu ruta al C-Level →
            </button>
            <span className="font-mono text-white/70 text-xs">5 preguntas · Sin registro previo</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent to-gold/60"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p className="font-mono text-[10px] text-muted/50 tracking-widest">SCROLL</p>
      </motion.div>
    </section>
  )
}
