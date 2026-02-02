import HeroSlider from '../components/landing/HeroSlider'

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Spatio Agri ERP</h3>
              <p className="text-gray-400">
                Comprehensive estate management system for modern agriculture operations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Modules</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Organization</li>
                <li>Crop Management</li>
                <li>People & Time</li>
                <li>Stores</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Operations</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Assets & Machinery</li>
                <li>Fertilizer</li>
                <li>Spraying & Weeding</li>
                <li>Forestry</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Analytics</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Geo Info & GIS</li>
                <li>Reports</li>
                <li>Dashboards</li>
                <li>KPIs</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Spatio Agri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
