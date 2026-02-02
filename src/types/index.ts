export interface Organization {
  id: string
  name: string
  companies: Company[]
}

export interface Company {
  id: string
  name: string
  regions: Region[]
}

export interface Region {
  id: string
  name: string
  estates: Estate[]
}

export interface Estate {
  id: string
  name: string
  location: string
  divisions: Division[]
}

export interface Division {
  id: string
  name: string
  fields: Field[]
}

export interface Field {
  id: string
  name: string
  area: number
  cropId?: string
  subBlocks?: SubBlock[]
}

export interface SubBlock {
  id: string
  name: string
  area: number
}

export interface Crop {
  id: string
  type: string
  variety: string
  clone?: string
  age: number
  ageClass?: string
  plantingCycle: number
  plantingDate: string
  fieldId: string
  plantPopulation?: number
  infillHistory?: InfillRecord[]
  replantHistory?: ReplantRecord[]
}

export interface InfillRecord {
  id: string
  date: string
  quantity: number
  reason: string
}

export interface ReplantRecord {
  id: string
  date: string
  area: number
  reason: string
}

export interface CropCalendar {
  id: string
  fieldId: string
  month: number
  year: number
  operations: CalendarOperation[]
}

export interface CalendarOperation {
  id: string
  type: 'fertilize' | 'prune' | 'weed' | 'spray'
  plannedDate: string
  actualDate?: string
  status: 'planned' | 'completed' | 'skipped'
}

export interface YieldRecord {
  id: string
  fieldId: string
  date: string
  yield: number
  unit: string
  qualityMetrics?: QualityMetrics
}

export interface QualityMetrics {
  teaLeafStandard?: string
  latexDRC?: number
  fruitBunchGrading?: string
}

export interface FieldActivity {
  id: string
  fieldId: string
  type: 'pruning' | 'infilling' | 'mulching' | 'shade_management'
  date: string
  description: string
  performedBy: string
}

export interface PestDisease {
  id: string
  fieldId: string
  type: 'pest' | 'disease'
  name: string
  observationDate: string
  severity: 'low' | 'medium' | 'high'
  description: string
  actionsTaken: string[]
  status: 'active' | 'resolved'
}

export interface CropType {
  id: string
  name: string
  varieties: Variety[]
}

export interface Variety {
  id: string
  name: string
}

export interface Role {
  id: string
  name: string
  permissions: string[]
}

export interface Person {
  id: string
  name: string
  roleId: string
  email?: string
  phone?: string
}

export interface WorkTicket {
  id: string
  date: string
  fieldId: string
  activity: string
  labourHours: number
  cost: number
  status: 'pending' | 'completed' | 'approved'
}

export interface Attendance {
  id: string
  personId: string
  date: string
  checkIn: string
  checkOut?: string
  status: 'present' | 'absent' | 'late'
}

export interface Asset {
  id: string
  name: string
  type: 'machine' | 'vehicle' | 'tool'
  category: string
  status: 'active' | 'maintenance' | 'retired'
  assignments: Assignment[]
  maintenanceHistory: MaintenanceRecord[]
}

export interface Assignment {
  id: string
  assetId: string
  fieldId: string
  startDate: string
  endDate?: string
  status: 'active' | 'completed'
}

export interface MaintenanceRecord {
  id: string
  assetId: string
  type: 'preventive' | 'breakdown'
  date: string
  description: string
  cost: number
  nextDueDate?: string
  serviceHours?: number
  spareParts?: SparePartConsumption[]
}

export interface SparePartConsumption {
  id: string
  partName: string
  quantity: number
  unit: string
  cost: number
  issuedBy?: string
  issuedDate?: string
}

export interface BreakdownTicket {
  id: string
  assetId: string
  reportedDate: string
  reportedBy: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'reported' | 'in_progress' | 'completed' | 'closed'
  assignedTo?: string
  completedDate?: string
  resolution?: string
  cost?: number
}

export interface WorkLog {
  id: string
  assetId: string
  date: string
  operator: string
  hours: number
  distance?: number
  output?: number
  outputUnit?: string
  task?: string
  fieldId?: string
  notes?: string
  preStartChecklist?: {
    completed: boolean
    items: {
      name: string
      status: 'ok' | 'needs_attention' | 'not_checked'
      notes?: string
    }[]
  }
}

export interface FuelIssue {
  id: string
  assetId: string
  date: string
  quantity: number
  unit: string
  cost: number
  issuedBy: string
  issuedTo?: string
  purpose?: string
  odometerReading?: number
  reconciled?: boolean
  reconciledDate?: string
  reconciledBy?: string
}

export interface Store {
  id: string
  name: string
  location: string
  items: StoreItem[]
}

export interface StoreItem {
  id: string
  name: string
  category: string
  unit: string
  batches: Batch[]
  totalQuantity: number
}

