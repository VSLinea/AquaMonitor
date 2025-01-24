"use client"

import { useRouter } from "next/navigation"
import { useFacility } from "@/contexts/FacilityContext"
import { AlertTriangle } from "lucide-react"

export function PoolTable() {
  const router = useRouter()
  const { selectedFacility } = useFacility()

  const handlePoolClick = (poolId: string) => {
    router.push(`/pools/${poolId}`)
  }

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Status</th>
            <th>Pool Name</th>
            <th>Type</th>
            <th>Chlorine (ppm)</th>
            <th>pH</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          {selectedFacility?.pools.map(pool => (
            <tr 
              key={pool.id} 
              className="text-white border-t border-white/10 cursor-pointer hover:bg-white/5"
              onClick={() => handlePoolClick(pool.id)}
            >
              <td className="py-2">
                {pool.equipment.some(eq => 
                  eq.sensors.some(s => s.status === 'warning' || s.status === 'critical')
                ) && (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
              </td>
              <td>{pool.name}</td>
              <td>{pool.type}</td>
              <td>{pool.parameters.chlorine.toFixed(1)}</td>
              <td>{pool.parameters.pH.toFixed(1)}</td>
              <td>{pool.parameters.temperature.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 