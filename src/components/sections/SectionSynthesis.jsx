import { motion } from 'framer-motion'
import SectionLabel from '../ui/SectionLabel'

const PROFILE = [
  { label: 'Experiencia total', value: '23 años' },
  { label: 'Años al C-Level', value: '19 años' },
  { label: 'Edad al llegar', value: '~43 años' },
  { label: 'Empresas previas', value: '4.9 empresas' },
  { label: 'Tiempo en el rol', value: '2.7 años (mediana)' },
  { label: 'Género (dataset)', value: '51% mujeres' },
  { label: 'Ruta de entrada', value: '53% fichado externo' },
  { label: 'Rol previo más común', value: 'Director de RRHH' },
  { label: 'Campo de estudio', value: 'Administración (mayoría)' },
  { label: 'Universidad #1', value: 'Tec de Monterrey' },
  { label: 'Cantera dominante', value: 'PepsiCo + Unilever' },
  { label: 'Habla inglés', value: '88%' },
]

const FINDINGS = [
  { stat: '19 años', text: 'es el promedio y la mediana. La constante más robusta del estudio.' },
  { stat: '2 años', text: 'antes llegan las mujeres que los hombres, en promedio.' },
  { stat: '≈ igual', text: 'con o sin MBA. No hay diferencia estadística en el tiempo.' },
  { stat: '46%', text: 'de los historiales tienen a PepsiCo o Unilever.' },
  { stat: '8%', text: 'estudió Recursos Humanos. La mayoría viene de Administración.' },
  { stat: '8 vs 21', text: 'años: la diferencia entre banca y manufactura.' },
]

export default function SectionSynthesis({ onCTA }) {
  return (
    <section className="bg-[#f8d43d] text-[#0a0a0a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="Síntesis" text="El perfil completo" />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          El CHRO mexicano
          <br />
          en una sola tabla.
        </h2>

        <p className="font-sans text-[#0a0a0a]/70 text-lg mb-16 max-w-xl leading-relaxed">
          ¿Te identificas?
        </p>

        {/* Profile table */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#0a0a0a]/10 border border-[#0a0a0a]/10 mb-20">
          {PROFILE.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white px-6 py-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">{item.label}</p>
              <p className="font-display text-xl font-bold text-[#21325e]">{item.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Key findings strip */}
        <h3 className="font-display text-3xl font-bold mb-8 text-[#0a0a0a]">5 cosas que los datos contradicen</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {FINDINGS.map((f, i) => (
            <motion.div
              key={i}
              className="bg-[#21325e] text-white p-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="font-display text-3xl font-black text-[#f8d43d] mb-3">{f.stat}</p>
              <p className="font-sans text-sm text-white/80 leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="bg-[#21325e] text-white p-12 md:p-16 text-center">
          <p className="font-mono text-[#f8d43d] text-xs tracking-widest uppercase mb-4">
            ¿Y tú?
          </p>
          <h3 className="font-display text-4xl md:text-5xl font-black mb-6 leading-tight">
            Calcula dónde estás
            <br />
            tú en esta radiografía.
          </h3>
          <p className="font-sans text-white/70 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            5 preguntas. Benchmark personalizado vs. los 120 perfiles del dataset.
            Tu diagnóstico tarda menos de 2 minutos.
          </p>
          <button
            onClick={onCTA}
            className="bg-[#f8d43d] text-black font-bold px-10 py-4 text-base hover:bg-yellow-dark active:scale-95 transition-all"
          >
            Calcular mi ruta al C-Level →
          </button>
        </div>
      </div>
    </section>
  )
}
