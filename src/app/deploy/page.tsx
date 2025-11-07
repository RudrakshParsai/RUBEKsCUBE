'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle, Clock, Zap, Wifi, Settings } from 'lucide-react'
import { useStore } from '@/store/useStore'

export default function DeployPage() {
  const { currentSketch, devices, isDeploying, setDeploying } = useStore()
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle')
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([])

  const handleDeploy = async () => {
    if (!currentSketch) return

    setDeploymentStatus('deploying')
    setDeploying(true)
    setDeploymentLogs([])

    // Simulate deployment process
    const logs = [
      'Initializing deployment...',
      'Validating sketch configuration...',
      'Connecting to RuBEk Cube #001...',
      'Uploading workflow to device...',
      'Configuring sensor inputs...',
      'Setting up actuator outputs...',
      'Testing connections...',
      'Deployment completed successfully!'
    ]

    for (let i = 0; i < logs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDeploymentLogs(prev => [...prev, logs[i]])
    }

    setDeploymentStatus('success')
    setDeploying(false)
  }

  const getStatusIcon = () => {
    switch (deploymentStatus) {
      case 'deploying':
        return <Clock className="w-6 h-6 text-blue-500 animate-spin" />
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-500" />
      default:
        return <Upload className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusText = () => {
    switch (deploymentStatus) {
      case 'deploying':
        return 'Deploying...'
      case 'success':
        return 'Deployed Successfully!'
      case 'error':
        return 'Deployment Failed'
      default:
        return 'Ready to Deploy'
    }
  }

  const getStatusColor = () => {
    switch (deploymentStatus) {
      case 'deploying':
        return 'bg-blue-100 text-blue-800'
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Deploy to Device</h1>
          <p className="text-gray-600 text-lg">
            Deploy your IoT workflow to connected RuBEk Cubes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deployment Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Zap className="w-8 h-8 text-orange-500" />
              <h2 className="text-2xl font-semibold text-gray-900">Deployment</h2>
            </div>

            {currentSketch ? (
              <div className="space-y-6">
                {/* Sketch Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Current Sketch</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Name:</span> {currentSketch.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Description:</span> {currentSketch.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Blocks:</span> {currentSketch.nodes.length} nodes, {currentSketch.edges.length} connections
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Last Updated:</span> {new Date(currentSketch.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Deployment Status */}
                <div className={`p-4 rounded-lg ${getStatusColor()}`}>
                  <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <span className="font-medium">{getStatusText()}</span>
                  </div>
                </div>

                {/* Deploy Button */}
                <button
                  onClick={handleDeploy}
                  disabled={isDeploying || deploymentStatus === 'deploying'}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isDeploying || deploymentStatus === 'deploying'
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {isDeploying ? 'Deploying...' : 'Deploy to Cube'}
                </button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Sketch Selected</h3>
                <p className="text-gray-500 mb-4">Create or select a sketch to deploy</p>
                <a
                  href="/editor"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Go to Editor
                </a>
              </div>
            )}
          </motion.div>

          {/* Device Status & Logs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Device Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <Wifi className="w-8 h-8 text-green-500" />
                <h2 className="text-2xl font-semibold text-gray-900">Device Status</h2>
              </div>

              {devices.map((device) => (
                <div key={device.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">{device.name}</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          device.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className={`text-sm ${
                          device.status === 'online' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {device.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      Last seen: {new Date(device.lastSeen).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Sensors</h4>
                      <div className="space-y-1">
                        {device.sensors.map((sensor) => (
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
                      <div className="space-y-1">
                        {device.actuators.map((actuator) => (
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
              ))}
            </div>

            {/* Deployment Logs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Deployment Logs</h2>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-64 overflow-y-auto">
                {deploymentLogs.length === 0 ? (
                  <div className="text-gray-500">No deployment logs yet...</div>
                ) : (
                  deploymentLogs.map((log, index) => (
                    <div key={index} className="mb-1">
                      <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                      <span className="ml-2 text-blue-400">[INFO]</span>
                      <span className="ml-2">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}






