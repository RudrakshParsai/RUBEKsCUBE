import { create } from 'zustand'
import { Sketch, Device, SimulationData, LogEntry } from '@/types'

interface AppState {
  // Sketches
  sketches: Sketch[]
  currentSketch: Sketch | null
  
  // Devices
  devices: Device[]
  
  // Simulation
  simulation: SimulationData
  
  // UI State
  isSimulating: boolean
  isDeploying: boolean
  
  // Actions
  addSketch: (sketch: Sketch) => void
  updateSketch: (id: string, updates: Partial<Sketch>) => void
  deleteSketch: (id: string) => void
  setCurrentSketch: (sketch: Sketch | null) => void
  
  updateDevice: (id: string, updates: Partial<Device>) => void
  
  startSimulation: () => void
  stopSimulation: () => void
  updateSimulationData: (data: Partial<SimulationData>) => void
  addLog: (log: LogEntry) => void
  
  setDeploying: (deploying: boolean) => void
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  sketches: [],
  currentSketch: null,
  devices: [
    {
      id: 'cube-001',
      name: 'RuBEk Cube #001',
      type: 'cube',
      status: 'online',
      lastSeen: new Date().toISOString(),
      sensors: [
        {
          id: 'temp-001',
          type: 'temperature',
          value: 24.5,
          unit: '°C',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'moisture-001',
          type: 'moisture',
          value: 65,
          unit: '%',
          timestamp: new Date().toISOString(),
        },
      ],
      actuators: [
        {
          id: 'pump-001',
          type: 'pump',
          state: 'off',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'led-001',
          type: 'led',
          state: 'off',
          timestamp: new Date().toISOString(),
        },
      ],
    },
  ],
  simulation: {
    isRunning: false,
    sensorValues: {},
    actuatorStates: {},
    logs: [],
  },
  isSimulating: false,
  isDeploying: false,

  // Actions
  addSketch: (sketch) =>
    set((state) => ({
      sketches: [...state.sketches, sketch],
    })),

  updateSketch: (id, updates) =>
    set((state) => ({
      sketches: state.sketches.map((sketch) =>
        sketch.id === id ? { ...sketch, ...updates } : sketch
      ),
      currentSketch:
        state.currentSketch?.id === id
          ? { ...state.currentSketch, ...updates }
          : state.currentSketch,
    })),

  deleteSketch: (id) =>
    set((state) => ({
      sketches: state.sketches.filter((sketch) => sketch.id !== id),
      currentSketch:
        state.currentSketch?.id === id ? null : state.currentSketch,
    })),

  setCurrentSketch: (sketch) =>
    set({ currentSketch: sketch }),

  updateDevice: (id, updates) =>
    set((state) => ({
      devices: state.devices.map((device) =>
        device.id === id ? { ...device, ...updates } : device
      ),
    })),

  startSimulation: () =>
    set((state) => ({
      isSimulating: true,
      simulation: {
        ...state.simulation,
        isRunning: true,
        logs: [
          ...state.simulation.logs,
          {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'Simulation started',
            source: 'System',
          },
        ],
      },
    })),

  stopSimulation: () =>
    set((state) => ({
      isSimulating: false,
      simulation: {
        ...state.simulation,
        isRunning: false,
        logs: [
          ...state.simulation.logs,
          {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            level: 'info',
            message: 'Simulation stopped',
            source: 'System',
          },
        ],
      },
    })),

  updateSimulationData: (data) =>
    set((state) => ({
      simulation: { ...state.simulation, ...data },
    })),

  addLog: (log) =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        logs: [...state.simulation.logs, log],
      },
    })),

  setDeploying: (deploying) => set({ isDeploying: deploying }),
}))






