"use client"

interface EquipmentCardProps {
  equipment: any
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <div className="bg-white/5 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{equipment.name}</h3>
        <span className={`px-2 py-1 rounded text-sm ${
          equipment.status === 'running' ? 'bg-green-500/20 text-green-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {equipment.status}
        </span>
      </div>
      <div className="space-y-3">
        {equipment.sensors.map((sensor: any) => (
          <div key={sensor.id} className="flex justify-between items-center">
            <div className="text-gray-400">{sensor.type}</div>
            <div>{sensor.value.toFixed(1)} {sensor.unit}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 