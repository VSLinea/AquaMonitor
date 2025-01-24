"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { Facility } from '@/types'
import { generateMockFacilities } from '@/lib/mock-data'
import { RealTimeService } from '@/lib/real-time-service'

interface FacilityContextType {
  facilities: Facility[]
  selectedFacility: Facility | null
  setSelectedFacility: (facility: Facility) => void
}

const FacilityContext = createContext<FacilityContextType | undefined>(undefined)

export function FacilityProvider({ children }: { children: React.ReactNode }) {
  const [facilities, setFacilities] = useState<Facility[]>([])
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null)

  useEffect(() => {
    // Initialize with mock data
    const mockFacilities = generateMockFacilities()
    setFacilities(mockFacilities)
    setSelectedFacility(mockFacilities[0])

    // Subscribe to real-time updates
    const realTimeService = RealTimeService.getInstance()
    const unsubscribe = realTimeService.subscribe((update) => {
      setFacilities(currentFacilities => {
        // Update the relevant sensor data
        // This is a simplified update logic
        return currentFacilities.map(facility => ({
          ...facility,
          pools: facility.pools.map(pool => ({
            ...pool,
            equipment: pool.equipment.map(equipment => ({
              ...equipment,
              sensors: equipment.sensors.map(sensor => 
                sensor.id === update.sensorId 
                  ? { ...sensor, value: update.value, lastUpdate: update.timestamp }
                  : sensor
              )
            }))
          }))
        }))
      })
    })

    return () => {
      unsubscribe()
      realTimeService.stop()
    }
  }, [])

  return (
    <FacilityContext.Provider value={{ facilities, selectedFacility, setSelectedFacility }}>
      {children}
    </FacilityContext.Provider>
  )
}

export function useFacility() {
  const context = useContext(FacilityContext)
  if (context === undefined) {
    throw new Error('useFacility must be used within a FacilityProvider')
  }
  return context
} 