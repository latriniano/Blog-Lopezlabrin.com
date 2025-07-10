"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  ImageIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Escribe tu contenido..." }: RichTextEditorProps) {
  const [selectedText, setSelectedText] = useState("")

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value)
  }

  const insertLink = () => {
    const url = prompt("Ingresa la URL:")
    if (url) {
      formatText("createLink", url)
    }
  }

  const insertImage = () => {
    const url = prompt("Ingresa la URL de la imagen:")
    if (url) {
      formatText("insertImage", url)
    }
  }

  return (
    <div className="border border-white/20 rounded-lg overflow-hidden bg-[#2a2a2a]">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-3 border-b border-white/20 bg-[#1c1c1c]">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => formatText("bold")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Negrita"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("italic")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Cursiva"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("underline")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Subrayado"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-2"></div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => formatText("formatBlock", "h1")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Título 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("formatBlock", "h2")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Título 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("formatBlock", "h3")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Título 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-2"></div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => formatText("insertUnorderedList")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Lista con viñetas"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("insertOrderedList")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Lista numerada"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("formatBlock", "blockquote")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Cita"
          >
            <Quote className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-6 bg-white/20 mx-2"></div>

        <div className="flex items-center space-x-1">
          <button
            onClick={insertLink}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Insertar enlace"
          >
            <Link className="w-4 h-4" />
          </button>
          <button
            onClick={insertImage}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Insertar imagen"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => formatText("formatBlock", "pre")}
            className="p-2 text-[#d3d3d3] hover:text-white hover:bg-[#3a3a3a] rounded transition-colors"
            title="Código"
          >
            <Code className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div
        contentEditable
        className="min-h-[300px] p-4 text-white focus:outline-none prose prose-invert max-w-none"
        style={{
          backgroundColor: "#2a2a2a",
          color: "#eaeaea",
        }}
        onInput={(e) => {
          const target = e.target as HTMLDivElement
          onChange(target.innerHTML)
        }}
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
      />

      {/* Character Count */}
      <div className="px-4 py-2 bg-[#1c1c1c] border-t border-white/20 text-right">
        <span className="text-xs text-[#d3d3d3]">{value.replace(/<[^>]*>/g, "").length} caracteres</span>
      </div>
    </div>
  )
}
