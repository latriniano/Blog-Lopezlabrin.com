export interface AdminArticle {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  published: boolean
  tags: string[]
}

export const adminArticlesData: AdminArticle[] = [
  {
    id: "1",
    title: "La Evolución del Derecho Constitucional en el Siglo XXI",
    excerpt:
      "Un análisis profundo sobre cómo las constituciones modernas se adaptan a los desafíos contemporáneos, desde la digitalización hasta los derechos emergentes.",
    content: `
      <p>El derecho constitucional ha experimentado transformaciones significativas en las últimas dos décadas. Los desafíos del siglo XXI han obligado a repensar conceptos fundamentales sobre derechos, libertades y la estructura del Estado.</p>
      
      <h2>Nuevos Paradigmas Constitucionales</h2>
      <p>La era digital ha introducido complejidades inéditas en el ámbito constitucional. La protección de datos personales, el derecho al olvido y la libertad de expresión en plataformas digitales son solo algunos de los temas que requieren una reinterpretación constitucional.</p>
    `,
    category: "derecho",
    date: "15 de enero, 2025",
    readTime: "12 min de lectura",
    published: true,
    tags: ["constitucional", "derechos", "globalización"],
  },
  {
    id: "2",
    title: "Crisis Política y Legitimidad Democrática: Un Análisis Crítico",
    excerpt:
      "Examinamos las tensiones actuales entre representación política y demandas ciudadanas, analizando los factores que contribuyen a la crisis de legitimidad en las democracias contemporáneas.",
    content: `
      <p>La democracia representativa enfrenta uno de sus mayores desafíos en décadas. La desconexión entre élites políticas y ciudadanía ha generado una crisis de legitimidad que trasciende fronteras nacionales.</p>
      
      <h2>Síntomas de la Crisis</h2>
      <p>Los indicadores de esta crisis son múltiples y convergentes: baja participación electoral, desconfianza en instituciones, polarización extrema y el surgimiento de movimientos antisistema.</p>
    `,
    category: "politica",
    date: "12 de enero, 2025",
    readTime: "10 min de lectura",
    published: true,
    tags: ["democracia", "crisis", "legitimidad", "participación"],
  },
  {
    id: "3",
    title: "El Impacto Económico de las Políticas Fiscales Post-Pandemia",
    excerpt:
      "Análisis detallado de cómo las medidas fiscales adoptadas durante la pandemia han reconfigurado el panorama económico y sus implicaciones a largo plazo.",
    content: `
      <p>La pandemia de COVID-19 obligó a gobiernos de todo el mundo a implementar políticas fiscales expansivas sin precedentes. Tres años después, es momento de evaluar sus consecuencias económicas y sociales.</p>
      
      <h2>Medidas Implementadas</h2>
      <p>Los paquetes de estímulo incluyeron transferencias directas a ciudadanos, subsidios a empresas, moratorias fiscales y programas de empleo de emergencia.</p>
    `,
    category: "economia",
    date: "8 de enero, 2025",
    readTime: "15 min de lectura",
    published: false,
    tags: ["economía", "política fiscal", "pandemia", "inflación"],
  },
]
