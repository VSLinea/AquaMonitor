"use client"

import { useEffect } from "react"
import { FacilitySelector } from "@/components/facility-selector"
import { PoolParameters } from "@/components/pool-parameters"
import { PoolStatus } from "@/components/pool-status"
import { ActiveAlarms } from "@/components/active-alarms"
import { PoolTable } from "@/components/pool-table"
import { useFacility } from "@/contexts/FacilityContext"

export default function Dashboard() {
  const { facilities, selectedFacility } = useFacility()

  useEffect(() => {
    console.log('Dashboard mounted')
    console.log('Facilities:', facilities)
    console.log('Selected facility:', selectedFacility)
  }, [facilities, selectedFacility])

  return (
    <div className="min-h-screen bg-[#001529]">
      <main className="p-6">
        <div className="mb-6">
          <FacilitySelector />
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
          <PoolParameters />
          <PoolStatus />
          <ActiveAlarms />
        </div>
        <PoolTable />
      </main>
    </div>
  )
}

