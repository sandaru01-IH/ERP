import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { KPI } from '../../types'

interface KPITileProps {
  kpi: KPI
  icon?: LucideIcon
}

export default function KPITile({ kpi, icon: Icon }: KPITileProps) {
  const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : Minus
  const trendColor =
    kpi.trend === 'up'
      ? 'text-green-500'
      : kpi.trend === 'down'
      ? 'text-red-500'
      : 'text-gray-500'

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-panel p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{kpi.label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
            <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
        )}
      </div>
      {kpi.change !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${trendColor}`}>
          <TrendIcon className="w-4 h-4" />
          <span>{Math.abs(kpi.change)}%</span>
          <span className="text-gray-500">vs last period</span>
        </div>
      )}
    </motion.div>
  )
}
