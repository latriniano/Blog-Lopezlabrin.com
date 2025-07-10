export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8a2be2] mx-auto mb-4"></div>
        <p className="text-[#eaeaea]">Cargando artículos...</p>
      </div>
    </div>
  )
}
