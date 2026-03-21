'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'

interface RadarChartBlockProps {
  data: { name: string; value: number }[]
}

export const RadarChartBlock = ({ data }: RadarChartBlockProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid stroke="#2a2d34" />
        <PolarAngleAxis 
          dataKey="name" 
          tick={{ fill: '#a0a3a8', fontSize: 14 }}
          stroke="#a0a3a8"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#a0a3a8', fontSize: 12 }}
          stroke="#2a2d34"
          tickCount={5}
        />
        <Radar
          name="Показатели"
          dataKey="value"
          stroke="#13a749"
          strokeWidth={3}
          fill="#13a749"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
