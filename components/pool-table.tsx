"use client"

import { useFacility } from '@/contexts/FacilityContext'
import { useState } from 'react'

export function PoolTable() {
  const { selectedFacility } = useFacility()
  const [searchTerm, setSearchTerm] = useState('')
  const [poolType, setPoolType] = useState('')
  const [status, setStatus] = useState('')

  const filteredPools = selectedFacility?.pools.filter(pool => {
    const matchesSearch = pool.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !poolType || pool.type === poolType
    // Add status filtering logic if needed
    return matchesSearch && matchesType
  }) || []

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          placeholder="Pool name"
          className="px-3 py-2 rounded-md"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 rounded-md"
          onChange={(e) => setPoolType(e.target.value)}
        >
          <option value="">Select pool type</option>
          <option value="olympic">Olympic</option>
          <option value="semiOlympic">Semi-Olympic</option>
          <option value="kids">Kids</option>
          <option value="recreational">Recreational</option>
          <option value="therapy">Therapy</option>
        </select>
        <button className="bg-white/10 text-white px-4 py-2 rounded-md">
          Search
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-2">Status</th>
            <th>Pool Name</th>
            <th>Type</th>
            <th>Chlorine (ppm)</th>
            <th>pH</th>
            <th>Temperature (°C)</th>
            <th>Turbidity (NTU)</th>
            <th>TDS (ppm)</th>
            <th>Filter Pressure (PSI)</th>
          </tr>
        </thead>
        <tbody>
          {filteredPools.map(pool => (
            <tr key={pool.id} className="text-white border-t border-white/10">
              <td className="py-2">
                <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
              </td>
              <td>{pool.name}</td>
              <td>{pool.type}</td>
              <td>{pool.parameters.chlorine}</td>
              <td>{pool.parameters.pH}</td>
              <td>{pool.parameters.temperature}</td>
              <td>{pool.parameters.turbidity}</td>
              <td>{pool.parameters.tds}</td>
              <td>{pool.parameters.filterPressure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 