export interface Batch {
  id: string
  itemId: string
  batchNumber: string
  quantity: number
  expiryDate?: string
  location: string
  status: 'available' | 'reserved' | 'issued'
}

export interface Issue {
  id: string
  batchId: string
  quantity: number
  date: string
  issuedTo: string
  purpose: string
}

export interface FertilizerProgram {
  id: string
  fieldId: string
  product: string
  dose: number
  round: number
  scheduledDate: string
  appliedDate?: string
  status: 'planned' | 'applied' | 'skipped'
  cost: number
}

export interface FertilizerRecommendation {
  id: string
  fieldId: string
  product: string
  recommendedRate: number // kg/ha
  basis: 'soil_test' | 'zone' | 'crop_age'
  soilTestDate?: string
  zone?: string
  cropAge?: number
  notes?: string
}

export interface FertilizerRequisition {
  id: string
  type: 'central_store' | 'supplier' | 'division_store' | 'field'
  product: string
  quantity: number
  unit: string
  requestedBy: string
  requestedDate: string
  status: 'pending' | 'approved' | 'issued' | 'rejected'
  issuedDate?: string
  issuedTo?: string
  batchNumber?: string
  jobTicketId?: string
}

export interface FertilizerApplication {
  id: string
  fieldId: string
  product: string
  rate: number // kg/ha
  date: string
  labour: string[]
  supervisor: string
  weatherCheck: {
    passed: boolean
    temperature?: number
    rainfall?: number
    windSpeed?: number
    notes?: string
  }
  batchNumber?: string
  status: 'completed' | 'pending_validation'
}

export interface FertilizerCosting {
  id: string
  fieldId: string
  period: string
  plannedCost: number
  actualCost: number
  variance: number
  variancePercent: number
  applications: number
  batchTraceability: {
    batchNumber: string
    product: string
    quantity: number
    cost: number
  }[]
}

export interface SprayProgram {
  id: string
  fieldId: string
  targetPestWeed: string
  chemical: string
  dose: number
  doseUnit: string
  frequency: string
  scheduledDate: string
  appliedDate?: string
  status: 'planned' | 'applied' | 'skipped'
  compliance: {
    reEntryInterval: number
    preHarvestInterval: number
    ppeRequired: string[]
  }
}

export interface WeedingProgram {
  id: string
  fieldId: string
  type: 'manual' | 'mechanical' | 'chemical'
  method: string
  scheduledDate: string
  completedDate?: string
  status: 'planned' | 'in_progress' | 'completed' | 'skipped'
  area: number
  areaUnit: string
  notes?: string
}

export interface ChemicalStoreItem {
  id: string
  name: string
  activeIngredient: string
  category: string
  batchNumber: string
  quantity: number
  unit: string
  expiryDate: string
  receivedDate: string
  msdsUrl?: string
  status: 'in_stock' | 'low_stock' | 'expired' | 'issued'
  location?: string
}

export interface ChemicalIssue {
  id: string
  itemId: string
  quantity: number
  unit: string
  issuedTo: string
  purpose: string
  issuedDate: string
  issuedBy: string
  approvedBy?: string
  notes?: string
}

export interface ApplicationCapture {
  id: string
  fieldId: string
  programId?: string
  applicationDate: string
  areaCovered: number
  areaUnit: string
  mixRate: string
  operator: string
  supervisor?: string
  chemical: string
  target: string
  weather: {
    temperature?: number
    humidity?: number
    windSpeed?: number
    conditions?: string
  }
  ppeChecklist: {
    completed: boolean
    items: {
      name: string
      status: 'ok' | 'missing' | 'damaged'
      notes?: string
    }[]
  }
  notes?: string
}

export interface REIPHITracking {
  id: string
  fieldId: string
  applicationId: string
  chemical: string
  applicationDate: string
  reEntryInterval: number
  reEntryIntervalUnit: string
  preHarvestInterval: number
  preHarvestIntervalUnit: string
  reEntryAllowedDate: string
  harvestAllowedDate: string
  status: 'active' | 'expired'
}

export interface IncidentReport {
  id: string
  date: string
  type: 'spill' | 'exposure' | 'equipment_failure' | 'other'
  location: string
  fieldId?: string
  reportedBy: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'reported' | 'under_investigation' | 'resolved' | 'closed'
  actionsTaken?: string
  resolvedDate?: string
}

export interface NoSprayZone {
  id: string
  name: string
  fieldId?: string
  coordinates?: number[][]
  type: 'water_body' | 'residential' | 'protected_area' | 'other'
  bufferDistance: number
  bufferUnit: string
  geoLinked: boolean
}

export interface TreeInventory {
  id: string
  fieldId: string
  species: string
  density: number
  unit: string
  lastUpdated: string
  notes?: string
}

