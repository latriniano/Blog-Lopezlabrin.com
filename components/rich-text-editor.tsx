"use client"

import { useState } from "react"
import { Bold, Italic, List, Quote, Link, ImageIcon } from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Escribe tu artículo..." }: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false)

  const insertFormatting = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)

    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const toolbarButtons = [
    { icon: Bold, action: () => insertFormatting("**", "**"), title: "Negrita" },
    { icon: Italic, action: () => insertFormatting("*", "*"), title: "Cursiva" },
    { icon: List, action: () => insertFormatting("\n- "), title: "Lista" },
    { icon: Quote, action: () => insertFormatting("\n> "), title: "Cita" },
    { icon: Link, action: () => insertFormatting("[", "](url)"), title: "Enlace" },
    { icon: ImageIcon, action: () => insertFormatting("![alt](", ")"), title: "Imagen" },
  ]

  return (
    <div className="border border-gray-700 rounded-lg bg-[#1a1a1a] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              title={button.title}
              className="p-2 text-[#d3d3d3] hover:text-white hover:bg-gray-700 rounded transition-colors"
            >
              <button.icon className="w-4 h-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              !isPreview ? "bg-[#8a2be2] text-white" : "text-[#d3d3d3] hover:text-white"
            }`}
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm rounded transition-colors ${
              isPreview ? "bg-[#8a2be2] text-white" : "text-[#d3d3d3] hover:text-white"
            }`}
          >
            Vista previa
          </button>
        </div>
      </div>

      {/* Editor/Preview */}
      <div className="min-h-[400px]">
        {isPreview ? (
          <div className="p-4 article-content">
            <div dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, "<br>") }} />
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-[400px] p-4 bg-transparent text-[#eaeaea] placeholder-[#d3d3d3] resize-none focus:outline-none"
          />
        )}
      </div>
    </div>
  )
}
