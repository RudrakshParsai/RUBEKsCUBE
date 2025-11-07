'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Activity, AlertTriangle, TrendingUp, Droplets, Thermometer, Eye, Sun } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useStore } from '@/store/useStore'
import { generateMockSensorData } from '@/lib/utils'

export default function MonitoringPage() {
  const { devices, simulation } = useStore()
  const [timeSeriesData, setTimeSeriesData] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  // Generate mock time series data
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const data = []
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000) // Every minute
        data.push({
          time: time.toLocaleTimeString(),
          moisture: Math.random() * 40 + 30,
          temperature: Math.random() * 10 + 20,
          humidity: Math.random() * 30 + 40,
          light: Math.random() * 500 + 200,
        })
      }
      
      setTimeSeriesData(data)
    }

    generateData()
    const interval = setInterval(generateData, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Generate mock alerts
  useEffect(() => {
    const generateAlerts = () => {
      const alertTypes = [
        { type: 'warning', message: 'Moisture level below threshold', icon: '💧' },
        { type: 'info', message: 'Temperature rising above normal', icon: '🌡️' },
        { type: 'success', message: 'Pump activated successfully', icon: '🚰' },
        { type: 'warning', message: 'Motion detected in area', icon: '👁️' },
        { type: 'error', message: 'Connection lost to sensor', icon: '⚠️' },
      ]

      const newAlerts = Array.from({ length: Math.floor(Math.random() * 3) }, () => {
        const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)]
        return {
          id: Date.now() + Math.random(),
          type: alert.type,
          message: alert.message,
          icon: alert.icon,
          timestamp: new Date().toISOString(),
        }
      })

      setAlerts(prev => [...newAlerts, ...prev].slice(0, 10)) // Keep last 10 alerts
    }

    generateAlerts()
    const interval = setInterval(generateAlerts, 10000) // Generate alerts every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const currentDevice = devices[0]

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Monitoring Dashboard</h1>
          <p className="text-gray-600 text-lg">
            Real-time monitoring of your IoT devices and sensors
          </p>
        </motion.div>

        {/* Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Device Status</p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">{alerts.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Points</p>
                <p className="text-2xl font-bold text-blue-600">{timeSeriesData.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-purple-600">99.9%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Time Series Charts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Moisture Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Droplets className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900">Moisture Level</h2>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="moisture" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Temperature Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Thermometer className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-semibold text-gray-900">Temperature</h2>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temperature" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Light & Motion Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Sun className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-gray-900">Light & Motion</h2>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={timeSeriesData.slice(-10)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="light" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current Sensor Values */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Values</h2>
              <div className="space-y-4">
                {currentDevice?.sensors.map((sensor) => (
                  <div key={sensor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {sensor.type === 'moisture' && <Droplets className="w-4 h-4 text-blue-500" />}
                        {sensor.type === 'temperature' && <Thermometer className="w-4 h-4 text-red-500" />}
                        {sensor.type === 'light' && <Sun className="w-4 h-4 text-yellow-500" />}
                        {sensor.type === 'motion' && <Eye className="w-4 h-4 text-purple-500" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 capitalize">{sensor.type}</p>
                        <p className="text-sm text-gray-500">{sensor.timestamp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {sensor.value} {sensor.unit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No alerts</p>
                ) : (
                  alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">{alert.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs opacity-75">
                            {new Date(alert.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Actuator Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Actuator Status</h2>
              <div className="space-y-3">
                {currentDevice?.actuators.map((actuator) => (
                  <div key={actuator.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        actuator.state === 'on' || actuator.state === 'running'
                          ? 'bg-green-500 animate-pulse'
                          : 'bg-gray-400'
                      }`}></div>
                      <span className="font-medium text-gray-900 capitalize">{actuator.type}</span>
                    </div>
                    <span className={`text-sm font-medium ${
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
          </motion.div>
        </div>
      </div>
    </div>
  )
}






