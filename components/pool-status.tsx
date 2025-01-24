"use client"

import { useFacility } from '@/contexts/FacilityContext'

export function PoolStatus() {
  const { selectedFacility } = useFacility()
  
  const poolStats = {
    total: selectedFacility?.pools.length || 0,
    optimal: selectedFacility?.pools.filter(p => 
      p.parameters.pH >= 7.2 && p.parameters.pH <= 7.6 &&
      p.parameters.chlorine >= 1.0 && p.parameters.chlorine <= 2.0
    ).length || 0,
    needsAttention: selectedFacility?.pools.filter(p => 
      (p.parameters.pH < 7.2 || p.parameters.pH > 7.6) ||
      (p.parameters.chlorine < 1.0 || p.parameters.chlorine > 2.0)
    ).length || 0,
    critical: 0, // Add your critical conditions logic
  }

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl text-white mb-6">Facility Pool Status</h2>
      <div className="relative">
        <div className="flex justify-center items-center">
          <div className="text-6xl text-white">{poolStats.total}</div>
          <div className="text-gray-400 ml-2">Total pools</div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-green-400">● Optimal</span>
            <span className="text-white">{poolStats.optimal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-yellow-400">● Needs Attention</span>
            <span className="text-white">{poolStats.needsAttention}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-red-400">● Critical</span>
            <span className="text-white">{poolStats.critical}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 