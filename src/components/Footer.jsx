import simonLogo from '../../resources/logo-simon.png'

export default function Footer() {
  return (
    <footer className="bg-black text-off-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="font-display text-2xl font-bold text-gold mb-3">ADN C-Level · MX</p>
            <p className="font-sans text-muted text-sm leading-relaxed">
              Un análisis de 120 perfiles públicos de LinkedIn de CHROs y CPOs
              con operaciones en México.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Elaborado por</p>
            <div className="bg-white inline-block p-1.5 rounded-sm mb-3">
              <img src={simonLogo} alt="Simón" className="h-8" />
            </div>
            <div>
              <a
                href="https://www.holasimon.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-gold text-sm hover:text-gold-light transition-colors"
              >
                holasimon.ai →
              </a>
            </div>
            <p className="font-mono text-xs text-muted mt-4">Febrero 2025</p>
          </div>

          <div>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Dataset</p>
            <div className="space-y-2">
              {[
                ['120', 'perfiles analizados'],
                ['84', 'empresas representadas'],
                ['12+', 'industrias'],
                ['Feb 2025', 'fecha de extracción'],
              ].map(([val, label]) => (
                <div key={label} className="flex gap-3">
                  <span className="font-mono text-gold text-xs w-12">{val}</span>
                  <span className="font-mono text-muted text-xs">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Methodology note */}
        <div className="border-t border-muted/20 pt-8">
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
            Nota metodológica
          </p>
          <p className="font-sans text-muted text-xs leading-relaxed max-w-4xl">
            Análisis basado en 120 perfiles públicos de LinkedIn de profesionales que ocupan posiciones de CHRO, CPO
            o equivalente en empresas con operaciones en México. Los datos de género son estimaciones basadas en
            nombre (n=76 de 120 identificados). Los años al C-Level se calculan como la diferencia entre el año de
            inicio del rol actual y el año del primer empleo registrado en LinkedIn. Algunos perfiles pueden tener
            información incompleta. Este análisis tiene fines informativos y no constituye una muestra
            estadísticamente representativa.
          </p>
          <p className="font-mono text-xs text-muted/50 mt-4">
            © 2025 Simón · Todos los datos provienen de perfiles públicos de LinkedIn.
          </p>
        </div>
      </div>
    </footer>
  )
}
