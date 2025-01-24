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
    console.log('Generated mock facilities:', mockFacilities) // Debug log
    setFacilities(mockFacilities)
    setSelectedFacility(mockFacilities[0])

    // Subscribe to real-time updates
    const realTimeService = RealTimeService.getInstance()
    const unsubscribe = realTimeService.subscribe((update) => {
      console.log('Received real-time update:', update) // Debug log
      setFacilities(currentFacilities => {
        // Update the relevant sensor data
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

  const value = {
    facilities,
    selectedFacility,
    setSelectedFacility: (facility: Facility) => {
      console.log('Setting selected facility:', facility) // Debug log
      setSelectedFacility(facility)
    }
  }

  return (
    <FacilityContext.Provider value={value}>
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