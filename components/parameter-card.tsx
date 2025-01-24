"use client"

import { useState } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface ParameterCardProps {
  type: string
  value: number
  icon: React.ReactNode
  unit: string
}

export function ParameterCard({ type, value, icon, unit }: ParameterCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock historical data - replace with real data
  const historicalData = {
    labels: ['1h ago', '45m ago', '30m ago', '15m ago', 'Now'],
    datasets: [
      {
        label: type,
        data: [value - 0.2, value + 0.1, value - 0.1, value + 0.2, value],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }
    ]
  }

  const getStatusColor = () => {
    switch (type) {
      case 'chlorine':
        return value < 1.0 || value > 3.0 ? 'bg-red-500/20' :
               value < 1.5 || value > 2.5 ? 'bg-yellow-500/20' : 'bg-green-500/20'
      case 'pH':
        return value < 7.2 || value > 7.8 ? 'bg-red-500/20' :
               value < 7.4 || value > 7.6 ? 'bg-yellow-500/20' : 'bg-green-500/20'
      case 'temperature':
        return value < 24 || value > 32 ? 'bg-red-500/20' :
               value < 26 || value > 30 ? 'bg-yellow-500/20' : 'bg-green-500/20'
      default:
        return 'bg-green-500/20'
    }
  }

  return (
    <div 
      className={`rounded-lg transition-all duration-300 ${getStatusColor()} ${
        isExpanded ? 'col-span-full' : ''
      }`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {icon}
            <div>
              <div className="text-2xl font-bold">
                {value.toFixed(1)}{unit}
              </div>
              <div className="text-gray-400 capitalize">{type}</div>
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 h-[200px]">
            <Line
              data={historicalData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: false,
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  },
                  x: {
                    grid: {
                      color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                      color: 'rgba(255, 255, 255, 0.7)'
                    }
                  }
                },
                plugins: {
                  legend: {
                    display: false
                  }
                }
              }}
            />
          </div>
        )}
      </button>
    </div>
  )
} 