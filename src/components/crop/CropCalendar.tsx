import { motion } from 'framer-motion'
import { Calendar, CheckCircle, Clock, X } from 'lucide-react'
import { CropCalendar as CropCalendarType } from '../../types'
import { mockCropCalendars } from '../../mock/data'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay } from 'date-fns'

const operationIcons = {
  fertilize: '🌱',
  prune: '✂️',
  weed: '🌿',
  spray: '💧',
}

const operationColors = {
  fertilize: 'bg-blue-500',
  prune: 'bg-purple-500',
  weed: 'bg-green-500',
  spray: 'bg-orange-500',
}

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CropCalendar() {
  // Set to April 2026
  const targetMonth = 4 // April
  const targetYear = 2026
  const targetDate = new Date(targetYear, targetMonth - 1, 1)
  
  // Get all calendars for April 2026
  const aprilCalendars = mockCropCalendars.filter(
    cal => cal.month === targetMonth && cal.year === targetYear
  )
  
  // Collect all operations for April 2026
  const allOperations = aprilCalendars.flatMap(cal => cal.operations)
  
  // Get calendar days
  const monthStart = startOfMonth(targetDate)
  const monthEnd = endOfMonth(targetDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  
  // Get first day of week (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = getDay(monthStart)
  
  // Create array with empty cells for days before month starts
  const emptyDays = Array(firstDayOfWeek).fill(null)
  
  // Get operations for a specific date
  const getOperationsForDate = (date: Date) => {
    return allOperations.filter(op => {
      const opDate = new Date(op.plannedDate)
      return isSameDay(opDate, date)
    })
  }
  
  // Get status color for a day
  const getDayStatusColor = (date: Date) => {
    const operations = getOperationsForDate(date)
    if (operations.length === 0) return ''
    
    const hasCompleted = operations.some(op => op.status === 'completed')
    const hasPlanned = operations.some(op => op.status === 'planned')
    
    if (hasCompleted) return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700'
    if (hasPlanned) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700'
    return 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700'
  }

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Crop Calendar</h3>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Planned operations by month: {monthNames[targetMonth - 1]} {targetYear}
        </p>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-600 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before month starts */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}
          
          {/* Days of the month */}
          {daysInMonth.map((day) => {
            const operations = getOperationsForDate(day)
            const isToday = isSameDay(day, new Date())
            const dayStatusColor = getDayStatusColor(day)
            
            return (
              <motion.div
                key={day.toISOString()}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`aspect-square p-1 rounded-lg border-2 ${
                  dayStatusColor || 'border-transparent'
                } ${
                  isToday
                    ? 'ring-2 ring-primary-500 dark:ring-primary-400'
                    : ''
                } hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer relative`}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`text-sm font-medium ${
                      isToday
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {format(day, 'd')}
                  </span>
                  {operations.length > 0 && (
                    <div className="flex flex-wrap gap-0.5 mt-auto">
                      {operations.slice(0, 3).map((op, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${operationColors[op.type]}`}
                          title={`${op.type} - ${op.status}`}
                        />
                      ))}
                      {operations.length > 3 && (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" title={`+${operations.length - 3} more`} />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Legend:</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-gray-600 dark:text-gray-400">Fertilize</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span className="text-gray-600 dark:text-gray-400">Prune</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-gray-600 dark:text-gray-400">Weed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500" />
            <span className="text-gray-600 dark:text-gray-400">Spray</span>
          </div>
        </div>
      </div>

      {/* Operations List */}
      <div className="space-y-3">
        {allOperations.length > 0 ? (
          allOperations.map((operation) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-4 rounded-xl border ${
                operation.status === 'completed'
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                  : operation.status === 'skipped'
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  : 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{operationIcons[operation.type]}</span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white capitalize">
                      {operation.type}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Planned: {format(new Date(operation.plannedDate), 'MMM d, yyyy')}
                      {operation.actualDate && (
                        <> • Actual: {format(new Date(operation.actualDate), 'MMM d, yyyy')}</>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {operation.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : operation.status === 'skipped' ? (
                    <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  )}
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      operation.status === 'completed'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : operation.status === 'skipped'
                        ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}
                  >
                    {operation.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center py-4">
            No operations scheduled for this month
          </p>
        )}
      </div>
    </div>
  )
}
