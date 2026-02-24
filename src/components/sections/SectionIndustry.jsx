import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts'
import SectionLabel from '../ui/SectionLabel'
import { INDUSTRY_YEARS } from '../../data/constants'

const GOLD = '#f8d43d'
const BLUE = '#4562e9'
const NAVY = '#21325e'
const TICK_DARK = 'rgba(255,255,255,0.7)'

const sorted = [...INDUSTRY_YEARS].sort((a, b) => a.years - b.years)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div className="bg-[#21325e] border border-[#6b7fa3]/30 px-4 py-3 font-mono text-xs text-white">
      <p className="text-white font-bold mb-1">{d?.industry}</p>
      <p className="text-[#f8d43d]">{d?.years} años promedio</p>
      {d?.n && <p className="text-white/70">{`n = ${d?.n} perfiles`}</p>}
    </div>
  )
}

export default function SectionIndustry() {
  return (
    <section className="bg-[#c5e2ff] text-[#21325e] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="07" text="Por Industria" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          No todas las industrias
          <br />
          <span className="text-[#21325e]">van al mismo ritmo.</span>
        </h2>
        <p className="font-sans text-[#21325e] text-lg mb-16 max-w-2xl">
          En banca el camino dura 8 años. En manufactura, 21. Tu sector importa más de lo que crees.
        </p>

        {/* Extremes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            className="bg-[#21325e] text-white p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[#f8d43d] text-xs tracking-widest uppercase mb-3">Más rápida</p>
            <p className="font-display text-2xl font-bold mb-2">Banca</p>
            <p className="font-display text-7xl font-black text-[#f8d43d] leading-none">8</p>
            <p className="font-mono text-xs text-white/70 mt-2">años promedio</p>
          </motion.div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="font-display text-5xl font-black text-[#21325e]/40">vs.</p>
              <p className="font-mono text-xs text-[#21325e] mt-2">19 años el promedio general</p>
              <div className="mt-4 w-px h-12 bg-[#21325e]/20 mx-auto" />
            </div>
          </div>

          <motion.div
            className="bg-white border border-[#21325e]/20 p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            viewport={{ once: true }}
          >
            <p className="font-mono text-[#21325e] text-xs tracking-widest uppercase mb-3">Más lenta</p>
            <p className="font-display text-2xl font-bold mb-2 text-[#21325e]">Mayorista</p>
            <p className="font-display text-7xl font-black text-[#f8d43d] leading-none">25.8</p>
            <p className="font-mono text-xs text-[#21325e] mt-2">años promedio</p>
          </motion.div>
        </div>

        {/* Full chart */}
        <div className="bg-[#21325e] p-8 md:p-12">
          <h3 className="font-display text-2xl font-bold text-white mb-8">
            Años al C-Level por industria
          </h3>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={sorted} margin={{ top: 0, right: 0, bottom: 60, left: -10 }}>
              <XAxis
                dataKey="industry"
                tick={{ fill: TICK_DARK, fontFamily: 'DM Mono', fontSize: 11, angle: -40, textAnchor: 'end' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
                tickLine={false}
                interval={0}
              />
              <YAxis
                tick={{ fill: TICK_DARK, fontFamily: 'DM Mono', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 30]}
              />
              <ReferenceLine
                y={19}
                stroke={GOLD}
                strokeDasharray="4 4"
                label={{ value: 'Promedio 19', fill: GOLD, fontSize: 11, fontFamily: 'DM Mono' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="years" radius={[3, 3, 0, 0]}>
                {sorted.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.industry === 'Banca' ? GOLD : entry.years > 19 ? '#3e497a' : BLUE}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="font-mono text-xs text-white/70 mt-4">
            * Solo industrias con n≥3 en el dataset. La línea punteada indica el promedio general (19 años).
          </p>
        </div>

        {/* Micro-CTA */}
        <p className="font-mono text-[12px] mt-10">
          <span className="text-[#21325e]">Tu sector importa más de lo que crees para tu diagnóstico</span>
          {' '}<span className="text-[#21325e]">→</span>
        </p>
      </div>
    </section>
  )
}
