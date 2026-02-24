import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { useInView } from '../../hooks/useInView'
import AnimatedNumber from '../ui/AnimatedNumber'
import SectionLabel from '../ui/SectionLabel'
import { MOBILITY_COMPANIES, TENURE_DISTRIBUTION } from '../../data/constants'

const GOLD = '#f8d43d'
const BLUE = '#4562e9'
const NAVY = '#21325e'

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#21325e] border border-[#6b7fa3]/30 px-4 py-3 font-mono text-xs text-white">
      <p className="text-[#f8d43d] font-bold">{payload[0]?.value}%</p>
    </div>
  )
}

export default function SectionMobility() {
  const { ref, inView } = useInView(0.15)

  return (
    <section className="bg-[#c5e2ff] text-[#21325e] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="03" text="Movilidad" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          Cuántas empresas
          <br />
          <span className="text-[#21325e]">importan.</span>
        </h2>

        <p className="font-sans text-[#21325e] text-lg mb-16 max-w-2xl leading-relaxed">
          El 41% estuvo en 4 a 6 empresas. Solo el 8% se quedó en una sola.
          Y cambiar de empresa no frena la carrera — los datos lo confirman.
        </p>

        {/* Key stat + chart row */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {/* Big number */}
          <div ref={ref} className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <p className="font-mono text-xs text-[#21325e] uppercase tracking-widest mb-4">Promedio empresas</p>
              <p className="font-display text-[6rem] font-black leading-none text-[#f8d43d]">
                <AnimatedNumber value={4.9} decimals={1} />
              </p>
              <p className="font-mono text-sm text-[#21325e] mt-2">empresas en toda la carrera</p>

              <div className="mt-8 pt-8 border-t border-[#21325e]/20 space-y-3">
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-[#21325e]">Fichado del exterior</span>
                  <span className="font-display font-bold text-[#21325e] text-xl">53%</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono text-xs text-[#21325e]">Promoción interna</span>
                  <span className="font-display font-bold text-[#21325e] text-xl">42%</span>
                </div>
                <p className="font-mono text-[10px] text-[#21325e] pt-1">
                  Da igual si te fichan de afuera o te promueven desde adentro.
                  El tiempo al C-Level es prácticamente el mismo: ~19.5 años en ambas rutas.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Distribution chart */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-6 text-[#21325e]">
              Distribución por número de empresas
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={MOBILITY_COMPANIES} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <XAxis
                  dataKey="label"
                  tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 12 }}
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
                <Bar dataKey="pct" radius={[4, 4, 0, 0]}>
                  {MOBILITY_COMPANIES.map((entry, i) => (
                    <Cell key={i} fill={entry.label === '4-6 empresas' ? GOLD : BLUE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <p className="font-mono text-xs text-[#21325e] mt-3">
              El rango 4–6 empresas es el más común (41%) y coincide con los perfiles más completos del dataset.
            </p>
          </div>
        </div>

        {/* Tenure in current role */}
        <div className="bg-white border border-[#21325e]/15 p-8 md:p-12 mb-12">
          <h3 className="font-display text-2xl font-bold mb-8 text-[#21325e]">Permanencia en el rol actual</h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={TENURE_DISTRIBUTION} layout="vertical" margin={{ top: 0, right: 30, bottom: 0, left: 0 }}>
                  <XAxis
                    type="number"
                    tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <YAxis
                    type="category"
                    dataKey="label"
                    tick={{ fill: NAVY, fontFamily: 'DM Mono', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="pct" radius={[0, 3, 3, 0]}>
                    {TENURE_DISTRIBUTION.map((entry, i) => (
                      <Cell key={i} fill={entry.label === '2-5 años' ? GOLD : BLUE} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-display text-5xl font-black text-[#f8d43d]">2.7 años</p>
                <p className="font-mono text-sm text-[#21325e] mt-1">mediana en el rol actual</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-[#21325e]">4.0 años</p>
                <p className="font-mono text-sm text-[#21325e] mt-1">promedio en el rol actual</p>
              </div>
              <p className="font-sans text-sm text-[#21325e] leading-relaxed">
                El 41% lleva entre 2 y 5 años. Solo el 5% supera los 10 años en el mismo cargo C-Level.
              </p>
            </div>
          </div>
        </div>

        {/* Micro-CTA */}
        <p className="font-mono text-[12px]">
          <span className="text-[#21325e]">Tu número de empresas cambia tu diagnóstico. Descúbrelo abajo</span>
          {' '}<span className="text-[#21325e]">→</span>
        </p>
      </div>
    </section>
  )
}
