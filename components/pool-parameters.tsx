"use client"

import { useFacility } from '@/contexts/FacilityContext'

export function PoolParameters() {
  const { selectedFacility } = useFacility()
  const selectedPool = selectedFacility?.pools[0] // Default to first pool, you might want to add pool selection

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl text-white mb-6">Pool Parameters</h2>
      {selectedPool ? (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="text-4xl text-white">{selectedPool.parameters.chlorine} ppm</div>
            <div className="text-gray-400">
              <div>Chlorine Level</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-4xl text-white">{selectedPool.parameters.pH}</div>
            <div className="text-gray-400">
              <div>pH Level</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-4xl text-white">{selectedPool.parameters.temperature}°C</div>
            <div className="text-gray-400">
              <div>Water Temperature</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">No pool selected</div>
      )}
    </div>
  )
} 