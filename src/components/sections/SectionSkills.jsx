import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'
import AnimatedNumber from '../ui/AnimatedNumber'
import { SKILLS } from '../../data/constants'

const GOLD = '#f8d43d'

export default function SectionSkills() {
  const max = SKILLS[0].n

  return (
    <section className="bg-white text-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="08" text="Habilidades" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          Las habilidades que
          <br />
          <span className="text-[#21325e]">la red les reconoce.</span>
        </h2>

        <p className="font-sans text-[#0a0a0a]/70 text-lg mb-16 max-w-2xl leading-relaxed">
          No las que ellos declaran — las que otros les avalan.
          Las dos más frecuentes no son técnicas de RH.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Skills bars */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">Skills más avaladas en LinkedIn</h3>
            <div className="space-y-4">
              {SKILLS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-sans text-sm font-medium text-[#0a0a0a]">{s.skill}</span>
                    <span className="font-mono text-xs text-[#21325e]">{s.n}</span>
                  </div>
                  <div className="h-2 bg-[#21325e]/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-2 rounded-full"
                      style={{ backgroundColor: i < 2 ? GOLD : '#4562e9' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(s.n / max) * 100}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.06 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* LinkedIn presence */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">Presencia digital</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 4200, suffix: '', label: 'Conexiones promedio', note: 'mediana: 2,089' },
                { value: 5549, suffix: '', label: 'Seguidores promedio', note: 'mediana: 2,549' },
                { value: 13, suffix: '%', label: 'Tienen +10K seguidores', note: '16 de 120 perfiles' },
                { value: 88, suffix: '%', label: 'Hablan inglés', note: 'de quienes listan idiomas' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-[#21325e] text-white p-6"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="font-display text-3xl font-black text-[#f8d43d]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-mono text-xs text-white/80 mt-1">{stat.label}</p>
                  <p className="font-mono text-[10px] text-white/60 mt-1">{stat.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Gender digital comparison */}
            <div className="mt-6 p-6 bg-[#f4f7ff] border border-[#21325e]/20">
              <p className="font-mono text-xs text-[#21325e] uppercase tracking-widest mb-4">Seguidores promedio por género</p>
              <div className="space-y-3">
                {[
                  { label: 'Mujeres', val: 6570, pct: 100 },
                  { label: 'Hombres', val: 5350, pct: 81 },
                ].map((g, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-[#21325e]">{g.label}</span>
                      <span className="font-mono text-xs text-[#0a0a0a] font-bold">{g.val.toLocaleString('es-MX')}</span>
                    </div>
                    <div className="h-1.5 bg-[#21325e]/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full bg-[#f8d43d]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${g.pct}%` }}
                        transition={{ duration: 0.9, ease: 'easeOut', delay: i * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
