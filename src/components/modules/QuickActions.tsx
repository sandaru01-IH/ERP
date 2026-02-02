import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: LucideIcon
  onClick: () => void
  color?: string
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <motion.button
            key={action.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={action.onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              action.color || 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{action.label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
