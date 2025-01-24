"use client"

import { useState } from "react"
import { useFacility } from "@/contexts/FacilityContext"
import { 
  AlertTriangle, Activity, Droplet, ThermometerSun, 
  ChevronRight, ChevronDown, Building 
} from "lucide-react"
import Link from "next/link"

interface PoolWithFacility {
  facilityName: string
  facilityLocation: string
  pool: any // Using the Pool type from your types file
}

export default function Monitoring() {
  const { facilities } = useFacility()
  const [selectedPool, setSelectedPool] = useState<any>(null)
  const [expandedFacilities, setExpandedFacilities] = useState<string[]>([])

  const toggleFacility = (facilityId: string) => {
    setExpandedFacilities(current => 
      current.includes(facilityId)
        ? current.filter(id => id !== facilityId)
        : [...current, facilityId]
    )
  }

  return (
    <div className="min-h-screen bg-[#001529] text-white p-6">
      <h1 className="text-2xl font-bold mb-6">System Monitoring</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Facilities and Pools List */}
        <div className="bg-white/5 rounded-lg p-4 max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#001529] pb-2 mb-2">
            <h2 className="text-xl font-semibold">Facilities Overview</h2>
          </div>
          <div className="space-y-2">
            {facilities.map((facility) => (
              <div key={facility.id} className="rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFacility(facility.id)}
                  className="w-full p-3 bg-white/10 flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    <span>{facility.name}</span>
                  </div>
                  {expandedFacilities.includes(facility.id) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
                
                {expandedFacilities.includes(facility.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {facility.pools.map((pool) => (
                      <button
                        key={pool.id}
                        onClick={() => setSelectedPool({ pool, facilityName: facility.name })}
                        className={`w-full p-2 rounded-lg text-left transition-colors ${
                          selectedPool?.pool.id === pool.id
                            ? 'bg-white/20'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{pool.name}</span>
                          {pool.parameters.chlorine < 1.0 || pool.parameters.pH < 7.2 && (
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Pool Details with Expandable Cards */}
        <div className="lg:col-span-2">
          {selectedPool ? (
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">{selectedPool.pool.name}</h2>
                  <div className="text-gray-400">{selectedPool.facilityName}</div>
                </div>
                <Link 
                  href={`/pools/${selectedPool.pool.id}`}
                  className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  View Details
                </Link>
              </div>

              {/* Water Parameters Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Water Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ParameterCard
                    type="chlorine"
                    value={selectedPool.pool.parameters.chlorine}
                    icon={<Droplet className="w-6 h-6" />}
                    unit="ppm"
                  />
                  <ParameterCard
                    type="pH"
                    value={selectedPool.pool.parameters.pH}
                    icon={<Activity className="w-6 h-6" />}
                    unit=""
                  />
                  <ParameterCard
                    type="temperature"
                    value={selectedPool.pool.parameters.temperature}
                    icon={<ThermometerSun className="w-6 h-6" />}
                    unit="°C"
                  />
                </div>
              </div>

              {/* Equipment Sections */}
              <div className="space-y-6">
                {/* Pumps Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pumps</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPool.pool.equipment
                      .filter((eq: any) => eq.type === 'pump')
                      .map((equipment: any) => (
                        <EquipmentCard key={equipment.id} equipment={equipment} />
                      ))}
                  </div>
                </div>

                {/* Filters Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPool.pool.equipment
                      .filter((eq: any) => eq.type === 'filter')
                      .map((equipment: any) => (
                        <EquipmentCard key={equipment.id} equipment={equipment} />
                      ))}
                  </div>
                </div>

                {/* Other Equipment */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Other Equipment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPool.pool.equipment
                      .filter((eq: any) => !['pump', 'filter'].includes(eq.type))
                      .map((equipment: any) => (
                        <EquipmentCard key={equipment.id} equipment={equipment} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/5 rounded-lg p-6 flex items-center justify-center h-full">
              <div className="text-center text-gray-400">
                <div className="text-xl mb-2">Select a pool to view details</div>
                <div className="text-sm">Choose a facility and pool from the list on the left</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 