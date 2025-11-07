export interface BlockTemplate {
  id: string
  type: 'sensor' | 'actuator' | 'logic' | 'ai'
  category: string
  label: string
  description: string
  icon: string
  config: Record<string, any>
  inputs: string[]
  outputs: string[]
}

export interface NodeData extends BlockTemplate {
  config: Record<string, any>
}

export interface Sketch {
  id: string
  name: string
  description: string
  nodes: any[]
  edges: any[]
  createdAt: string
  updatedAt: string
}

export interface Device {
  id: string
  name: string
  type: string
  status: 'online' | 'offline'
  lastSeen: string
  sensors: Sensor[]
  actuators: Actuator[]
}

export interface Sensor {
  id: string
  type: string
  value: number
  unit: string
  timestamp: string
}

export interface Actuator {
  id: string
  type: string
  state: string
  timestamp: string
}

export interface SimulationData {
  isRunning: boolean
  sensorValues: Record<string, any>
  actuatorStates: Record<string, any>
  logs: LogEntry[]
}

export interface LogEntry {
  id: string
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
  source: string
}

