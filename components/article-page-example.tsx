import { ArticleLayout } from "./article-layout"

export function ArticlePageExample() {
  const sampleContent = `
    <p>Este es un ejemplo de cómo se vería un artículo completo en el blog López Labrin. El contenido está optimizado para la lectura con un diseño que prioriza la legibilidad y la experiencia del usuario.</p>
    
    <h2>Análisis Jurídico</h2>
    <p>En el contexto actual del derecho constitucional, es fundamental analizar las implicaciones de las recientes reformas legislativas. Estas modificaciones no solo afectan el marco normativo, sino que también tienen repercusiones directas en la aplicación práctica del derecho.</p>
    
    <blockquote>
      <p>"El derecho no es solo un conjunto de normas, sino un sistema vivo que debe adaptarse a las necesidades sociales contemporáneas."</p>
    </blockquote>
    
    <h3>Perspectiva Política</h3>
    <p>Desde una perspectiva política, estos cambios reflejan una tendencia hacia la modernización del sistema jurídico, aunque no están exentos de controversia.</p>
    
    <ul>
      <li>Impacto en la jurisprudencia existente</li>
      <li>Efectos en la práctica profesional</li>
      <li>Consecuencias para los ciudadanos</li>
    </ul>
    
    <h3>Conclusiones</h3>
    <p>Es evidente que estamos ante un momento de transformación significativa en el panorama jurídico nacional. La adaptación a estos cambios requerirá un esfuerzo conjunto de todos los actores del sistema judicial.</p>
  `

  return (
    <ArticleLayout
      title="Análisis de las Recientes Reformas Constitucionales: Impacto y Perspectivas"
      date="15 de enero, 2025"
      category="Derecho Constitucional"
      readTime="8 min de lectura"
    >
      <div dangerouslySetInnerHTML={{ __html: sampleContent }} />
    </ArticleLayout>
  )
}
