import { useState } from 'react'
import { MapContainer, TileLayer, Polygon, CircleMarker, Polyline, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { FieldBoundary, Road, Building, SoilZone, ForestryZone, RestrictedArea } from '../../types/geo'
import { mockFieldBoundaries, mockRoads, mockBuildings, mockSoilZones, mockForestryZones, mockRestrictedAreas } from '../../mock/data'

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface EstateMapProps {
  selectedFieldId?: string | null
  onFieldClick: (fieldId: string) => void
  showLayers: {
    boundaries: boolean
    roads: boolean
    buildings: boolean
    soil: boolean
    forestry: boolean
    restricted: boolean
  }
}

function MapClickHandler({ onFieldClick }: { onFieldClick: (fieldId: string) => void }) {
  useMapEvents({
    click: (e) => {
      // Find which field was clicked
      const clickedField = mockFieldBoundaries.find(boundary => {
        const polygon = L.polygon(boundary.coordinates)
        return polygon.getBounds().contains(e.latlng)
      })
      if (clickedField) {
        onFieldClick(clickedField.fieldId)
      }
    },
  })
  return null
}

export default function EstateMap({ selectedFieldId, onFieldClick, showLayers }: EstateMapProps) {
  // Center on Sri Lanka (Nuwara Eliya area)
  const center: [number, number] = [6.9497, 80.7891]
  const zoom = 15

  return (
    <div className="relative h-[600px] w-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
      <MapContainer
        key="estate-map"
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onFieldClick={onFieldClick} />

        {/* Field Boundaries */}
        {showLayers.boundaries && mockFieldBoundaries.map((boundary) => (
          <Polygon
            key={boundary.id}
            positions={boundary.coordinates}
            pathOptions={{
              color: selectedFieldId === boundary.fieldId ? '#ef4444' : '#22c55e',
              fillColor: selectedFieldId === boundary.fieldId ? '#ef4444' : '#22c55e',
              fillOpacity: 0.3,
              weight: 2,
            }}
            eventHandlers={{
              click: () => onFieldClick(boundary.fieldId),
            }}
          />
        ))}

        {/* Roads/Paths/Drains */}
        {showLayers.roads && mockRoads.map((road) => (
          <Polyline
            key={road.id}
            positions={road.coordinates}
            pathOptions={{
              color: road.type === 'road' ? '#f59e0b' : road.type === 'drain' ? '#3b82f6' : '#6b7280',
              weight: road.type === 'road' ? 4 : 2,
            }}
          />
        ))}

        {/* Buildings */}
        {showLayers.buildings && mockBuildings.map((building) => (
          <CircleMarker
            key={building.id}
            center={building.coordinates}
            radius={8}
            pathOptions={{
              color: '#8b5cf6',
              fillColor: '#8b5cf6',
              fillOpacity: 0.7,
            }}
          />
        ))}

        {/* Soil Zones */}
        {showLayers.soil && mockSoilZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: zone.fertility === 'high' ? '#10b981' : zone.fertility === 'medium' ? '#f59e0b' : '#ef4444',
              fillColor: zone.fertility === 'high' ? '#10b981' : zone.fertility === 'medium' ? '#f59e0b' : '#ef4444',
              fillOpacity: 0.2,
              weight: 1,
              dashArray: '5, 5',
            }}
          />
        ))}

        {/* Forestry Zones */}
        {showLayers.forestry && mockForestryZones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: '#059669',
              fillColor: '#059669',
              fillOpacity: 0.2,
              weight: 1,
            }}
          />
        ))}

        {/* Restricted Areas */}
        {showLayers.restricted && mockRestrictedAreas.map((area) => (
          <Polygon
            key={area.id}
            positions={area.coordinates}
            pathOptions={{
              color: '#dc2626',
              fillColor: '#dc2626',
              fillOpacity: 0.2,
              weight: 2,
              dashArray: '10, 5',
            }}
          />
        ))}
      </MapContainer>
    </div>
  )
}