export interface HarvestPruningPermit {
  id: string
  type: 'harvest' | 'pruning'
  fieldId: string
  requestedDate: string
  requestedBy: string
  purpose: string
  quantity?: number
  unit?: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  approvedBy?: string
  approvedDate?: string
  legalDocuments?: {
    id: string
    name: string
    url?: string
    uploadedDate: string
  }[]
  completedDate?: string
  notes?: string
}

export interface ConservationArea {
  id: string
  name: string
  type: 'buffer_zone' | 'reforestation_block' | 'protected_area'
  fieldId?: string
  coordinates?: number[][]
  area: number
  areaUnit: string
  establishedDate: string
  status: 'active' | 'planned' | 'completed'
  description?: string
}

export interface TimberFirewoodStock {
  id: string
  type: 'timber' | 'firewood'
  species: string
  quantity: number
  unit: string
  location: string
  source?: string
  dateReceived: string
  status: 'in_stock' | 'issued' | 'sold'
}

export interface TimberFirewoodIssue {
  id: string
  stockId: string
  quantity: number
  unit: string
  issuedTo: string
  purpose: string
  issuedDate: string
  issuedBy: string
  notes?: string
}

export interface TimberFirewoodSale {
  id: string
  stockId: string
  quantity: number
  unit: string
  buyer: string
  price: number
  saleDate: string
  invoiceNumber?: string
  notes?: string
}

export interface ErosionDrainageProject {
  id: string
  name: string
  type: 'bund' | 'drain' | 'culvert' | 'other'
  fieldId: string
  location: string
  coordinates?: number[][]
  status: 'planned' | 'in_progress' | 'completed' | 'maintenance_required'
  startDate?: string
  completedDate?: string
  cost?: number
  description?: string
  geoLinked?: boolean
}

export interface KPI {
  id: string
  label: string
  value: string | number
  change?: number
  trend?: 'up' | 'down' | 'stable'
  icon?: string
}

export interface Activity {
  id: string
  type: string
  description: string
  timestamp: string
  user?: string
  status?: string
}

export interface Production {
  id: string
  date: string
  fieldId: string
  pluckedKg?: number
  latexKg?: number
  harvestOutput?: number
  type: 'tea' | 'rubber' | 'other'
}

export interface Alert {
  id: string
  type: 'low_stock' | 'maintenance' | 'weather' | 'compliance'
  severity: 'low' | 'medium' | 'high'
  title: string
  description: string
  timestamp: string
  status: 'active' | 'resolved'
  category?: string
  itemId?: string
}

export interface Approval {
  id: string
  type: 'purchase' | 'work_plan' | 'overtime' | 'chemical'
  title: string
  description: string
  requestedBy: string
  requestedDate: string
  status: 'pending' | 'approved' | 'rejected'
  amount?: number
  priority: 'low' | 'medium' | 'high'
}

export interface Report {
  id: string
  type: 'estate_performance' | 'field_productivity' | 'labour_efficiency'
  title: string
  period: string
  generatedDate: string
  data: any
}

export interface CostSnapshot {
  id: string
  fieldId?: string
  jobType?: string
  cost: number
  period: string
  breakdown?: {
    labour: number
    materials: number
    machinery: number
  }
}

export interface ScoutingObservation {
  id: string
  fieldId: string
  type: 'weed_pressure' | 'pest_incidence' | 'disease_incidence' | 'nutrient_deficiency'
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  date: string
  observedBy: string
  photos?: string[]
  location?: string
  notes?: string
}

export interface HealthIndexMap {
  id: string
  fieldId: string
  source: 'ndvi' | 'drone' | 'satellite'
  date: string
  healthIndex: number // 0-100
  mapUrl?: string
  zones?: {
    id: string
    coordinates: number[][]
    healthIndex: number
    status: 'healthy' | 'moderate' | 'poor' | 'critical'
  }[]
}

export interface SoilLeafTest {
  id: string
  fieldId: string
  type: 'soil' | 'leaf'
  samplePlan: {
    date: string
    samples: number
    locations: string[]
  }
  labResults?: {
    date: string
    parameters: {
      name: string
      value: number
      unit: string
      status: 'normal' | 'low' | 'high' | 'deficient'
    }[]
  }
  recommendations?: string[]
  status: 'planned' | 'sampled' | 'results_received' | 'recommendations_applied'
}

export interface MonitoringRecommendation {
  id: string
  fieldId: string
  type: 'spray' | 'fertilizer_adjustment' | 'drainage_repair'
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  suggestedAction: string
  estimatedCost?: number
  status: 'pending' | 'approved' | 'assigned' | 'in_progress' | 'completed'
  createdDate: string
  assignedTo?: string
  completedDate?: string
}

export interface MonitoringIssue {
  id: string
  fieldId: string
  observationId?: string
  recommendationId?: string
  title: string
  description: string
  correctiveAction?: string
  assignedTo?: string
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'verified'
  createdDate: string
  dueDate?: string
  completedDate?: string
  verifiedBy?: string
  verifiedDate?: string
}
