'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
  NodeTypes,
  EdgeTypes,
  ReactFlowInstance,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { BlockPanel } from '@/components/BlockPanel'
import { AIPanel } from '@/components/AIPanel'
import { SimulationPanel } from '@/components/SimulationPanel'
import { CustomNode } from '@/components/CustomNode'
import { CustomEdge } from '@/components/CustomEdge'
import { useStore } from '@/store/useStore'
import { generateId } from '@/lib/utils'
import { blockTemplates } from '@/data/blockTemplates'

const nodeTypes: NodeTypes = {
  custom: CustomNode,
}

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
}

export default function Editor() {
  const { currentSketch, setCurrentSketch, updateSketch, isSimulating } = useStore()
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [showSimulation, setShowSimulation] = useState(false)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        id: generateId(),
        ...params,
        type: 'custom',
      }
      setEdges((eds) => addEdge(newEdge, eds))
    },
    [setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const type = event.dataTransfer.getData('application/reactflow')
      if (!type || !reactFlowWrapper.current || !reactFlowInstance) return

      // Get the position relative to the ReactFlow viewport
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const template = blockTemplates.find((t) => t.id === type)
      if (!template) return

      const newNode: Node = {
        id: generateId(),
        type: 'custom',
        position,
        data: {
          ...template,
          config: { ...template.config },
        },
      }

      setNodes((nds) => [...nds, newNode])
    },
    [setNodes, reactFlowInstance]
  )

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node)
  }, [])

  const onPaneClick = useCallback(() => {
    setSelectedNode(null)
  }, [])

  const onInit = useCallback((reactFlow: ReactFlowInstance) => {
    setReactFlowInstance(reactFlow)
  }, [])

  const onDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId))
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId))
    setSelectedNode(null)
  }, [setNodes, setEdges])

  const onDeleteEdge = useCallback((edgeId: string) => {
    setEdges((eds) => eds.filter((edge) => edge.id !== edgeId))
  }, [setEdges])

  const clearCanvas = useCallback(() => {
    if (confirm('Are you sure you want to clear all blocks and connections?')) {
      setNodes([])
      setEdges([])
      setSelectedNode(null)
    }
  }, [setNodes, setEdges])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedNode) {
        onDeleteNode(selectedNode.id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedNode, onDeleteNode])

  const handleSave = useCallback(() => {
    if (currentSketch) {
      updateSketch(currentSketch.id, {
        nodes: nodes.map((node) => ({
          id: node.id,
          type: node.data.type,
          label: node.data.label,
          category: node.data.category,
          config: node.data.config,
          position: node.position,
        })),
        edges: edges.map((edge) => ({
          id: edge.id,
          source: edge.source,
          target: edge.target,
          sourceHandle: edge.sourceHandle,
          targetHandle: edge.targetHandle,
          type: edge.type as 'input' | 'output' | 'logic',
        })),
        updatedAt: new Date().toISOString(),
      })
    }
  }, [currentSketch, nodes, edges, updateSketch])

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {currentSketch?.name || 'New Sketch'}
            </h1>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear Canvas
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showAIPanel
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                AI Assistant
              </button>
              <button
                onClick={() => setShowSimulation(!showSimulation)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showSimulation
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isSimulating ? 'Stop Sim' : 'Simulate'}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {nodes.length} blocks, {edges.length} connections
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Block Panel */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <BlockPanel />
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={onInit}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView
            attributionPosition="bottom-left"
          >
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Right Panels */}
        <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
          {showAIPanel && (
            <div className="flex-1 border-b border-gray-200">
              <AIPanel />
            </div>
          )}
          {showSimulation && (
            <div className="flex-1">
              <SimulationPanel />
            </div>
          )}
          {selectedNode && !showAIPanel && !showSimulation && (
            <div className="flex-1 p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">Block Properties</h3>
                  <button
                    onClick={() => onDeleteNode(selectedNode.id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{selectedNode.data.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm">{selectedNode.data.label}</h4>
                    <p className="text-xs text-gray-600">{selectedNode.data.category}</p>
                  </div>
                </div>
              </div>
              
              {/* Configuration */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Configuration</h4>
                {Object.entries(selectedNode.data.config || {}).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{key}</label>
                    <input
                      type={typeof value === 'number' ? 'number' : 'text'}
                      value={value as string}
                      onChange={(e) => {
                        const newValue = typeof value === 'number' ? Number(e.target.value) : e.target.value
                        setNodes((nds) => 
                          nds.map((node) => 
                            node.id === selectedNode.id 
                              ? { ...node, data: { ...node.data, config: { ...node.data.config, [key]: newValue } } }
                              : node
                          )
                        )
                        setSelectedNode((prevNode) => 
                          prevNode ? { ...prevNode, data: { ...prevNode.data, config: { ...prevNode.data.config, [key]: newValue } } } 
                          : null
                        )
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {!showAIPanel && !showSimulation && !selectedNode && (
            <div className="flex-1 p-6">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎛️</span>
                </div>
                <h3 className="text-lg font-medium mb-2">No Panel Selected</h3>
                <p className="text-sm">
                  Click on a block or choose AI Assistant or Simulation to get started
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}





