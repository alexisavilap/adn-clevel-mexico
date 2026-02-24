import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import QuestionStep from './QuestionStep'
import EmailGate from './EmailGate'
import Results from './Results'
import SectionLabel from '../ui/SectionLabel'
import { calculateResult, getInsight, INDUSTRY_BASE_YEARS } from '../../utils/calculator'

const LEVELS = [
  'Analista/Especialista',
  'Coordinador/Supervisor',
  'Manager/Gerente',
  'HRBP/Business Partner',
  'Director',
  'VP',
  'Ya soy C-Level',
]

const INDUSTRIES = Object.keys(INDUSTRY_BASE_YEARS)

const MBA_OPTIONS = [
  'Sí, terminada',
  'En curso',
  'No, pero planeo hacerla',
  'No',
]

const STEPS = 5

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-5 py-3 font-mono text-sm transition-all border ${
        selected
          ? 'border-gold bg-gold/10 text-gold'
          : 'border-muted/30 text-white/80 hover:border-gold/50 hover:text-off-white'
      }`}
    >
      {selected && <span className="mr-2 text-gold">✓</span>}
      {label}
    </button>
  )
}

function SliderInput({ value, min, max, label, onChange }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-mono text-xs text-white/70">{min}</span>
        <span className="font-display text-5xl font-black text-gold">{value}</span>
        <span className="font-mono text-xs text-white/70">{max}+</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-gold cursor-pointer"
        style={{ accentColor: '#f8d43d' }}
      />
      <p className="font-mono text-xs text-white/70 text-center mt-2">{label}</p>
    </div>
  )
}

export default function Calculator() {
  const [step, setStep] = useState(1)
  const [stage, setStage] = useState('questions') // 'questions' | 'gate' | 'results'
  const [formData, setFormData] = useState({
    currentLevel: '',
    totalYears: 8,
    numCompanies: 3,
    industry: '',
    hasMBA: '',
  })
  const [result, setResult] = useState(null)
  const [insight, setInsight] = useState(null)

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }))

  const canAdvance = () => {
    if (step === 1) return !!formData.currentLevel
    if (step === 2) return formData.totalYears > 0
    if (step === 3) return formData.numCompanies > 0
    if (step === 4) return !!formData.industry
    if (step === 5) return !!formData.hasMBA
    return false
  }

  const handleNext = () => {
    if (step < STEPS) {
      setStep((s) => s + 1)
    } else {
      const r = calculateResult(formData)
      const ins = getInsight(formData, r)
      setResult(r)
      setInsight(ins)
      setStage('gate')
    }
  }

  const handleUnlock = () => {
    setStage('results')
  }

  const handleRestart = () => {
    setStep(1)
    setStage('questions')
    setFormData({ currentLevel: '', totalYears: 8, numCompanies: 3, industry: '', hasMBA: '' })
    setResult(null)
    setInsight(null)
  }

  return (
    <section className="bg-ink text-off-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionLabel number="→" text="Calculadora de diagnóstico" light />

        <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-4">
          ¿Y tú, en qué
          <br />
          <span className="text-gold">parte del camino estás?</span>
        </h2>
        <p className="font-sans text-white/70 text-lg mb-16 leading-relaxed">
          Responde 5 preguntas y recibe tu benchmark personalizado frente al dataset real. Menos de 2 minutos.
        </p>

        <div className="border border-muted/20 p-8 md:p-12 min-h-[420px] flex flex-col">
          <AnimatePresence mode="wait">
            {stage === 'questions' && (
              <motion.div key={`step-${step}`} className="flex-1 flex flex-col">
                {step === 1 && (
                  <QuestionStep question="¿Cuál es tu nivel actual?" current={step} total={STEPS}>
                    <div className="grid gap-2">
                      {LEVELS.map((l) => (
                        <OptionButton
                          key={l}
                          label={l}
                          selected={formData.currentLevel === l}
                          onClick={() => update('currentLevel', l)}
                        />
                      ))}
                    </div>
                  </QuestionStep>
                )}

                {step === 2 && (
                  <QuestionStep question="¿Cuántos años llevas trabajando en total?" current={step} total={STEPS}>
                    <SliderInput
                      value={formData.totalYears}
                      min={1}
                      max={40}
                      label="años de experiencia profesional"
                      onChange={(v) => update('totalYears', v)}
                    />
                  </QuestionStep>
                )}

                {step === 3 && (
                  <QuestionStep question="¿En cuántas empresas has trabajado?" current={step} total={STEPS}>
                    <SliderInput
                      value={formData.numCompanies}
                      min={1}
                      max={15}
                      label="empresas en toda tu carrera"
                      onChange={(v) => update('numCompanies', v)}
                    />
                  </QuestionStep>
                )}

                {step === 4 && (
                  <QuestionStep question="¿En qué industria trabajas actualmente?" current={step} total={STEPS}>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {INDUSTRIES.map((ind) => (
                        <OptionButton
                          key={ind}
                          label={ind}
                          selected={formData.industry === ind}
                          onClick={() => update('industry', ind)}
                        />
                      ))}
                    </div>
                  </QuestionStep>
                )}

                {step === 5 && (
                  <QuestionStep question="¿Tienes maestría o MBA?" current={step} total={STEPS}>
                    <div className="grid gap-2">
                      {MBA_OPTIONS.map((opt) => (
                        <OptionButton
                          key={opt}
                          label={opt}
                          selected={formData.hasMBA === opt}
                          onClick={() => update('hasMBA', opt)}
                        />
                      ))}
                    </div>
                  </QuestionStep>
                )}

                <div className="mt-auto pt-8 flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep((s) => s - 1)}
                      className="font-mono text-xs text-white/70 hover:text-off-white transition-colors"
                    >
                      ← Atrás
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!canAdvance()}
                    className="bg-gold text-black font-bold px-8 py-3 font-sans text-sm hover:bg-gold-light active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {step === STEPS ? 'Ver mi resultado →' : 'Siguiente →'}
                  </button>
                </div>
              </motion.div>
            )}

            {stage === 'gate' && result && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="flex-1"
              >
                <EmailGate
                  yearsRemaining={result.yearsRemaining}
                  projectedYear={result.projectedYear}
                  formData={formData}
                  result={result}
                  onUnlock={handleUnlock}
                />
              </motion.div>
            )}

            {stage === 'results' && result && insight && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex-1"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p className="font-mono text-gold text-xs tracking-widest uppercase">
                    Tu diagnóstico completo
                  </p>
                  <button
                    onClick={handleRestart}
                    className="font-mono text-xs text-white/70 hover:text-gold transition-colors"
                  >
                    Recalcular →
                  </button>
                </div>
                <Results result={result} insight={insight} formData={formData} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
