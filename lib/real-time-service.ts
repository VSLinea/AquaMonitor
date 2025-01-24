import { Sensor } from '@/types'

export class RealTimeService {
  private static instance: RealTimeService
  private subscribers: Set<(data: any) => void> = new Set()
  private intervalId: NodeJS.Timeout | null = null

  private constructor() {
    this.startSimulation()
  }

  static getInstance() {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService()
    }
    return RealTimeService.instance
  }

  private startSimulation() {
    this.intervalId = setInterval(() => {
      // Simulate sensor data updates
      const update = {
        sensorId: crypto.randomUUID(),
        type: Math.random() > 0.5 ? 'temperature' : Math.random() > 0.5 ? 'pressure' : 'vibration',
        value: this.generateSensorValue(),
        timestamp: new Date()
      }

      this.subscribers.forEach(callback => callback(update))
    }, 1000) // Update every second
  }

  private generateSensorValue() {
    return Math.random() * 100 // Simplified random value generation
  }

  subscribe(callback: (data: any) => void) {
    this.subscribers.add(callback)
    return () => this.subscribers.delete(callback)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }
} 