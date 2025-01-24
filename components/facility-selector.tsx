"use client"

import { useState } from 'react'
import { useFacility } from '@/contexts/FacilityContext'

export function FacilitySelector() {
  const { facilities, selectedFacility, setSelectedFacility } = useFacility()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white rounded-md px-4 py-2 text-left flex justify-between items-center"
      >
        <span>{selectedFacility?.name || "Select facility..."}</span>
        <span className="transform transition-transform duration-200">
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search facility..."
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => {
                // Add search functionality if needed
              }}
            />
          </div>
          <div className="max-h-60 overflow-auto">
            {facilities.map((facility) => (
              <button
                key={facility.id}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  setSelectedFacility(facility)
                  setIsOpen(false)
                }}
              >
                {facility.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 