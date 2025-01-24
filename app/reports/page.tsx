export default function Reports() {
  return (
    <div className="min-h-screen bg-[#001529]">
      <main className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Reports & Analytics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Performance Reports</h2>
            {/* Add performance charts */}
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Usage Statistics</h2>
            {/* Add usage data */}
          </div>
        </div>
      </main>
    </div>
  )
} 