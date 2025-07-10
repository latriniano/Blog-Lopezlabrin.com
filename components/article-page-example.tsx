import { ArticleLayout } from "./article-layout"

const exampleArticle = {
  title: "La Reforma Judicial y sus Implicaciones Constitucionales",
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
  date: "15 de enero, 2025",
  category: "Derecho",
  readTime: "12 min de lectura",
  author: "López Labrin Lautaro",
}

export function ArticlePageExample() {
  return (
    <ArticleLayout
      title={exampleArticle.title}
      content={exampleArticle.content}
      date={exampleArticle.date}
      category={exampleArticle.category}
      readTime={exampleArticle.readTime}
      author={exampleArticle.author}
    />
  )
}
