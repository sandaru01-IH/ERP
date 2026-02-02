import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { useApp } from '../../contexts/AppContext'
import { Sun, Moon, Bell, User, Search, Menu } from 'lucide-react'
import { mockOrganizations, getAllFields } from '../../mock/data'
import Logo from '../common/Logo'

export default function TopBar() {
  const { theme, toggleTheme } = useTheme()
  const { selectedEstate, selectedField, setSelectedEstate, setSelectedField } = useApp()
  const navigate = useNavigate()

  const estates = mockOrganizations[0].companies[0].regions.flatMap(r => r.estates)
  const fields = getAllFields()

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Breadcrumbs */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/app')}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </button>
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Home</span>
            {selectedEstate && (
              <>
                <span>/</span>
                <span>{selectedEstate.name}</span>
              </>
            )}
            {selectedField && (
              <>
                <span>/</span>
                <span>{selectedField.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Search & Selectors */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <select
            value={selectedEstate?.id || ''}
            onChange={(e) => {
              const estate = estates.find(est => est.id === e.target.value)
              setSelectedEstate(estate || null)
            }}
            className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select Estate</option>
            {estates.map(estate => (
              <option key={estate.id} value={estate.id}>{estate.name}</option>
            ))}
          </select>
          {selectedEstate && (
            <select
              value={selectedField?.id || ''}
              onChange={(e) => {
                const field = fields.find(f => f.id === e.target.value)
                setSelectedField(field || null)
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select Field</option>
              {fields
                .filter(f => f.estateId === selectedEstate.id)
                .map(field => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
            </select>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          <button
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="User profile"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
