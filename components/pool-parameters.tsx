"use client"

import { useState } from "react"
import { Droplet, ThermometerSun, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFacility } from "@/contexts/FacilityContext"

export function PoolParameters() {
  const { selectedFacility } = useFacility()
  const [selectedPoolId, setSelectedPoolId] = useState<string>("")
  
  const selectedPool = selectedFacility?.pools.find(p => p.id === selectedPoolId) || selectedFacility?.pools[0]

  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pool Parameters</h2>
        <Select value={selectedPoolId} onValueChange={setSelectedPoolId}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pool" />
          </SelectTrigger>
          <SelectContent>
            {selectedFacility?.pools.map((pool) => (
              <SelectItem key={pool.id} value={pool.id}>
                {pool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedPool && (
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Droplet className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.chlorine} ppm</div>
              <div className="text-gray-400 text-sm">Chlorine Level</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Activity className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.pH}</div>
              <div className="text-gray-400 text-sm">pH Level</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThermometerSun className="w-6 h-6" />
            <div>
              <div className="text-2xl font-bold">{selectedPool.parameters.temperature}°C</div>
              <div className="text-gray-400 text-sm">Water Temperature</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 