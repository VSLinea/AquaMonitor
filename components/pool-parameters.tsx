"use client"

import { useState, useEffect } from "react"
import { Droplet, ThermometerSun, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFacility } from "@/contexts/FacilityContext"

export function PoolParameters() {
  const { selectedFacility } = useFacility()
  const [selectedPoolId, setSelectedPoolId] = useState<string>("")
  const [selectedPool, setSelectedPool] = useState(selectedFacility?.pools[0])

  // Reset selected pool when facility changes
  useEffect(() => {
    if (selectedFacility) {
      setSelectedPool(selectedFacility.pools[0])
      setSelectedPoolId(selectedFacility.pools[0]?.id || "")
    }
  }, [selectedFacility])

  // Update selected pool when pool selection changes
  const handlePoolChange = (poolId: string) => {
    setSelectedPoolId(poolId)
    const pool = selectedFacility?.pools.find(p => p.id === poolId)
    if (pool) {
      setSelectedPool(pool)
    }
  }

  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pool Parameters</h2>
        {selectedFacility && selectedFacility.pools.length > 0 && (
          <Select value={selectedPoolId} onValueChange={handlePoolChange}>
            <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Select a pool" />
            </SelectTrigger>
            <SelectContent>
              {selectedFacility.pools.map((pool) => (
                <SelectItem key={pool.id} value={pool.id}>
                  {pool.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      {selectedPool && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Droplet className="w-6 h-6 text-blue-400" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.chlorine.toFixed(1)} ppm</div>
              <div className="text-gray-400 text-sm">Chlorine Level</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Activity className="w-6 h-6 text-green-400" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.pH.toFixed(1)}</div>
              <div className="text-gray-400 text-sm">pH Level</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThermometerSun className="w-6 h-6 text-orange-400" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.temperature.toFixed(1)}°C</div>
              <div className="text-gray-400 text-sm">Water Temperature</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white/5 rounded-md">
            <div className="text-sm text-gray-400">Pool Type</div>
            <div className="text-lg">{selectedPool.type}</div>
            <div className="text-sm text-gray-400 mt-2">Size</div>
            <div className="text-lg">{selectedPool.size}</div>
          </div>
        </div>
      )}
    </div>
  )
} 