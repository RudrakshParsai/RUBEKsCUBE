'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { blockTemplates } from '@/data/blockTemplates'

interface BlockPanelProps {}

export function BlockPanel({}: BlockPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Sensors', 'Actuators', 'Logic', 'AI'])
  )

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

  const onDragStart = (event: React.DragEvent, templateId: string) => {
    event.dataTransfer.setData('application/reactflow', templateId)
    event.dataTransfer.effectAllowed = 'move'
  }

  const categories = blockTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = []
    }
    acc[template.category].push(template)
    return acc
  }, {} as Record<string, typeof blockTemplates>)

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Block Library</h2>
        <p className="text-sm text-gray-500">Drag blocks to canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(categories).map(([category, templates]) => (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleCategory(category)}
              className="flex items-center justify-between w-full p-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <span className="font-medium text-gray-900">{category}</span>
              {expandedCategories.has(category) ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )}
            </button>

            {expandedCategories.has(category) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2 pl-4"
              >
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, template.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`lego-block ${template.type}-block p-3 cursor-grab active:cursor-grabbing`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {template.label}
                        </h3>
                        <p className="text-xs text-gray-600 truncate">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Input</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Output</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Logic</span>
          </div>
        </div>
      </div>
    </div>
  )
}






