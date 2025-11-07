'use client'

import { Handle, Position, NodeProps } from 'reactflow'
import { motion } from 'framer-motion'

export function CustomNode({ data, selected }: NodeProps) {
  const getNodeStyle = (type: string) => {
    switch (type) {
      case 'sensor':
        return 'sensor-block'
      case 'actuator':
        return 'actuator-block'
      case 'logic':
        return 'logic-block'
      case 'ai':
        return 'ai-block'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getHandleStyle = (type: string) => {
    switch (type) {
      case 'input':
        return 'connection-input'
      case 'output':
        return 'connection-output'
      case 'logic':
        return 'connection-logic'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`lego-block ${getNodeStyle(data.type)} ${
        selected ? 'ring-2 ring-blue-500' : ''
      } min-w-[200px]`}
    >
      {/* Input Handles */}
      {data.inputs?.map((input: string, index: number) => {
        const totalInputs = data.inputs?.length || 0
        const startOffset = totalInputs === 1 ? 50 : 25 // Center if only one input
        const offset = totalInputs === 1 ? 0 : (index * (50 / Math.max(1, totalInputs - 1)))
        
        return (
          <Handle
            key={`input-${input}`}
            type="target"
            position={Position.Left}
            id={input}
            style={{
              top: `${startOffset + offset}px`,
              background: '#3b82f6',
              width: '12px',
              height: '12px',
              border: '2px solid white',
            }}
          />
        )
      })}

      {/* Node Content */}
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-2xl">{data.icon}</span>
          <div>
            <h3 className="font-semibold text-sm">{data.label}</h3>
            <p className="text-xs text-gray-600">{data.category}</p>
          </div>
        </div>

        {/* Configuration Display */}
        {data.config && Object.keys(data.config).length > 0 && (
          <div className="mt-2 space-y-1">
            {Object.entries(data.config).map(([key, value]) => (
              <div key={key} className="text-xs">
                <span className="text-gray-500">{key}:</span>{' '}
                <span className="font-medium">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Output Handles */}
      {data.outputs?.map((output: string, index: number) => {
        const totalOutputs = data.outputs?.length || 0
        const startOffset = totalOutputs === 1 ? 50 : 25 // Center if only one output
        const offset = totalOutputs === 1 ? 0 : (index * (50 / Math.max(1, totalOutputs - 1)))
        
        return (
          <Handle
            key={`output-${output}`}
            type="source"
            position={Position.Right}
            id={output}
            style={{
              top: `${startOffset + offset}px`,
              background: '#10b981',
              width: '12px',
              height: '12px',
              border: '2px solid white',
            }}
          />
        )
      })}
    </motion.div>
  )
}





