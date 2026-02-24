import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const NAVY = '#21325e'

export default function SectionGender() {
  return (
    <section className="bg-[#f8d43d] text-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="02" text="El Factor Género" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6">
          51% son mujeres —
          <br />
          y llegaron 2 años antes
        </h2>

        <p className="font-sans text-lg leading-relaxed mb-16 max-w-2xl text-[#0a0a0a]/80">
          El C-Level de RH en México es mayoritariamente femenino. Y ellas no solo son mayoría:
          llegaron en promedio a los 17 años de carrera, contra 19 de sus pares hombres.
        </p>

        <div className="max-w-2xl space-y-8">
          {[
            { label: 'Mujeres — 51%', years: 17, max: 21, color: NAVY },
            { label: 'Hombres — 49%', years: 19, max: 21, color: NAVY },
          ].map((g, i) => (
            <div key={i}>
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-mono text-sm text-[#0a0a0a]/70">{g.label}</span>
                <span className="font-display text-3xl font-bold" style={{ color: g.color }}>
                  {g.years} años
                </span>
              </div>
              <div className="h-2 bg-[#0a0a0a]/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: g.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(g.years / g.max) * 100}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.2 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}

          <p className="font-mono text-xs text-[#0a0a0a]/80 pt-2">
            * Género estimado por nombre (n=76 de 120 perfiles identificados)
          </p>
        </div>
      </div>
    </section>
  )
}
