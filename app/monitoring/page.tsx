"use client"

import { useState } from "react"
import { useFacility } from "@/contexts/FacilityContext"
import { AlertTriangle, Activity, Droplet, ThermometerSun, ChevronRight } from "lucide-react"
import Link from "next/link"

interface PoolWithFacility {
  facilityName: string
  facilityLocation: string
  pool: any // Using the Pool type from your types file
}

export default function Monitoring() {
  const { facilities } = useFacility()
  const [selectedPool, setSelectedPool] = useState<PoolWithFacility | null>(null)

  // Flatten pools with facility info for the list
  const allPools = facilities.flatMap(facility => 
    facility.pools.map(pool => ({
      facilityName: facility.name,
      facilityLocation: facility.location,
      pool
    }))
  )

  const getParameterStatus = (parameter: string, value: number) => {
    switch (parameter) {
      case 'chlorine':
        return value < 1.0 || value > 3.0 ? 'critical' :
               value < 1.5 || value > 2.5 ? 'warning' : 'normal'
      case 'pH':
        return value < 7.2 || value > 7.8 ? 'critical' :
               value < 7.4 || value > 7.6 ? 'warning' : 'normal'
      case 'temperature':
        return value < 24 || value > 32 ? 'critical' :
               value < 26 || value > 30 ? 'warning' : 'normal'
      default:
        return 'normal'
    }
  }

  return (
    <div className="min-h-screen bg-[#001529] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Pool List */}
        <div className="bg-white/5 rounded-lg p-4 max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#001529] pb-2 mb-2">
            <h2 className="text-xl font-semibold">Pools Overview</h2>
          </div>
          <div className="space-y-2">
            {allPools.map((poolInfo) => {
              const criticalIssues = [
                getParameterStatus('chlorine', poolInfo.pool.parameters.chlorine),
                getParameterStatus('pH', poolInfo.pool.parameters.pH),
                getParameterStatus('temperature', poolInfo.pool.parameters.temperature)
              ].filter(status => status === 'critical').length

              return (
                <button
                  key={poolInfo.pool.id}
                  onClick={() => setSelectedPool(poolInfo)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedPool?.pool.id === poolInfo.pool.id 
                      ? 'bg-white/20' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{poolInfo.pool.name}</div>
                      <div className="text-sm text-gray-400">{poolInfo.facilityName}</div>
                    </div>
                    {criticalIssues > 0 ? (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Panel - Pool Details */}
        <div className="lg:col-span-2">
          {selectedPool ? (
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedPool.pool.name}</h2>
                  <div className="text-gray-400">
                    {selectedPool.facilityName} - {selectedPool.facilityLocation}
                  </div>
                </div>
                <Link 
                  href={`/pools/${selectedPool.pool.id}`}
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  View Details
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className={`p-4 rounded-lg ${
                  getParameterStatus('chlorine', selectedPool.pool.parameters.chlorine) === 'critical' ? 'bg-red-500/20' :
                  getParameterStatus('chlorine', selectedPool.pool.parameters.chlorine) === 'warning' ? 'bg-yellow-500/20' :
                  'bg-green-500/20'
                }`}>
                  <Droplet className="w-6 h-6 mb-2" />
                  <div className="text-2xl font-bold">{selectedPool.pool.parameters.chlorine.toFixed(1)}</div>
                  <div className="text-gray-400">Chlorine (ppm)</div>
                </div>

                <div className={`p-4 rounded-lg ${
                  getParameterStatus('pH', selectedPool.pool.parameters.pH) === 'critical' ? 'bg-red-500/20' :
                  getParameterStatus('pH', selectedPool.pool.parameters.pH) === 'warning' ? 'bg-yellow-500/20' :
                  'bg-green-500/20'
                }`}>
                  <Activity className="w-6 h-6 mb-2" />
                  <div className="text-2xl font-bold">{selectedPool.pool.parameters.pH.toFixed(1)}</div>
                  <div className="text-gray-400">pH Level</div>
                </div>

                <div className={`p-4 rounded-lg ${
                  getParameterStatus('temperature', selectedPool.pool.parameters.temperature) === 'critical' ? 'bg-red-500/20' :
                  getParameterStatus('temperature', selectedPool.pool.parameters.temperature) === 'warning' ? 'bg-yellow-500/20' :
                  'bg-green-500/20'
                }`}>
                  <ThermometerSun className="w-6 h-6 mb-2" />
                  <div className="text-2xl font-bold">{selectedPool.pool.parameters.temperature.toFixed(1)}°C</div>
                  <div className="text-gray-400">Temperature</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedPool.pool.equipment.map((equipment: any) => (
                  <div key={equipment.id} className="bg-white/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">{equipment.name}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        equipment.status === 'running' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {equipment.status}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {equipment.sensors.map((sensor: any) => (
                        <div key={sensor.id} className="flex justify-between items-center">
                          <div className="text-gray-400">{sensor.type}</div>
                          <div>{sensor.value.toFixed(1)} {sensor.unit}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-lg p-6 flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <div className="text-xl mb-2">Select a pool to view details</div>
                <div className="text-sm">Choose a pool from the list on the left to see its parameters and equipment status</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 