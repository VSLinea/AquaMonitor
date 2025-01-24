"use client"

import { useFacility } from "@/contexts/FacilityContext"

export function PoolStatus() {
  const { selectedFacility } = useFacility()
  
  const stats = {
    total: selectedFacility?.pools.length || 0,
    optimal: selectedFacility?.pools.filter(p => 
      p.parameters.pH >= 7.2 && p.parameters.pH <= 7.6 &&
      p.parameters.chlorine >= 1.0 && p.parameters.chlorine <= 2.0
    ).length || 0,
    needsAttention: selectedFacility?.pools.filter(p => 
      (p.parameters.pH < 7.2 || p.parameters.pH > 7.6) ||
      (p.parameters.chlorine < 1.0 || p.parameters.chlorine > 2.0)
    ).length || 0,
    critical: 0
  }

  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Facility Pool Status</h2>
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-4xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-400">Total pools</div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span>Optimal</span>
          </div>
          <span>{stats.optimal}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <span>Needs Attention</span>
          </div>
          <span>{stats.needsAttention}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span>Critical</span>
          </div>
          <span>{stats.critical}</span>
        </div>
      </div>
    </div>
  )
} 