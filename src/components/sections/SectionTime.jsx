import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { useInView } from '../../hooks/useInView'
import AnimatedNumber from '../ui/AnimatedNumber'
import SectionLabel from '../ui/SectionLabel'
import { YEARS_DISTRIBUTION } from '../../data/constants'

const GOLD = '#f8d43d'
const BLUE = '#4562e9'
const NAVY = '#21325e'

const MAIN_STATS = [
  { value: 19, suffix: ' años', label: 'Promedio y mediana al C-Level', big: true },
  { value: 43, suffix: ' años', label: 'Edad estimada al llegar' },
  { value: 2.7, suffix: ' años', decimals: 1, label: 'En el rol actual (mediana)' },
  { value: 8.9, suffix: '', decimals: 1, label: 'Posiciones en la carrera (prom.)' },
]

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#21325e] border border-[#6b7fa3]/30 px-4 py-3 font-mono text-xs text-white">
      <p className="text-white/70 mb-1">{payload[0]?.payload?.full}</p>
      <p className="text-[#f8d43d] font-bold">{payload[0]?.value}% del dataset</p>
    </div>
  )
}

export default function SectionTime() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="bg-white text-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="01" text="El Tiempo" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          19 años. Eso es lo que
          <br />
          <span className="text-[#21325e]">tarda en promedio.</span>{' '}
          Ni más, ni menos.
        </h2>

        <p className="font-sans text-[#0a0a0a]/70 text-lg mb-16 max-w-2xl leading-relaxed">
          El dato más robusto del estudio: promedio y mediana son idénticos.
          El camino es más predecible de lo que imaginas.
        </p>

        {/* Stats grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#21325e]/20 border border-[#21325e]/20 mb-20">
          {MAIN_STATS.map((s, i) => (
            <motion.div
              key={i}
              className="bg-white px-6 py-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
            >
              <p className={`font-display font-black text-[#21325e] leading-none ${s.big ? 'text-7xl' : 'text-5xl'}`}>
                <AnimatedNumber value={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="font-mono text-[11px] text-[#21325e] mt-3 leading-relaxed">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Distribution bar chart — full width */}
        <div className="mb-16">
          <h3 className="font-display text-2xl font-bold mb-8 text-[#0a0a0a]">
            Distribución por años de carrera
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={YEARS_DISTRIBUTION} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <XAxis
                dataKey="label"
                tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 11 }}
                axisLine={{ stroke: NAVY }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="pct" radius={[3, 3, 0, 0]}>
                {YEARS_DISTRIBUTION.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.label === '<10' || entry.label === '15-20' ? GOLD : BLUE}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Micro-CTA */}
        <p className="font-mono text-[12px] mt-4">
          <span className="text-[#21325e]">¿En qué percentil estás tú? Calcúlalo al final de esta página</span>
          {' '}<span className="text-[#21325e]">→</span>
        </p>
      </div>
    </section>
  )
}
