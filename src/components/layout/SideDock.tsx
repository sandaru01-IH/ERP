import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Home,
  Building2,
  Sprout,
  Users,
  Package,
  Wrench,
  Activity,
  Map,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Eye,
  Scissors,
} from 'lucide-react'
import Logo from '../common/Logo'

const dockItems = [
  { id: 'home', label: 'General Info', icon: Home, path: '/app' },
  { id: 'geo-info', label: 'Geo Info', icon: Map, path: '/app/geo-info' },
  { id: 'crop', label: 'Crop Info', icon: Sprout, path: '/app/crop' },
  { id: 'fertilizer', label: 'Fertilizer', icon: Droplet, path: '/app/fertilizer' },
  { id: 'crop-monitoring', label: 'Crop Moni. Info', icon: Eye, path: '/app/crop-monitoring' },
  { id: 'assets-machinery', label: 'Assets & Machinery', icon: Wrench, path: '/app/assets-machinery' },
  { id: 'operations', label: 'Forestry', icon: Activity, path: '/app/operations' },
  { id: 'geo-reports', label: 'Spraying/Weeding', icon: Scissors, path: '/app/geo-reports' },
]

export default function SideDock() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/app') {
      return location.pathname === '/app'
    }
    // Check for exact match first
    if (location.pathname === path) {
      return true
    }
    // For paths that could conflict (like /app/crop and /app/crop-monitoring),
    // ensure we only match if the pathname starts with the path followed by / or end of string
    return location.pathname.startsWith(path + '/') || location.pathname === path
  }

  return (
    <>
      {/* Desktop Side Dock */}
      <motion.div
        initial={false}
        animate={{ width: isCollapsed ? 80 : 240 }}
        className="hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-lg z-10"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          {!isCollapsed ? (
            <Logo />
          ) : (
            <Logo collapsed={true} className="justify-center" />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isCollapsed ? 'Expand dock' : 'Collapse dock'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {dockItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.path)}
                whileHover={{ scale: 1.05, x: 4 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                  active
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 shadow-md'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            )
          })}
        </nav>
      </motion.div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 shadow-lg">
        <nav className="flex items-center p-2 overflow-x-auto scrollbar-hide scroll-smooth">
          {dockItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all flex-shrink-0 min-w-[70px] ${
                  active
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs whitespace-nowrap">{item.id === 'home' ? 'General' : item.id === 'geo-info' ? 'Geo' : item.id === 'crop' ? 'Crop' : item.id === 'fertilizer' ? 'Fertilizer' : item.id === 'crop-monitoring' ? 'Monitor' : item.id === 'operations' ? 'Forestry' : item.id === 'geo-reports' ? 'Spray' : item.label.split(' ')[0]}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
