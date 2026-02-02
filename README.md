# Agriculture ERP - Estate Management System

A comprehensive, modern web application for managing agricultural estate operations, built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **8 Core Modules**: General Info, Geo Info, Crop Info, Fertilizer, Crop Monitoring Info, Assets & Machinery, Forestry, and Spraying/Weeding
- **Hierarchical Data Structure**: Organization → Company → Region → Estate → Division → Field/Block → Sub-block
- **Real-time Monitoring**: Crop health, asset maintenance, inventory levels, and compliance tracking
- **Modern UI/UX**: Glass morphism, smooth animations, responsive design, and dark mode support
- **Mock Data System**: Fully relational mock datasets for development and demonstration

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **date-fns** - Date utilities

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "ERP SAMPLE UI"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Shared components (Logo)
│   ├── landing/         # Landing page components (HeroSlider)
│   ├── layout/          # Layout components (SideDock, TopBar)
│   ├── modules/         # Module-specific components (KPITile, ActivityTimeline, QuickActions)
│   ├── crop/            # Crop module components
│   ├── fertilizer/      # Fertilizer module components
│   ├── geo/             # Geo Info module components
│   ├── machinery/       # Assets & Machinery module components
│   ├── forestry/        # Forestry module components
│   ├── spraying/        # Spraying/Weeding module components
│   └── monitoring/      # Crop Monitoring module components
├── contexts/            # React contexts (ThemeContext, AppContext)
├── layouts/             # Page layouts (AppLayout)
├── mock/               # Mock data and helper functions
├── pages/
│   ├── modules/        # All 8 module pages
│   └── LandingPage.tsx # Landing page
├── types/              # TypeScript type definitions
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles and Tailwind directives
```

## Module Overview

### 1. General Info
- Executive + operational overview
- Dashboard with KPIs
- Alerts & Exceptions
- Daily Approvals
- Reports

### 2. Geo Info
- GIS-based plantation map
- Field boundaries and layers
- Field profile with crop & yield history
- Route & Task Planning
- Layer Control (soil, forestry, restricted areas)

### 3. Crop Info
- Crop Registry (type, variety, planting date, age)
- Crop Calendar with visual calendar grid
- Yield & Quality tracking
- Field Activities Log
- Pest/Disease tracking

### 4. Fertilizer
- Fertilizer Program (recommendations, schedule)
- Requisitions & Stock management
- Application Capture
- Costing & Audit

### 5. Crop Monitoring Info
- Scouting & Inspection
- NDVI / Drone / Satellite health maps
- Soil & Leaf Tests
- Recommendations
- Issue Tracking

### 6. Assets & Machinery
- Asset Registry (Tractors, Sprayers, Vehicles, Tools)
- Allocation & Scheduling
- Work Logs with pre-start checklist
- Maintenance (Preventive, Breakdown, Spare parts)
- Fuel Management

### 7. Forestry
- Tree Inventory (species, density by field)
- Harvest/Pruning Permits with legal documents
- Conservation Areas (buffer zones, reforestation)
- Timber/Firewood Handling (Stock, Issue, Sales)
- Erosion/Drainage Projects

### 8. Spraying/Weeding
- Spray Program (target pest/weed, chemical, dose, frequency)
- Weeding Program (manual/mechanical/chemical)
- Chemical Store (receive, batch, expiry, MSDS, issue control)
- Application Capture with PPE checklist
- Safety & Compliance (REI/PHI tracking, no-spray zones, incident reporting)

## Customization

### Adding Images

Place hero slider images in `public/slides/`:
- `slide-1.jpg`
- `slide-2.jpg`
- `slide-3.jpg`
- `slide-4.jpg`
- `slide-5.jpg`
- `slide-6.jpg`

### Adding Fonts

Place custom fonts in `src/assets/fonts/` and update `src/index.css` with `@font-face` declarations.

### Adding Logos

Place logo file as `logo.png` in the `public/` folder. The Logo component will automatically use it.

## Deployment to Netlify

### Option 1: Drag and Drop

1. Build the project:
```bash
npm run build
```

2. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

### Option 2: Git Integration

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

The `netlify.toml` file is already configured for SPA routing.

## Features in Detail

### Theme System
- Light and dark mode with persistent storage
- Agriculture-inspired color palette:
  - Primary: Leaf green
  - Secondary: Soil brown
  - Accent: Sky/teal
  - Highlight: Harvest gold

### Responsive Design
- Desktop: Left-side dock navigation
- Mobile: Bottom navigation bar
- Tablet: Adaptive layouts

### Mock Data
- Fully relational datasets
- Realistic data connections
- All mock data stored in `src/mock/data.ts`

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states for all controls
- Semantic HTML structure

## Development Notes

- All data is mock data stored in `src/mock/data.ts`
- No backend connection required
- User settings (theme, selected estate) persist in localStorage
- Demo mode banner can be dismissed
- Reset data button reloads the page

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

## Support

For issues or questions, please refer to the project documentation or create an issue in the repository.
