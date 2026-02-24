import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import SectionLabel from '../ui/SectionLabel'
import { CANTERA } from '../../data/constants'

const GOLD = '#f8d43d'
const GOLD_LIGHT = '#4562e9'
const TICK_DARK = 'rgba(255,255,255,0.7)'
const OFF_WHITE = '#ffffff'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-ink border border-muted/30 px-4 py-3 font-mono text-xs text-off-white">
      <p className="text-gold font-bold">{payload[0]?.value} apariciones</p>
    </div>
  )
}

export default function SectionCantera() {
  const top2 = CANTERA.slice(0, 2)
  const rest = CANTERA.slice(2)

  return (
    <section className="bg-ink text-off-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="06" text="La Cantera" light />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          ¿De dónde salen
          <br />
          <span className="text-gold">los CHROs de México?</span>
        </h2>
        <p className="font-sans text-white/70 text-lg mb-16 max-w-2xl">
          Estas son las empresas que aparecen en casi la mitad de los historiales de carrera.
        </p>

        {/* Top 2 callout */}
        <div className="grid md:grid-cols-2 gap-px bg-muted/20 border border-muted/20 mb-12">
          {top2.map((c, i) => (
            <motion.div
              key={i}
              className="bg-ink px-8 py-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-gold text-xs tracking-widest uppercase mb-4">#{i + 1}</p>
              <p className="font-display text-4xl font-bold text-off-white mb-2">{c.company}</p>
              <p className="font-display text-6xl font-black text-gold">{c.n}</p>
              <p className="font-mono text-xs text-white/70 mt-2">apariciones en historiales</p>
            </motion.div>
          ))}
        </div>

        {/* Callout stat */}
        <div className="border border-gold/30 bg-gold/5 p-6 mb-16">
          <p className="font-sans text-off-white text-lg">
            <strong className="text-gold">PepsiCo y Unilever juntas</strong> aparecen en aproximadamente el{' '}
            <strong className="text-gold">46% de los historiales</strong>. Son la cantera dominante del CHRO mexicano.
          </p>
        </div>

        {/* Full chart */}
        <h3 className="font-display text-2xl font-bold mb-8">Top 14 empresas</h3>
        <ResponsiveContainer width="100%" height={380}>
          <BarChart data={CANTERA} margin={{ top: 0, right: 0, bottom: 60, left: -10 }}>
            <XAxis
              dataKey="company"
              tick={{ fill: TICK_DARK, fontFamily: 'DM Mono', fontSize: 11, angle: -40, textAnchor: 'end' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.3)' }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tick={{ fill: TICK_DARK, fontFamily: 'DM Mono', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="n" radius={[3, 3, 0, 0]}>
              {CANTERA.map((entry, i) => (
                <Cell key={i} fill={i < 2 ? GOLD : GOLD_LIGHT} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
