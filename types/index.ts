export type SensorType = 'temperature' | 'vibration' | 'pressure'

export interface Sensor {
  id: string
  type: SensorType
  value: number
  unit: string
  lastUpdate: Date
  status: 'optimal' | 'warning' | 'critical'
}

export interface Equipment {
  id: string
  name: string
  type: 'pump' | 'filter'
  status: 'running' | 'stopped' | 'maintenance'
  sensors: Sensor[]
}

export interface Pool {
  id: string
  name: string
  type: 'olympic' | 'semiOlympic' | 'kids' | 'recreational' | 'therapy'
  size: string
  equipment: Equipment[]
  parameters: {
    chlorine: number
    pH: number
    temperature: number
    turbidity: number
    tds: number
    filterPressure: number
  }
}

export interface Facility {
  id: string
  name: string
  location: string
  pools: Pool[]
} 