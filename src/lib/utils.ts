import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function generateMockSensorData(type: string, value?: number) {
  const ranges: Record<string, { min: number; max: number; unit: string }> = {
    moisture: { min: 0, max: 100, unit: '%' },
    temperature: { min: 15, max: 35, unit: '°C' },
    humidity: { min: 20, max: 80, unit: '%' },
    light: { min: 0, max: 1000, unit: 'lux' },
    motion: { min: 0, max: 1, unit: '' },
    pressure: { min: 950, max: 1050, unit: 'hPa' },
  }

  const range = ranges[type] || { min: 0, max: 100, unit: '' }
  const mockValue = value !== undefined ? value : Math.random() * (range.max - range.min) + range.min
  
  return {
    value: Math.round(mockValue * 100) / 100,
    unit: range.unit,
    timestamp: new Date().toISOString(),
  }
}

