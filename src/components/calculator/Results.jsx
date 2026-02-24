import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const GOLD = '#f8d43d'
const MUTED = '#6b7fa3'

function PercentileArc({ percentile }) {
  const radius = 80
  const stroke = 8
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentile / 100) * circumference

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#333"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <motion.circle
            stroke={GOLD}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeLinecap: 'round', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-black text-gold">{percentile}%</span>
        </div>
      </div>
      <p className="font-mono text-xs text-muted mt-2 text-center">
        de velocidad vs. dataset
      </p>
    </div>
  )
}

export default function Results({ result, insight, formData }) {
  const { ref, inView } = useInView(0.2)
  const { yearsRemaining, yearsWorked, totalNeeded, projectedYear, percentile, alreadyThere } = result

  const levelSteps = {
    'Analista/Especialista': 4,
    'Coordinador/Supervisor': 3,
    'Manager/Gerente': 2,
    'HRBP/Business Partner': 2,
    'Director': 1,
    'VP': 1,
    'Ya soy C-Level': 0,
  }
  const stepsAway = levelSteps[formData.currentLevel] ?? 2

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full space-y-6"
    >
      {/* Block 1: Main number */}
      <div className="border border-gold/40 bg-gold/5 p-8 text-center">
        <p className="font-mono text-gold text-xs tracking-widest uppercase mb-4">Tu estimado</p>
        {alreadyThere ? (
          <>
            <p className="font-display text-4xl font-black text-gold">Ya estás en el rango esperado</p>
            <p className="font-sans text-muted text-sm mt-3">
              Con {yearsWorked} años de experiencia, estás dentro del perfil típico de C-Level.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-[5rem] font-black text-gold leading-none">{yearsRemaining}</p>
            <p className="font-display text-xl font-bold text-off-white mt-2">
              años estimados para llegar al C-Level
            </p>
            <p className="font-mono text-sm text-muted mt-2">
              Año proyectado: <span className="text-gold font-bold">{projectedYear}</span>
              {' '}·{' '}
              Carrera total estimada: <span className="text-off-white">{totalNeeded} años</span>
            </p>
          </>
        )}
      </div>

      {/* Block 2: Percentile */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-muted/20 p-6 flex flex-col items-center justify-center">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">
            Tu percentil de velocidad
          </p>
          <PercentileArc percentile={percentile} />
          <p className="font-sans text-off-white/80 text-sm text-center mt-3 leading-relaxed">
            {percentile >= 70
              ? 'Estás en el tercio más rápido del dataset.'
              : percentile >= 43
              ? 'Estás en la mitad superior de velocidad.'
              : 'Aún hay recorrido — pero es normal a este punto.'}
          </p>
        </div>

        {/* Block 3: Benchmark */}
        <div className="border border-muted/20 p-6 space-y-5">
          <p className="font-mono text-xs text-muted uppercase tracking-widest">Benchmark vs. C-Level típico</p>
          {[
            {
              label: 'Años de experiencia',
              yours: `${yearsWorked} años`,
              avg: '23 años (prom. total)',
              ok: yearsWorked >= 15,
            },
            {
              label: 'Empresas trabajadas',
              yours: `${formData.numCompanies} empresa${formData.numCompanies !== 1 ? 's' : ''}`,
              avg: '4.9 promedio',
              ok: formData.numCompanies >= 3,
            },
            {
              label: 'Nivel actual',
              yours: formData.currentLevel,
              avg: stepsAway === 0 ? 'Ya llegaste' : `${stepsAway} paso${stepsAway !== 1 ? 's' : ''} del C-Level`,
              ok: stepsAway <= 2,
            },
          ].map((item, i) => (
            <div key={i} className="border-b border-muted/15 pb-4 last:border-0 last:pb-0">
              <p className="font-mono text-[11px] text-muted mb-1">{item.label}</p>
              <div className="flex justify-between items-end">
                <span className="font-sans font-medium text-off-white">{item.yours}</span>
                <span className={`font-mono text-xs ${item.ok ? 'text-gold' : 'text-muted'}`}>
                  {item.avg}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Block 4: Insight */}
      <div className="bg-off-white/5 border-l-2 border-gold p-6">
        <p className="font-mono text-gold text-xs tracking-widest uppercase mb-3">Insight personalizado</p>
        <p className="font-sans text-off-white leading-relaxed text-base">{insight.text}</p>
      </div>

      {/* Share / restart */}
      <div className="flex gap-4 justify-center pt-2">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs text-muted hover:text-gold transition-colors"
        >
          ← Volver al inicio
        </button>
      </div>
    </motion.div>
  )
}
