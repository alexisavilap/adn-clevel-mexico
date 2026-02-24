export const LEVEL_SCORE = {
  'Analista/Especialista': 1,
  'Coordinador/Supervisor': 2,
  'Manager/Gerente': 3,
  'HRBP/Business Partner': 3,
  'Director': 4,
  'VP': 5,
  'Ya soy C-Level': 6,
}

export const INDUSTRY_BASE_YEARS = {
  'Banca/Finanzas': 13,
  'Farmacéutica': 18,
  'Alimentos & Bebidas': 20,
  'Manufactura': 21,
  'Retail/Comercio': 19,
  'Restaurantes/Hospitalidad': 19,
  'Tecnología/Startups': 14,
  'Otra': 19,
}

const LEVEL_ADJUSTMENT = { 1: 0, 2: -1, 3: -2, 4: -4, 5: -7, 6: 0 }

const mobilityAdj = (n) => {
  if (n <= 1) return 2
  if (n <= 3) return 1
  if (n <= 6) return 0
  return -1
}

const mbaAdj = (mba) => (mba === 'Sí, terminada' ? -0.5 : 0)

const DISTRIBUTION = [
  { upTo: 10, cumPct: 27 },
  { upTo: 15, cumPct: 43 },
  { upTo: 20, cumPct: 69 },
  { upTo: 25, cumPct: 90 },
  { upTo: 30, cumPct: 97 },
  { upTo: 99, cumPct: 100 },
]

const getPercentile = (years) => {
  for (const b of DISTRIBUTION) {
    if (years <= b.upTo) return b.cumPct
  }
  return 100
}

export const calculateResult = (inputs) => {
  if (inputs.currentLevel === 'Ya soy C-Level') {
    return {
      totalNeeded: inputs.totalYears,
      yearsWorked: inputs.totalYears,
      yearsRemaining: 0,
      projectedYear: new Date().getFullYear(),
      percentile: getPercentile(inputs.totalYears),
      alreadyThere: true,
    }
  }

  const base = INDUSTRY_BASE_YEARS[inputs.industry] ?? 19
  const score = LEVEL_SCORE[inputs.currentLevel] ?? 1
  const adj =
    (LEVEL_ADJUSTMENT[score] ?? 0) +
    mobilityAdj(inputs.numCompanies) +
    mbaAdj(inputs.hasMBA)

  const totalNeeded = Math.max(base + adj, inputs.totalYears + 0.5)
  const remaining = Math.max(0, totalNeeded - inputs.totalYears)

  return {
    totalNeeded: Math.round(totalNeeded),
    yearsWorked: inputs.totalYears,
    yearsRemaining: Math.round(remaining),
    projectedYear: new Date().getFullYear() + Math.round(remaining),
    percentile: getPercentile(inputs.totalYears),
    alreadyThere: remaining === 0,
  }
}

export const getInsight = (inputs, result) => {
  const { yearsRemaining, percentile, yearsWorked } = result

  if (inputs.currentLevel === 'Ya soy C-Level') {
    return {
      type: 'clevel',
      text: 'Ya llegaste. El reto ahora es durar: la mediana en el rol es de 2.7 años. El 13% del C-Level de RH tiene más de 10,000 seguidores en LinkedIn — la visibilidad digital se vuelve parte del trabajo.',
    }
  }

  if (percentile >= 73) {
    return {
      type: 'fast',
      text: `Vas adelantado del promedio. Con ${yearsWorked} años de carrera y tu nivel actual, estás en el tercio superior de velocidad. En el dataset, el 27% llegó al C-Level en menos de 10 años: son quienes combinaron movilidad entre empresas con especialización temprana en Talent & Development.`,
    }
  }

  if (yearsRemaining <= 5) {
    return {
      type: 'ontrack',
      text: `Vas en el camino correcto. A este ritmo, podrías estar en rango C-Level para ${result.projectedYear}. Dato clave: el 53% de los CHROs llegó por fichaje externo — mantener visibilidad en el mercado es tan importante como el trabajo interno.`,
    }
  }

  if (inputs.industry === 'Banca/Finanzas') {
    return {
      type: 'banking',
      text: 'En banca, el camino al C-Level es el más corto: 8 años de promedio vs. 19 del resto de las industrias. Si tienes trayectoria en servicios financieros, ya estás en la industria que más acorta el recorrido.',
    }
  }

  if (inputs.hasMBA === 'No' || inputs.hasMBA === 'No, pero planeo hacerla') {
    return {
      type: 'noMBA',
      text: 'Los datos muestran que el MBA no acorta el camino: 18.9 años con maestría vs. 19.0 sin ella. Lo que sí importa es la cantidad de empresas donde has trabajado y haberte especializado en Talent & Development o DO — las dos rutas más transitadas por los actuales CHROs.',
    }
  }

  if (inputs.numCompanies >= 7) {
    return {
      type: 'highMobility',
      text: 'Tu movilidad está por encima del promedio. En el dataset, quienes pasaron por 4–6 organizaciones tienen los perfiles más completos. Con más de 7 empresas, lo que potencia más el perfil son roles con mayor alcance y profundidad, no más cambios.',
    }
  }

  return {
    type: 'slow',
    text: 'El 27% de los CHROs que analizamos llegó en menos de 15 años. La clave: movilidad entre industrias y el rol de HRBP como trampolín. PepsiCo, Unilever y Whirlpool son las empresas que más CHROs han "exportado" al mercado mexicano.',
  }
}
