'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Sliders, Zap, Droplets, Thermometer, Eye, Sun } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { generateMockSensorData } from '@/lib/utils'

interface SimulationPanelProps {}

export function SimulationPanel({}: SimulationPanelProps) {
  const { 
    simulation, 
    startSimulation, 
    stopSimulation, 
    updateSimulationData, 
    addLog,
    isSimulating 
  } = useStore()
  
  const [sensorValues, setSensorValues] = useState({
    moisture: 65,
    temperature: 24.5,
    humidity: 45,
    light: 350,
    motion: 0,
  })

  const [actuatorStates, setActuatorStates] = useState({
    pump: 'off',
    led: 'off',
    motor: 'stopped',
    fan: 'off',
  })

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isSimulating) {
      interval = setInterval(() => {
        // Generate random sensor data
        const newValues = {
          moisture: Math.max(0, Math.min(100, sensorValues.moisture + (Math.random() - 0.5) * 10)),
          temperature: Math.max(15, Math.min(35, sensorValues.temperature + (Math.random() - 0.5) * 2)),
          humidity: Math.max(20, Math.min(80, sensorValues.humidity + (Math.random() - 0.5) * 5)),
          light: Math.max(0, Math.min(1000, sensorValues.light + (Math.random() - 0.5) * 100)),
          motion: Math.random() > 0.8 ? 1 : 0,
        }
        
        setSensorValues(newValues)
        updateSimulationData({
          sensorValues: newValues,
          actuatorStates,
        })

        // Add random logs
        if (Math.random() > 0.7) {
          const logMessages = [
            'Moisture level updated',
            'Temperature reading taken',
            'Motion detected',
            'Light level changed',
            'System status check',
          ]
          addLog({
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            level: 'info',
            message: logMessages[Math.floor(Math.random() * logMessages.length)],
            source: 'Simulation',
          })
        }
      }, 2000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSimulating, sensorValues, actuatorStates, updateSimulationData, addLog])

  const handleStartSimulation = () => {
    startSimulation()
    addLog({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level: 'info',
      message: 'Simulation started successfully',
      source: 'System',
    })
  }

  const handleStopSimulation = () => {
    stopSimulation()
  }

  const handleResetSimulation = () => {
    setSensorValues({
      moisture: 65,
      temperature: 24.5,
      humidity: 45,
      light: 350,
      motion: 0,
    })
    setActuatorStates({
      pump: 'off',
      led: 'off',
      motor: 'stopped',
      fan: 'off',
    })
    updateSimulationData({
      sensorValues: {
        moisture: 65,
        temperature: 24.5,
        humidity: 45,
        light: 350,
        motion: 0,
      },
      actuatorStates: {
        pump: 'off',
        led: 'off',
        motor: 'stopped',
        fan: 'off',
      },
    })
  }

  const toggleActuator = (actuator: string) => {
    const newState = actuatorStates[actuator as keyof typeof actuatorStates] === 'off' || 
                     actuatorStates[actuator as keyof typeof actuatorStates] === 'stopped' 
                     ? 'on' : 'off'
    
    setActuatorStates(prev => ({
      ...prev,
      [actuator]: newState
    }))

    updateSimulationData({
      actuatorStates: {
        ...actuatorStates,
        [actuator]: newState
      }
    })

    addLog({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      level: 'info',
      message: `${actuator} turned ${newState}`,
      source: 'Simulation',
    })
  }

  const updateSensorValue = (sensor: string, value: number) => {
    setSensorValues(prev => ({
      ...prev,
      [sensor]: value
    }))
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-green-500" />
          <h2 className="text-lg font-semibold text-gray-900">Simulation</h2>
        </div>
        <p className="text-sm text-gray-500">Test your workflow with mock data</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Controls */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={isSimulating ? handleStopSimulation : handleStartSimulation}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isSimulating
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isSimulating ? 'Stop' : 'Start'} Simulation</span>
            </button>
            <button
              onClick={handleResetSimulation}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>

          <div className={`p-3 rounded-lg ${
            isSimulating ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                isSimulating ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="text-sm font-medium">
                {isSimulating ? 'Simulation Running' : 'Simulation Stopped'}
              </span>
            </div>
          </div>
        </div>

        {/* Sensor Controls */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900 flex items-center space-x-2">
            <Sliders className="w-4 h-4" />
            <span>Sensor Values</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Moisture: {sensorValues.moisture.toFixed(1)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={sensorValues.moisture}
                onChange={(e) => updateSensorValue('moisture', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <Thermometer className="w-4 h-4 text-red-500" />
                <span>Temperature: {sensorValues.temperature.toFixed(1)}°C</span>
              </label>
              <input
                type="range"
                min="15"
                max="35"
                step="0.1"
                value={sensorValues.temperature}
                onChange={(e) => updateSensorValue('temperature', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span>Light: {sensorValues.light.toFixed(0)} lux</span>
              </label>
              <input
                type="range"
                min="0"
                max="1000"
                value={sensorValues.light}
                onChange={(e) => updateSensorValue('light', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <Eye className="w-4 h-4 text-purple-500" />
                <span>Motion: {sensorValues.motion ? 'Detected' : 'None'}</span>
              </label>
              <button
                onClick={() => updateSensorValue('motion', sensorValues.motion ? 0 : 1)}
                className={`px-3 py-1 rounded text-xs ${
                  sensorValues.motion 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Toggle Motion
              </button>
            </div>
          </div>
        </div>

        {/* Actuator Controls */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Actuator States</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(actuatorStates).map(([actuator, state]) => (
              <button
                key={actuator}
                onClick={() => toggleActuator(actuator)}
                className={`p-3 rounded-lg text-sm font-medium transition-all ${
                  state === 'on' || state === 'running'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <div className="capitalize">{actuator}</div>
                <div className="text-xs opacity-75">{state}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Logs */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Simulation Logs</h3>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs max-h-32 overflow-y-auto">
            {simulation.logs.slice(-10).map((log) => (
              <div key={log.id} className="mb-1">
                <span className="text-gray-500">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
                <span className={`ml-2 ${
                  log.level === 'error' ? 'text-red-400' :
                  log.level === 'warning' ? 'text-yellow-400' :
                  log.level === 'info' ? 'text-green-400' :
                  'text-blue-400'
                }`}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="ml-2">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}






