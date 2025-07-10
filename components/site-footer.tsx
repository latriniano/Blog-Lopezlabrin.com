// components/SiteFooter.tsx
import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function SiteFooter() {
  const navigationItems = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#articulos", label: "Artículos" },
    { href: "/#categorias", label: "Categorías" },
    { href: "/#acerca-de", label: "Acerca de" },
    { href: "/#contacto", label: "Contacto" },
  ];

  return (
    <footer className="py-16 bg-[#0f0f0f] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* ... Aquí puedes pegar todo el contenido de tu footer original ... */}
        {/* Por simplicidad, pondremos solo el copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-[#d3d3d3]">© {new Date().getFullYear()} López Labrin. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}