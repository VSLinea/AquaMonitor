"use client"

import { useEffect, useState } from "react"
import { useFacility } from "@/contexts/FacilityContext"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Pool } from "@/types"

export default function PoolDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { facilities } = useFacility()
  const [pool, setPool] = useState<Pool | null>(null)

  useEffect(() => {
    // Find the pool across all facilities
    for (const facility of facilities) {
      const foundPool = facility.pools.find(p => p.id === params.id)
      if (foundPool) {
        setPool(foundPool)
        break
      }
    }
  }, [facilities, params.id])

  if (!pool) return <div>Loading...</div>

  const getSensorStatus = (value: number, type: string) => {
    switch (type) {
      case 'temperature':
        return value > 32 || value < 24 ? 'critical' : value > 30 || value < 26 ? 'warning' : 'normal'
      case 'pressure':
        return value > 25 ? 'critical' : value > 20 ? 'warning' : 'normal'
      case 'vibration':
        return value > 15 ? 'critical' : value > 10 ? 'warning' : 'normal'
      default:
        return 'normal'
    }
  }

  return (
    <div className="min-h-screen bg-[#001529] text-white p-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-400 hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{pool.name}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">Type</div>
              <div className="text-xl">{pool.type}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">Size</div>
              <div className="text-xl">{pool.size}</div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Water Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">Chlorine</div>
              <div className="text-xl">{pool.parameters.chlorine.toFixed(1)} ppm</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">pH</div>
              <div className="text-xl">{pool.parameters.pH.toFixed(1)}</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">Temperature</div>
              <div className="text-xl">{pool.parameters.temperature.toFixed(1)}°C</div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-gray-400">TDS</div>
              <div className="text-xl">{pool.parameters.tds} ppm</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/5 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Equipment Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pool.equipment.map((equipment) => (
              <div key={equipment.id} className="bg-white/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{equipment.name}</h3>
                  <span className={`px-2 py-1 rounded text-sm ${
                    equipment.status === 'running' ? 'bg-green-500/20 text-green-400' :
                    equipment.status === 'stopped' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {equipment.status}
                  </span>
                </div>
                <div className="space-y-4">
                  {equipment.sensors.map((sensor) => {
                    const status = getSensorStatus(sensor.value, sensor.type)
                    return (
                      <div key={sensor.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-gray-400">{sensor.type}</div>
                          <div className="text-lg">
                            {sensor.value.toFixed(1)} {sensor.unit}
                          </div>
                        </div>
                        {status !== 'normal' && (
                          <AlertTriangle className={`w-5 h-5 ${
                            status === 'critical' ? 'text-red-500' : 'text-yellow-500'
                          }`} />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 