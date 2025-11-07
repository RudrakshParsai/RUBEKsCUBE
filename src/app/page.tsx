'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Play, Settings, BarChart3, Zap, Wifi, WifiOff } from 'lucide-react'
import { useStore } from '@/store/useStore'
import { generateId } from '@/lib/utils'
import { Sketch } from '@/types'
import Link from 'next/link'

export default function Dashboard() {
  const { sketches, devices, addSketch } = useStore()
  const [isCreatingSketch, setIsCreatingSketch] = useState(false)

  const handleCreateSketch = () => {
    const newSketch: Sketch = {
      id: generateId(),
      name: `New Sketch ${sketches.length + 1}`,
      description: 'A new IoT workflow sketch',
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    addSketch(newSketch)
    setIsCreatingSketch(false)
  }

  const connectedDevice = devices[0]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            RuBEk's CUBE
          </h1>
          <p className="text-gray-600 text-lg">
            Modular IoT Orchestration Platform
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Link href="/editor">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Create New Sketch</h3>
              <p className="text-blue-100">Start building your IoT workflow</p>
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full p-6 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Play className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Simulate</h3>
            <p className="text-green-100">Test your workflows</p>
          </motion.button>

          <Link href="/deploy">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Zap className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Deploy</h3>
              <p className="text-orange-100">Deploy to devices</p>
            </motion.button>
          </Link>

          <Link href="/monitoring">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <BarChart3 className="w-8 h-8 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Monitor</h3>
              <p className="text-purple-100">View live data</p>
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Sketches */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Recent Sketches</h2>
              <button
                onClick={() => setIsCreatingSketch(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                New Sketch
              </button>
            </div>

            {sketches.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sketches yet</h3>
                <p className="text-gray-500 mb-4">Create your first IoT workflow sketch</p>
                <button
                  onClick={handleCreateSketch}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Create First Sketch
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {sketches.slice(0, 5).map((sketch) => (
                  <Link key={sketch.id} href={`/editor?id=${sketch.id}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{sketch.name}</h3>
                          <p className="text-sm text-gray-500">{sketch.description}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(sketch.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {sketch.nodes.length} blocks
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </motion.div>

          {/* Connected Devices */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Connected Devices</h2>
            
            {connectedDevice && (
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Settings className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{connectedDevice.name}</h3>
                        <div className="flex items-center space-x-2">
                          {connectedDevice.status === 'online' ? (
                            <Wifi className="w-4 h-4 text-green-500" />
                          ) : (
                            <WifiOff className="w-4 h-4 text-red-500" />
                          )}
                          <span className={`text-sm ${
                            connectedDevice.status === 'online' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {connectedDevice.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Sensors</h4>
                      <div className="space-y-2">
                        {connectedDevice.sensors.map((sensor) => (
                          <div key={sensor.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{sensor.type}</span>
                            <span className="font-medium">
                              {sensor.value} {sensor.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Actuators</h4>
                      <div className="space-y-2">
                        {connectedDevice.actuators.map((actuator) => (
                          <div key={actuator.id} className="flex justify-between text-sm">
                            <span className="text-gray-600 capitalize">{actuator.type}</span>
                            <span className={`font-medium ${
                              actuator.state === 'on' || actuator.state === 'running' 
                                ? 'text-green-600' 
                                : 'text-gray-500'
                            }`}>
                              {actuator.state}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}






