export function PoolStatus() {
  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Facility Pool Status</h2>
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold">6</div>
          <div className="text-sm text-gray-400 mt-1">Total pools</div>
        </div>
        <svg className="w-full h-full transform -rotate-90">
          <circle
            className="text-blue-500"
            strokeWidth="8"
            stroke="currentColor"
            fill="transparent"
            r="70"
            cx="96"
            cy="96"
          />
        </svg>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Optimal</span>
          </div>
          <span>4</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Needs Attention</span>
          </div>
          <span>2</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Critical</span>
          </div>
          <span>0</span>
        </div>
      </div>
    </div>
  )
}

