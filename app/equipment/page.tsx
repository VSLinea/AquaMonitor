export default function Equipment() {
  return (
    <div className="min-h-screen bg-[#001529]">
      <main className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Equipment Management</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Pumps</h2>
            {/* Add pump status and controls */}
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Filters</h2>
            {/* Add filter status and controls */}
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Heaters</h2>
            {/* Add heater status and controls */}
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Chemical Systems</h2>
            {/* Add chemical system status and controls */}
          </div>
        </div>
      </main>
    </div>
  )
} 