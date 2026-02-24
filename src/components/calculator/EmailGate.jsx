import { useState } from 'react'
import { motion } from 'framer-motion'

const PORTAL_ID = '50752764'
const FORM_ID = 'PLACEHOLDER_FORM_ID'

const submitToHubspot = async (email, formData, result) => {
  const payload = {
    fields: [
      { name: 'email', value: email },
      { name: 'nivel_actual', value: formData.currentLevel },
      { name: 'anos_experiencia', value: String(formData.totalYears) },
      { name: 'industria', value: formData.industry },
      { name: 'num_empresas', value: String(formData.numCompanies) },
      { name: 'tiene_mba', value: formData.hasMBA },
      { name: 'anos_restantes_estimados', value: String(result.yearsRemaining) },
      { name: 'percentil_estimado', value: String(result.percentile) },
    ],
    context: {
      pageUri: window.location.href,
      pageName: 'ADN del C-Level México',
    },
  }

  try {
    const res = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )
    return res.ok
  } catch {
    // In dev with placeholder IDs, silently succeed
    return true
  }
}

export default function EmailGate({ yearsRemaining, projectedYear, formData, result, onUnlock }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!valid) return setError('Ingresa un correo válido.')
    setLoading(true)
    await submitToHubspot(email, formData, result)
    setLoading(false)
    onUnlock(email)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      {/* Preview result */}
      <div className="border border-muted/30 bg-ink/60 p-6 mb-8 text-center">
        <p className="font-mono text-muted text-xs uppercase tracking-widest mb-3">Tu diagnóstico preliminar</p>
        <p className="font-display text-5xl font-black text-gold">
          {yearsRemaining === 0 ? 'Ya estás en rango' : `${yearsRemaining} años`}
        </p>
        {yearsRemaining > 0 && (
          <p className="font-mono text-muted text-sm mt-2">para llegar al C-Level · aprox. {projectedYear}</p>
        )}
        {/* Blurred teaser */}
        <div className="mt-6 relative">
          <div className="blur-sm select-none pointer-events-none">
            <p className="font-mono text-xs text-muted mb-1">Tu percentil vs. el dataset</p>
            <div className="h-3 bg-gold/40 rounded-full w-3/4 mx-auto" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-gold bg-ink px-3 py-1">Desbloquear →</span>
          </div>
        </div>
      </div>

      <p className="font-sans text-off-white text-lg font-light mb-2 leading-relaxed">
        Tu diagnóstico completo está listo.
      </p>
      <p className="font-sans text-muted text-sm mb-8 leading-relaxed">
        Para ver en qué percentil estás, cómo te comparas con los CHROs de tu industria
        y qué área funcional es el mejor trampolín — déjanos tu correo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="tu@correo.com"
            className="w-full bg-transparent border border-muted/40 focus:border-gold outline-none px-4 py-3 font-mono text-sm text-off-white placeholder-muted/50 transition-colors"
          />
          {error && <p className="font-mono text-xs text-red-400 mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black font-bold py-4 text-base hover:bg-gold-light active:scale-95 transition-all disabled:opacity-60"
        >
          {loading ? 'Enviando...' : 'Ver mi diagnóstico completo →'}
        </button>
        <p className="font-mono text-[11px] text-muted text-center">
          No spam. Solo contenido de RH que vale la pena.
        </p>
      </form>
    </motion.div>
  )
}
