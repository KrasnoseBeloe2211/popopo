'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'

interface BarChartBlockProps {
  data: { name: string; value: number }[]
}

const COLORS = ['#13a749', '#13a749', '#13a749', '#13a749', '#13a749']

export const BarChartBlock = ({ data }: BarChartBlockProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data} barSize={40}>
        <XAxis 
          dataKey="name" 
          stroke="#a0a3a8"
          tick={{ fill: '#a0a3a8', fontSize: 14 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          stroke="#a0a3a8"
          tick={{ fill: '#a0a3a8', fontSize: 14 }}
          axisLine={false}
          tickLine={false}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            background: '#1a1d24',
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
        />
        <Bar 
          dataKey="value" 
          radius={[8, 8, 0, 0]}
          animationDuration={1000}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={COLORS[index % COLORS.length]}
              style={{ filter: 'brightness(1.1)' }}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
