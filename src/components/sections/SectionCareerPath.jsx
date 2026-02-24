import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import SectionLabel from '../ui/SectionLabel'
import { CAREER_LADDER, PREVIOUS_ROLES, FUNCTIONAL_AREAS } from '../../data/constants'

const GOLD = '#f8d43d'
const BLUE = '#4562e9'
const MUTED = '#6b7fa3'
const OFF_WHITE = '#ffffff'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#0a0a0a] border border-[#6b7fa3]/30 px-4 py-3 font-mono text-xs text-white">
      <p className="text-[#f8d43d] font-bold">{payload[0]?.value}{payload[0]?.name === 'appearances' ? '' : '%'}</p>
    </div>
  )
}

export default function SectionCareerPath() {
  return (
    <section className="bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="04" text="Plan de Carrera" light />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          La escalera
          <br />
          <span className="text-[#f8d43d]">típica.</span>
        </h2>

        <p className="font-sans text-white/60 text-lg mb-16 max-w-2xl leading-relaxed">
          No es la única ruta. Pero sí la más transitada.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Career ladder */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8">La ruta más transitada</h3>
            <div className="relative">
              {CAREER_LADDER.map((step, i) => (
                <motion.div
                  key={i}
                  className="relative pl-12 pb-8 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Connector line */}
                  {i < CAREER_LADDER.length - 1 && (
                    <div className="absolute left-[19px] top-8 bottom-0 w-px bg-[#6b7fa3]/30" />
                  )}
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-1 w-10 h-10 flex items-center justify-center font-mono text-sm font-bold ${
                      i === CAREER_LADDER.length - 1
                        ? 'bg-[#f8d43d] text-black'
                        : 'bg-[#6b7fa3]/20 text-[#f8d43d] border border-[#6b7fa3]/30'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <p className={`font-display font-bold text-lg ${i === CAREER_LADDER.length - 1 ? 'text-[#f8d43d]' : 'text-white'}`}>
                      {step.level}
                    </p>
                    <p className="font-mono text-xs text-[#6b7fa3] mt-1">{step.years}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Previous roles */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8">Rol inmediatamente anterior al C-Level</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={PREVIOUS_ROLES} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 10 }}>
                <XAxis
                  type="number"
                  tick={{ fill: MUTED, fontFamily: 'DM Mono', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  type="category"
                  dataKey="role"
                  tick={{ fill: OFF_WHITE, fontFamily: 'DM Mono', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pct" radius={[0, 3, 3, 0]}>
                  {PREVIOUS_ROLES.map((entry, i) => (
                    <Cell key={i} fill={entry.role === 'Director de RRHH' ? GOLD : BLUE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Functional areas */}
        <div className="border-t border-[#6b7fa3]/20 pt-16">
          <h3 className="font-display text-2xl font-bold mb-8">
            Áreas funcionales más transitadas en toda la carrera
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FUNCTIONAL_AREAS.map((area, i) => (
              <motion.div
                key={i}
                className={`p-5 border ${i === 0 ? 'border-[#f8d43d]/50 bg-[#f8d43d]/5' : 'border-[#6b7fa3]/20'}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                <p className={`font-display text-2xl font-bold mb-1 ${i === 0 ? 'text-[#f8d43d]' : 'text-white'}`}>
                  {area.appearances}
                </p>
                <p className="font-mono text-xs text-[#6b7fa3]">{area.area}</p>
              </motion.div>
            ))}
          </div>
          <p className="font-mono text-xs text-[#6b7fa3] mt-4">
            Número de apariciones en los historiales analizados.
          </p>
        </div>

        {/* Callout */}
        <div className="mt-16 bg-[#f8d43d]/10 border border-[#f8d43d]/30 p-8">
          <p className="font-display text-2xl font-bold text-[#f8d43d] mb-2">
            El trampolín no es VP — es Director. El 30% llegó al C-Level directamente desde Director de RRHH.
          </p>
          <p className="font-sans text-white/80 text-base leading-relaxed">
            Y el 11% ya era CHRO en otra empresa — lo que confirma que el mercado valora experiencia horizontal.
          </p>
        </div>

        {/* Micro-CTA */}
        <p className="font-mono text-[12px] mt-10">
          <span className="text-[#6b7fa3]">¿En qué escalón estás hoy?</span>
          {' '}<span className="text-[#f8d43d]">→</span>
        </p>
      </div>
    </section>
  )
}
