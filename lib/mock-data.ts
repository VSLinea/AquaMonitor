import { Facility, Pool, Equipment, Sensor } from '@/types'

const facilityNames = [
  { name: 'Aqua Sports Center', location: 'Downtown' },
  { name: 'Wellness Oasis', location: 'North District' },
  { name: 'Elite Swimming Academy', location: 'West Side' },
  { name: 'Community Aquatic Center', location: 'South Park' },
  { name: 'Splash & Swim Complex', location: 'East End' },
  { name: 'Blue Wave Resort', location: 'Waterfront' },
  { name: 'Performance Pool Center', location: 'Sports District' },
  { name: 'Family Aqua Park', location: 'Central Park' },
  { name: 'Therapy & Wellness Pools', location: 'Medical District' },
  { name: 'Competition Swimming Center', location: 'University Area' }
]

const poolTypes = ['olympic', 'semiOlympic', 'kids', 'recreational', 'therapy'] as const

function createSensor(type: 'temperature' | 'vibration' | 'pressure'): Sensor {
  return {
    id: crypto.randomUUID(),
    type,
    value: 0, // Will be updated by real-time simulation
    unit: type === 'temperature' ? '°C' : type === 'pressure' ? 'PSI' : 'mm/s',
    lastUpdate: new Date(),
    status: 'optimal'
  }
}

function createEquipment(type: 'pump' | 'filter', index: number): Equipment {
  const sensors = type === 'pump' 
    ? [createSensor('temperature'), createSensor('vibration')]
    : [createSensor('pressure')]

  return {
    id: crypto.randomUUID(),
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${index + 1}`,
    type,
    status: 'running',
    sensors
  }
}

function createPool(name: string, type: typeof poolTypes[number]): Pool {
  let pumps: Equipment[] = []
  let filters: Equipment[] = []

  if (type === 'olympic') {
    pumps = Array(6).fill(null).map((_, i) => createEquipment('pump', i))
    filters = Array(5).fill(null).map((_, i) => createEquipment('filter', i))
  } else if (type === 'semiOlympic') {
    pumps = Array(3).fill(null).map((_, i) => createEquipment('pump', i))
    filters = Array(2).fill(null).map((_, i) => createEquipment('filter', i))
  } else {
    pumps = Array(3).fill(null).map((_, i) => createEquipment('pump', i))
    filters = Array(2).fill(null).map((_, i) => createEquipment('filter', i))
  }

  return {
    id: crypto.randomUUID(),
    name,
    type,
    size: type === 'olympic' ? '50m x 25m' : type === 'semiOlympic' ? '25m x 12.5m' : '20m x 10m',
    equipment: [...pumps, ...filters],
    parameters: {
      chlorine: 1.5,
      pH: 7.2,
      temperature: 28,
      turbidity: 0.5,
      tds: 300,
      filterPressure: 15
    }
  }
}

export function generateMockFacilities(): Facility[] {
  return facilityNames.map(({ name, location }) => {
    const numPools = Math.floor(Math.random() * 7) + 1 // 1 to 8 pools
    const pools: Pool[] = []

    // Ensure at least one olympic pool for certain facilities
    if (name.includes('Sports') || name.includes('Competition')) {
      pools.push(createPool('Olympic Pool', 'olympic'))
    }

    // Add random pools
    for (let i = pools.length; i < numPools; i++) {
      const type = poolTypes[Math.floor(Math.random() * poolTypes.length)]
      pools.push(createPool(`${type.charAt(0).toUpperCase() + type.slice(1)} Pool ${i + 1}`, type))
    }

    return {
      id: crypto.randomUUID(),
      name,
      location,
      pools
    }
  })
} 