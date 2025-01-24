"use client"

import { useFacility } from "@/contexts/FacilityContext"
import { AlertTriangle } from "lucide-react"

export function ActiveAlarms() {
  const { selectedFacility } = useFacility()

  const alarms = {
    critical: 0,
    major: 0,
    minor: 0,
    warning: 0
  }

  // Calculate alarms based on sensor data
  selectedFacility?.pools.forEach(pool => {
    pool.equipment.forEach(equipment => {
      equipment.sensors.forEach(sensor => {
        if (sensor.status === 'critical') alarms.critical++
        else if (sensor.status === 'warning') alarms.warning++
      })
    })
  })

  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Active Alarms</h2>
        <div className="flex items-center">
          <AlertTriangle className="w-5 h-5 text-yellow-500" />
          <span className="ml-2 text-2xl font-bold">
            {alarms.critical + alarms.major + alarms.minor + alarms.warning}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span>Critical</span>
          </div>
          <span>{alarms.critical}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            <span>Major</span>
          </div>
          <span>{alarms.major}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
            <span>Minor</span>
          </div>
          <span>{alarms.minor}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            <span>Warning</span>
          </div>
          <span>{alarms.warning}</span>
        </div>
      </div>
    </div>
  )
} 