"use client"

import { useFacility } from "@/contexts/FacilityContext"
import { AlertTriangle, Activity, Droplet, ThermometerSun } from "lucide-react"
import Link from "next/link"

export default function Monitoring() {
  const { facilities } = useFacility()

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
      
      <div className="space-y-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white/5 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{facility.name}</h2>
              <span className="text-gray-400">{facility.location}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {facility.pools.map((pool) => {
                const criticalIssues = [
                  getParameterStatus('chlorine', pool.parameters.chlorine),
                  getParameterStatus('pH', pool.parameters.pH),
                  getParameterStatus('temperature', pool.parameters.temperature)
                ].filter(status => status === 'critical').length

                const warningIssues = [
                  getParameterStatus('chlorine', pool.parameters.chlorine),
                  getParameterStatus('pH', pool.parameters.pH),
                  getParameterStatus('temperature', pool.parameters.temperature)
                ].filter(status => status === 'warning').length

                return (
                  <Link 
                    href={`/pools/${pool.id}`}
                    key={pool.id} 
                    className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-medium">{pool.name}</div>
                      {(criticalIssues > 0 || warningIssues > 0) && (
                        <AlertTriangle className={`w-5 h-5 ${
                          criticalIssues > 0 ? 'text-red-500' : 'text-yellow-500'
                        }`} />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className={`p-2 rounded ${
                        getParameterStatus('chlorine', pool.parameters.chlorine) === 'critical' ? 'bg-red-500/20' :
                        getParameterStatus('chlorine', pool.parameters.chlorine) === 'warning' ? 'bg-yellow-500/20' :
                        'bg-green-500/20'
                      }`}>
                        <Droplet className="w-4 h-4 mb-1" />
                        <div className="text-sm">{pool.parameters.chlorine.toFixed(1)}</div>
                        <div className="text-xs text-gray-400">Chlorine</div>
                      </div>
                      
                      <div className={`p-2 rounded ${
                        getParameterStatus('pH', pool.parameters.pH) === 'critical' ? 'bg-red-500/20' :
                        getParameterStatus('pH', pool.parameters.pH) === 'warning' ? 'bg-yellow-500/20' :
                        'bg-green-500/20'
                      }`}>
                        <Activity className="w-4 h-4 mb-1" />
                        <div className="text-sm">{pool.parameters.pH.toFixed(1)}</div>
                        <div className="text-xs text-gray-400">pH</div>
                      </div>
                      
                      <div className={`p-2 rounded ${
                        getParameterStatus('temperature', pool.parameters.temperature) === 'critical' ? 'bg-red-500/20' :
                        getParameterStatus('temperature', pool.parameters.temperature) === 'warning' ? 'bg-yellow-500/20' :
                        'bg-green-500/20'
                      }`}>
                        <ThermometerSun className="w-4 h-4 mb-1" />
                        <div className="text-sm">{pool.parameters.temperature.toFixed(1)}°C</div>
                        <div className="text-xs text-gray-400">Temp</div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Equipment</span>
                        <span>{pool.equipment.length} units</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Sensors</span>
                        <span>
                          {pool.equipment.reduce((acc, eq) => acc + eq.sensors.length, 0)} active
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 