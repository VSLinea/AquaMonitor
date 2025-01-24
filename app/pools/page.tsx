export default function Pools() {
  return (
    <div className="min-h-screen bg-[#001529]">
      <main className="p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Pool Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Pool Overview</h2>
            {/* Add pool overview component */}
          </div>
          <div className="bg-white/5 rounded-lg p-6">
            <h2 className="text-xl text-white mb-4">Quick Actions</h2>
            {/* Add quick action buttons */}
          </div>
        </div>
      </main>
    </div>
  )
} 