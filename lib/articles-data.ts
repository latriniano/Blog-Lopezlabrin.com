export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  published: boolean
  tags: string[]
}

export const articlesData: Article[] = [
  {
    id: "1",
    title: "La Evolución del Derecho Constitucional en el Siglo XXI",
    slug: "evolucion-derecho-constitucional-siglo-xxi",
    excerpt:
      "Un análisis profundo sobre cómo las constituciones modernas se adaptan a los desafíos contemporáneos, desde la digitalización hasta los derechos emergentes.",
    content: `
      <p>El derecho constitucional ha experimentado transformaciones significativas en las últimas dos décadas. Los desafíos del siglo XXI han obligado a repensar conceptos fundamentales sobre derechos, libertades y la estructura del Estado.</p>
      
      <h2>Nuevos Paradigmas Constitucionales</h2>
      <p>La era digital ha introducido complejidades inéditas en el ámbito constitucional. La protección de datos personales, el derecho al olvido y la libertad de expresión en plataformas digitales son solo algunos de los temas que requieren una reinterpretación constitucional.</p>
      
      <blockquote>
        <p>"Las constituciones del siglo XXI deben ser documentos vivos que evolucionen con la sociedad, sin perder su esencia protectora de derechos fundamentales."</p>
      </blockquote>
      
      <h3>Impacto de la Globalización</h3>
      <p>La globalización ha creado tensiones entre la soberanía nacional y la necesidad de cooperación internacional. Los tratados internacionales de derechos humanos han adquirido una relevancia sin precedentes.</p>
      
      <ul>
        <li>Integración de normas internacionales en el derecho interno</li>
        <li>Conflictos entre jurisdicciones nacionales e internacionales</li>
        <li>Armonización de sistemas jurídicos diversos</li>
      </ul>
      
      <h3>Desafíos Futuros</h3>
      <p>El futuro del derecho constitucional dependerá de su capacidad para adaptarse a realidades emergentes como la inteligencia artificial, el cambio climático y las nuevas formas de participación democrática.</p>
    `,
    category: "Derecho",
    date: "15 de enero, 2025",
    readTime: "12 min de lectura",
    published: true,
    tags: ["constitucional", "derechos", "globalización"],
  },
  {
    id: "2",
    title: "Crisis Política y Legitimidad Democrática: Un Análisis Crítico",
    slug: "crisis-politica-legitimidad-democratica",
    excerpt:
      "Examinamos las tensiones actuales entre representación política y demandas ciudadanas, analizando los factores que contribuyen a la crisis de legitimidad en las democracias contemporáneas.",
    content: `
      <p>La democracia representativa enfrenta uno de sus mayores desafíos en décadas. La desconexión entre élites políticas y ciudadanía ha generado una crisis de legitimidad que trasciende fronteras nacionales.</p>
      
      <h2>Síntomas de la Crisis</h2>
      <p>Los indicadores de esta crisis son múltiples y convergentes: baja participación electoral, desconfianza en instituciones, polarización extrema y el surgimiento de movimientos antisistema.</p>
      
      <h3>Factores Estructurales</h3>
      <p>Varios elementos han contribuido a esta situación:</p>
      
      <ol>
        <li><strong>Desigualdad económica creciente:</strong> La brecha entre ricos y pobres ha alcanzado niveles históricos</li>
        <li><strong>Revolución tecnológica:</strong> Las redes sociales han transformado la comunicación política</li>
        <li><strong>Globalización:</strong> Los Estados nacionales han perdido capacidad de control sobre procesos económicos</li>
      </ol>
      
      <blockquote>
        <p>"La democracia no puede sobrevivir sin la confianza ciudadana en sus instituciones y representantes."</p>
      </blockquote>
      
      <h3>Posibles Soluciones</h3>
      <p>La recuperación de la legitimidad democrática requiere reformas profundas que incluyan mayor transparencia, participación ciudadana efectiva y mecanismos de rendición de cuentas más robustos.</p>
    `,
    category: "Política",
    date: "12 de enero, 2025",
    readTime: "10 min de lectura",
    published: true,
    tags: ["democracia", "crisis", "legitimidad", "participación"],
  },
  {
    id: "3",
    title: "El Impacto Económico de las Políticas Fiscales Post-Pandemia",
    slug: "impacto-economico-politicas-fiscales-post-pandemia",
    excerpt:
      "Análisis detallado de cómo las medidas fiscales adoptadas durante la pandemia han reconfigurado el panorama económico y sus implicaciones a largo plazo.",
    content: `
      <p>La pandemia de COVID-19 obligó a gobiernos de todo el mundo a implementar políticas fiscales expansivas sin precedentes. Tres años después, es momento de evaluar sus consecuencias económicas y sociales.</p>
      
      <h2>Medidas Implementadas</h2>
      <p>Los paquetes de estímulo incluyeron transferencias directas a ciudadanos, subsidios a empresas, moratorias fiscales y programas de empleo de emergencia. Estas medidas, aunque necesarias, han tenido efectos complejos.</p>
      
      <h3>Efectos Positivos</h3>
      <ul>
        <li>Prevención de una recesión más profunda</li>
        <li>Mantenimiento del empleo en sectores críticos</li>
        <li>Protección de los sectores más vulnerables</li>
        <li>Aceleración de la digitalización económica</li>
      </ul>
      
      <h3>Consecuencias Negativas</h3>
      <p>Sin embargo, estas políticas también han generado efectos adversos:</p>
      
      <blockquote>
        <p>"El dilema actual es cómo mantener el crecimiento económico mientras se controla la inflación y se reduce el déficit fiscal."</p>
      </blockquote>
      
      <p>La inflación ha resurgido como un problema central, afectando especialmente a los sectores de menores ingresos. Además, el aumento de la deuda pública plantea interrogantes sobre la sostenibilidad fiscal a largo plazo.</p>
      
      <h3>Perspectivas Futuras</h3>
      <p>La transición hacia una política fiscal más restrictiva debe ser gradual y cuidadosamente calibrada para evitar un aterrizaje económico brusco que pueda revertir los avances logrados.</p>
    `,
    category: "Economía",
    date: "8 de enero, 2025",
    readTime: "15 min de lectura",
    published: true,
    tags: ["economía", "política fiscal", "pandemia", "inflación"],
  },
]
