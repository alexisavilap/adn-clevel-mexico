import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import SectionLabel from '../ui/SectionLabel'
import { EDUCATION_FIELDS, UNIVERSITIES } from '../../data/constants'

const GOLD = '#f8d43d'
const BLUE = '#4562e9'
const NAVY = '#21325e'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#21325e] border border-[#6b7fa3]/30 px-4 py-3 font-mono text-xs text-white">
      <p className="text-[#f8d43d] font-bold">{payload[0]?.value} menciones</p>
    </div>
  )
}

const LEVEL_DATA = [
  { label: 'Maestría / MBA', pct: 48, color: GOLD },
  { label: 'Solo licenciatura', pct: 18, color: BLUE },
  { label: 'Sin datos educativos', pct: 33, color: '#3e497a' },
  { label: 'Doctorado', pct: 2, color: BLUE },
]

export default function SectionEducation() {
  return (
    <section className="bg-white text-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="05" text="Educación" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          ¿Qué estudiaron
          <br />
          <span className="text-[#21325e]">los que llegaron?</span>
        </h2>

        <p className="font-sans text-[#0a0a0a]/70 text-lg mb-16 max-w-xl leading-relaxed">
          Probablemente no lo que imaginas.
        </p>

        {/* MBA myth-bust banner — yellow */}
        <div className="bg-[#f8d43d] text-[#0a0a0a] p-8 md:p-12 mb-16">
          <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">
            El MBA no acorta el camino
          </h3>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div>
              <p className="font-mono text-[#0a0a0a]/80 text-xs tracking-widest uppercase mb-2">Con MBA / Maestría</p>
              <p className="font-display text-6xl font-black text-[#21325e]">18.9</p>
              <p className="font-mono text-sm text-[#0a0a0a]/80 mt-1">años promedio</p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl text-[#0a0a0a]/70 font-bold">≈</p>
              <p className="font-mono text-xs text-[#0a0a0a]/80 mt-2">diferencia estadísticamente irrelevante</p>
            </div>
            <div>
              <p className="font-mono text-[#0a0a0a]/80 text-xs tracking-widest uppercase mb-2">Sin posgrado documentado</p>
              <p className="font-display text-6xl font-black text-[#21325e]">19.0</p>
              <p className="font-mono text-sm text-[#0a0a0a]/80 mt-1">años promedio</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#0a0a0a]/15">
            <p className="font-sans text-[#0a0a0a]/80 text-sm leading-relaxed">
              Con o sin maestría, el tiempo promedio al C-Level es casi idéntico: 18.9 vs 19.0 años.
              La diferencia es estadísticamente irrelevante.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          {/* Fields of study */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">Campo de estudio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={EDUCATION_FIELDS} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 10 }}>
                <XAxis
                  type="number"
                  tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="field"
                  tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={130}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 3, 3, 0]}>
                  {EDUCATION_FIELDS.map((entry, i) => (
                    <Cell key={i} fill={i === 0 ? GOLD : BLUE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-[#c5e2ff] border-l-2 border-[#f8d43d]">
              <p className="font-mono text-sm text-[#21325e]">
                <strong>Solo el 8% estudió Recursos Humanos.</strong>
                {' '}Si vienes de otra carrera, no estás en desventaja — estás en la norma.
              </p>
            </div>
          </div>

          {/* Universities */}
          <div>
            <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">Universidades más frecuentes</h3>
            <div className="space-y-3">
              {UNIVERSITIES.map((u, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <span className="font-mono text-xs text-[#21325e] w-5 text-right">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-sans text-sm font-medium ${i === 0 ? 'text-[#21325e] font-bold' : 'text-[#0a0a0a]'}`}>
                        {u.uni}
                      </span>
                      <span className="font-mono text-xs text-[#21325e]">{u.count}</span>
                    </div>
                    <div className="h-1.5 bg-[#c5e2ff] rounded-full overflow-hidden">
                      <motion.div
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: i === 0 ? GOLD : BLUE }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(u.count / 39) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.04 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-[#c5e2ff] border-l-2 border-[#f8d43d]">
              <p className="font-mono text-sm text-[#21325e]">
                <strong>Tec de Monterrey</strong> aparece 3.3× más que la segunda universidad.
              </p>
            </div>
          </div>
        </div>

        {/* Education levels */}
        <div className="bg-[#c5e2ff] p-8 md:p-12">
          <h3 className="font-display text-2xl font-bold mb-8 text-[#21325e]">Nivel de estudios documentado</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {LEVEL_DATA.map((l, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-xl"
                  style={{ backgroundColor: l.color, color: l.color === GOLD ? '#0a0a0a' : '#ffffff' }}
                >
                  {l.pct}%
                </div>
                <p className="font-mono text-xs text-[#21325e]">{l.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
