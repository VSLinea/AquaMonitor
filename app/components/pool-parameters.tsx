"use client"

import { useState } from "react"
import { Droplet, ThermometerSun, Activity } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const pools = [
  { id: "1", name: "Olympic Pool" },
  { id: "2", name: "Diving Pool" },
  { id: "3", name: "Training Pool" },
  { id: "4", name: "Kids Pool" },
  { id: "5", name: "Therapy Pool" },
  { id: "6", name: "Leisure Pool" },
]

export function PoolParameters() {
  const [selectedPool, setSelectedPool] = useState(pools[0].id)

  return (
    <div className="p-6 bg-[#001529] text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Pool Parameters</h2>
        <Select value={selectedPool} onValueChange={setSelectedPool}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a pool" />
          </SelectTrigger>
          <SelectContent>
            {pools.map((pool) => (
              <SelectItem key={pool.id} value={pool.id}>
                {pool.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Droplet className="w-6 h-6" />
          <div>
            <div className="text-2xl font-bold">1.5 ppm</div>
            <div className="text-gray-400 text-sm">Chlorine Level</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Activity className="w-6 h-6" />
          <div>
            <div className="text-2xl font-bold">7.2</div>
            <div className="text-gray-400 text-sm">pH Level</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ThermometerSun className="w-6 h-6" />
          <div>
            <div className="text-2xl font-bold">28°C</div>
            <div className="text-gray-400 text-sm">Water Temperature</div>
          </div>
        </div>
      </div>
    </div>
  )
}

