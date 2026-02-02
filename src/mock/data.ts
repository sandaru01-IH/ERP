import {
  Organization,
  Crop,
  CropType,
  Person,
  Role,
  WorkTicket,
  Attendance,
  Asset,
  Assignment,
  MaintenanceRecord,
  Store,
  StoreItem,
  Batch,
  Issue,
  FertilizerProgram,
  SprayProgram,
  WeedingProgram,
  ChemicalStoreItem,
  ChemicalIssue,
  ApplicationCapture,
  REIPHITracking,
  IncidentReport,
  NoSprayZone,
  TreeInventory,
  HarvestPruningPermit,
  ConservationArea,
  TimberFirewoodStock,
  TimberFirewoodIssue,
  TimberFirewoodSale,
  ErosionDrainageProject,
  KPI,
  Activity,
  Production,
  Alert,
  Approval,
  Report,
  CostSnapshot,
  CropCalendar,
  CalendarOperation,
  YieldRecord,
  FieldActivity,
  PestDisease,
  FertilizerRecommendation,
  FertilizerRequisition,
  FertilizerApplication,
  FertilizerCosting,
  ScoutingObservation,
  HealthIndexMap,
  SoilLeafTest,
  MonitoringRecommendation,
  MonitoringIssue,
  BreakdownTicket,
  WorkLog,
  FuelIssue,
  SparePartConsumption,
} from '../types'

// Organizations
export const mockOrganizations: Organization[] = [
  {
    id: 'org-1',
    name: 'Suleco Agriculture Group',
    companies: [
      {
        id: 'comp-1',
        name: 'Suleco Estates Ltd',
        regions: [
          {
            id: 'reg-1',
            name: 'Central Highlands',
            estates: [
              {
                id: 'est-1',
                name: 'Green Valley Estate',
                location: 'Nuwara Eliya',
                divisions: [
                  {
                    id: 'div-1',
                    name: 'North Division',
                    fields: [
                      { id: 'field-1', name: 'Field A1', area: 12.5, cropId: 'crop-1' },
                      { id: 'field-2', name: 'Field A2', area: 15.2, cropId: 'crop-2' },
                      { id: 'field-3', name: 'Field A3', area: 8.7, cropId: 'crop-3' },
                    ],
                  },
                  {
                    id: 'div-2',
                    name: 'South Division',
                    fields: [
                      { id: 'field-4', name: 'Field B1', area: 20.1, cropId: 'crop-4' },
                      { id: 'field-5', name: 'Field B2', area: 18.3, cropId: 'crop-5' },
                    ],
                  },
                ],
              },
              {
                id: 'est-2',
                name: 'Mountain View Estate',
                location: 'Kandy',
                divisions: [
                  {
                    id: 'div-3',
                    name: 'East Division',
                    fields: [
                      { id: 'field-6', name: 'Field C1', area: 14.8, cropId: 'crop-6' },
                      { id: 'field-7', name: 'Field C2', area: 11.2, cropId: 'crop-7' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

// Crops
export const mockCrops: Crop[] = [
  { 
    id: 'crop-1', 
    type: 'Tea', 
    variety: 'TRISL 2025', 
    clone: 'TRISL 2025',
    age: 3, 
    ageClass: 'Young',
    plantingCycle: 1, 
    plantingDate: '2021-03-15', 
    fieldId: 'field-1',
    plantPopulation: 12500,
    infillHistory: [
      { id: 'infill-1', date: '2022-05-10', quantity: 50, reason: 'Gap filling' },
    ],
    replantHistory: [],
  },
  { 
    id: 'crop-2', 
    type: 'Tea', 
    variety: 'TRISL 2025', 
    clone: 'TRISL 2025',
    age: 5, 
    ageClass: 'Mature',
    plantingCycle: 2, 
    plantingDate: '2019-05-20', 
    fieldId: 'field-2',
    plantPopulation: 15000,
    infillHistory: [],
    replantHistory: [
      { id: 'replant-1', date: '2020-03-15', area: 0.5, reason: 'Disease affected area' },
    ],
  },
  { 
    id: 'crop-3', 
    type: 'Tea', 
    variety: 'TRISL 2026', 
    clone: 'TRISL 2026',
    age: 2, 
    ageClass: 'Young',
    plantingCycle: 1, 
    plantingDate: '2022-07-10', 
    fieldId: 'field-3',
    plantPopulation: 12000,
    infillHistory: [],
    replantHistory: [],
  },
  { 
    id: 'crop-4', 
    type: 'Rubber', 
    variety: 'RRIC 100', 
    clone: 'RRIC 100',
    age: 8, 
    ageClass: 'Mature',
    plantingCycle: 1, 
    plantingDate: '2016-01-12', 
    fieldId: 'field-4',
    plantPopulation: 400,
    infillHistory: [],
    replantHistory: [],
  },
  { 
    id: 'crop-5', 
    type: 'Rubber', 
    variety: 'RRIC 121', 
    clone: 'RRIC 121',
    age: 6, 
    ageClass: 'Mature',
    plantingCycle: 1, 
    plantingDate: '2018-02-28', 
    fieldId: 'field-5',
    plantPopulation: 450,
    infillHistory: [],
    replantHistory: [],
  },
]

export const mockCropTypes: CropType[] = [
  {
    id: 'type-1',
    name: 'Tea',
    varieties: [
      { id: 'var-1', name: 'TRISL 2025' },
      { id: 'var-2', name: 'TRISL 2026' },
      { id: 'var-3', name: 'TRISL 2027' },
    ],
  },
  {
    id: 'type-2',
    name: 'Rubber',
    varieties: [
      { id: 'var-4', name: 'RRIC 100' },
      { id: 'var-5', name: 'RRIC 121' },
      { id: 'var-6', name: 'RRIC 130' },
    ],
  },
]

// People & Roles
export const mockRoles: Role[] = [
  { id: 'role-1', name: 'Director', permissions: ['view_all', 'approve_budget', 'view_reports'] },
  { id: 'role-2', name: 'Estate Manager', permissions: ['view_estate', 'approve_operations', 'manage_teams'] },
  { id: 'role-3', name: 'Superintendent', permissions: ['create_tickets', 'monitor_fields', 'assign_tasks'] },
  { id: 'role-4', name: 'Field Officer', permissions: ['create_observations', 'update_records'] },
  { id: 'role-5', name: 'Storekeeper', permissions: ['manage_inventory', 'issue_items'] },
  { id: 'role-6', name: 'Labour', permissions: ['view_tasks', 'confirm_completion'] },
]

export const mockPeople: Person[] = [
  { id: 'person-1', name: 'John Silva', roleId: 'role-1', email: 'john@example.com', phone: '+94 77 123 4567' },
  { id: 'person-2', name: 'Maria Perera', roleId: 'role-2', email: 'maria@example.com', phone: '+94 77 234 5678' },
  { id: 'person-3', name: 'David Fernando', roleId: 'role-3', email: 'david@example.com', phone: '+94 77 345 6789' },
  { id: 'person-4', name: 'Sarah Jayawardena', roleId: 'role-4', email: 'sarah@example.com', phone: '+94 77 456 7890' },
  { id: 'person-5', name: 'Kamal Wickramasinghe', roleId: 'role-5', email: 'kamal@example.com', phone: '+94 77 567 8901' },
  { id: 'person-6', name: 'Priya Mendis', roleId: 'role-6' },
  { id: 'person-7', name: 'Rohan De Silva', roleId: 'role-6' },
  { id: 'person-8', name: 'Nimal Karunaratne', roleId: 'role-6' },
]

// Work Tickets
export const mockWorkTickets: WorkTicket[] = [
  { id: 'ticket-1', date: '2024-01-15', fieldId: 'field-1', activity: 'Plucking', labourHours: 8, cost: 12000, status: 'completed' },
  { id: 'ticket-2', date: '2024-01-15', fieldId: 'field-2', activity: 'Weeding', labourHours: 6, cost: 9000, status: 'completed' },
  { id: 'ticket-3', date: '2024-01-16', fieldId: 'field-3', activity: 'Pruning', labourHours: 10, cost: 15000, status: 'approved' },
  { id: 'ticket-4', date: '2024-01-16', fieldId: 'field-4', activity: 'Tapping', labourHours: 4, cost: 6000, status: 'pending' },
  { id: 'ticket-5', date: '2024-01-17', fieldId: 'field-5', activity: 'Mulching', labourHours: 7, cost: 10500, status: 'completed' },
]

// Attendance
export const mockAttendance: Attendance[] = [
  { id: 'att-1', personId: 'person-6', date: '2024-01-15', checkIn: '06:00', checkOut: '14:00', status: 'present' },
  { id: 'att-2', personId: 'person-7', date: '2024-01-15', checkIn: '06:15', checkOut: '14:15', status: 'present' },
  { id: 'att-3', personId: 'person-8', date: '2024-01-15', checkIn: '07:00', status: 'late' },
  { id: 'att-4', personId: 'person-6', date: '2024-01-16', checkIn: '06:00', checkOut: '14:00', status: 'present' },
  { id: 'att-5', personId: 'person-7', date: '2024-01-16', checkIn: '', status: 'absent' },
]

// Assets
export const mockAssets: Asset[] = [
  {
    id: 'asset-1',
    name: 'Tractor T-101',
    type: 'machine',
    category: 'Tractor',
    status: 'active',
    assignments: [
      { id: 'assign-1', assetId: 'asset-1', fieldId: 'field-1', startDate: '2024-01-10', status: 'active' },
    ],
    maintenanceHistory: [
      {
        id: 'maint-1',
        assetId: 'asset-1',
        type: 'preventive',
        date: '2024-01-01',
        description: 'Regular service',
        cost: 15000,
        nextDueDate: '2024-04-01',
        serviceHours: 500,
        spareParts: [
          { id: 'part-1', partName: 'Engine Oil Filter', quantity: 1, unit: 'piece', cost: 2500, issuedBy: 'Storekeeper A', issuedDate: '2024-01-01' },
          { id: 'part-2', partName: 'Hydraulic Oil', quantity: 20, unit: 'L', cost: 8000, issuedBy: 'Storekeeper A', issuedDate: '2024-01-01' },
        ],
      },
    ],
  },
  {
    id: 'asset-2',
    name: 'Sprayer SP-205',
    type: 'machine',
    category: 'Sprayer',
    status: 'active',
    assignments: [
      { id: 'assign-2', assetId: 'asset-2', fieldId: 'field-2', startDate: '2024-01-12', status: 'active' },
    ],
    maintenanceHistory: [
      {
        id: 'maint-2',
        assetId: 'asset-2',
        type: 'breakdown',
        date: '2024-01-05',
        description: 'Pump repair',
        cost: 25000,
        spareParts: [
          { id: 'part-3', partName: 'Pump Seal Kit', quantity: 1, unit: 'kit', cost: 15000, issuedBy: 'Storekeeper B', issuedDate: '2024-01-05' },
        ],
      },
    ],
  },
  {
    id: 'asset-3',
    name: 'Pickup Truck PU-301',
    type: 'vehicle',
    category: 'Vehicle',
    status: 'active',
    assignments: [],
    maintenanceHistory: [],
  },
  {
    id: 'asset-4',
    name: 'Excavator EX-401',
    type: 'machine',
    category: 'Excavator',
    status: 'active',
    assignments: [
      { id: 'assign-3', assetId: 'asset-4', fieldId: 'field-3', startDate: '2024-01-15', status: 'active' },
    ],
    maintenanceHistory: [
      {
        id: 'maint-3',
        assetId: 'asset-4',
        type: 'preventive',
        date: '2024-01-10',
        description: 'Scheduled maintenance',
        cost: 30000,
        nextDueDate: '2024-05-10',
        serviceHours: 1000,
      },
    ],
  },
  {
    id: 'asset-5',
    name: 'Pruning Shears Set',
    type: 'tool',
    category: 'Tools',
    status: 'active',
    assignments: [],
    maintenanceHistory: [],
  },
]

// Work Logs
export const mockWorkLogs: WorkLog[] = [
  {
    id: 'log-1',
    assetId: 'asset-1',
    date: '2024-01-20',
    operator: 'Driver A',
    hours: 8,
    distance: 45,
    output: 12,
    outputUnit: 'hectares sprayed',
    task: 'Spraying operation',
    fieldId: 'field-1',
    notes: 'Completed spraying in Field A1',
    preStartChecklist: {
      completed: true,
      items: [
        { name: 'Engine oil level', status: 'ok' },
        { name: 'Hydraulic fluid', status: 'ok' },
        { name: 'Tires pressure', status: 'ok' },
        { name: 'Lights and signals', status: 'ok' },
      ],
    },
  },
  {
    id: 'log-2',
    assetId: 'asset-2',
    date: '2024-01-19',
    operator: 'Driver B',
    hours: 6,
    output: 8,
    outputUnit: 'hectares sprayed',
    task: 'Fertilizer application',
    fieldId: 'field-2',
    preStartChecklist: {
      completed: true,
      items: [
        { name: 'Sprayer tank condition', status: 'ok' },
        { name: 'Nozzles check', status: 'needs_attention', notes: 'One nozzle partially blocked' },
        { name: 'Pump operation', status: 'ok' },
      ],
    },
  },
  {
    id: 'log-3',
    assetId: 'asset-3',
    date: '2024-01-18',
    operator: 'Driver C',
    hours: 4,
    distance: 120,
    task: 'Transportation',
    notes: 'Delivered supplies to division store',
  },
]

// Breakdown Tickets
export const mockBreakdownTickets: BreakdownTicket[] = [
  {
    id: 'ticket-1',
    assetId: 'asset-2',
    reportedDate: '2024-01-05',
    reportedBy: 'Driver B',
    description: 'Pump failure during spraying operation',
    priority: 'urgent',
    status: 'completed',
    assignedTo: 'Mechanical Engineer A',
    completedDate: '2024-01-06',
    resolution: 'Replaced pump seal kit, tested and operational',
    cost: 25000,
  },
  {
    id: 'ticket-2',
    assetId: 'asset-1',
    reportedDate: '2024-01-15',
    reportedBy: 'Driver A',
    description: 'Hydraulic leak detected',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Workshop Officer B',
  },
  {
    id: 'ticket-3',
    assetId: 'asset-4',
    reportedDate: '2024-01-20',
    reportedBy: 'Operator D',
    description: 'Engine overheating issue',
    priority: 'high',
    status: 'reported',
  },
]

// Fuel Issues
export const mockFuelIssues: FuelIssue[] = [
  {
    id: 'fuel-1',
    assetId: 'asset-1',
    date: '2024-01-20',
    quantity: 50,
    unit: 'L',
    cost: 12500,
    issuedBy: 'Storekeeper A',
    issuedTo: 'Driver A',
    purpose: 'Field operations',
    odometerReading: 12500,
    reconciled: true,
    reconciledDate: '2024-01-20',
    reconciledBy: 'Storekeeper A',
  },
  {
    id: 'fuel-2',
    assetId: 'asset-2',
    date: '2024-01-19',
    quantity: 30,
    unit: 'L',
    cost: 7500,
    issuedBy: 'Storekeeper A',
    issuedTo: 'Driver B',
    purpose: 'Spraying operation',
    odometerReading: 8500,
    reconciled: false,
  },
  {
    id: 'fuel-3',
    assetId: 'asset-3',
    date: '2024-01-18',
    quantity: 40,
    unit: 'L',
    cost: 10000,
    issuedBy: 'Storekeeper B',
    issuedTo: 'Driver C',
    purpose: 'Transportation',
    odometerReading: 15200,
    reconciled: true,
    reconciledDate: '2024-01-19',
    reconciledBy: 'Storekeeper B',
  },
]

// Stores
export const mockStores: Store[] = [
  {
    id: 'store-1',
    name: 'Central Store',
    location: 'Green Valley Estate',
    items: [
      {
        id: 'item-1',
        name: 'Urea Fertilizer',
        category: 'Fertilizer',
        unit: 'kg',
        totalQuantity: 5000,
        batches: [
          { id: 'batch-1', itemId: 'item-1', batchNumber: 'UR-2024-001', quantity: 2000, location: 'Shelf A1', status: 'available' },
          { id: 'batch-2', itemId: 'item-1', batchNumber: 'UR-2024-002', quantity: 3000, location: 'Shelf A2', status: 'available' },
        ],
      },
      {
        id: 'item-2',
        name: 'Glyphosate',
        category: 'Herbicide',
        unit: 'L',
        totalQuantity: 200,
        batches: [
          { id: 'batch-3', itemId: 'item-2', batchNumber: 'GLY-2024-001', quantity: 100, expiryDate: '2025-12-31', location: 'Chemical Store', status: 'available' },
          { id: 'batch-4', itemId: 'item-2', batchNumber: 'GLY-2024-002', quantity: 100, expiryDate: '2025-12-31', location: 'Chemical Store', status: 'reserved' },
        ],
      },
      {
        id: 'item-3',
        name: 'Diesel',
        category: 'Fuel',
        unit: 'L',
        totalQuantity: 5000,
        batches: [
          { id: 'batch-5', itemId: 'item-3', batchNumber: 'DSL-2024-001', quantity: 5000, location: 'Fuel Tank', status: 'available' },
        ],
      },
    ],
  },
]

export const mockIssues: Issue[] = [
  { id: 'issue-1', batchId: 'batch-1', quantity: 500, date: '2024-01-10', issuedTo: 'Field A1', purpose: 'Fertilizer application' },
  { id: 'issue-2', batchId: 'batch-3', quantity: 20, date: '2024-01-12', issuedTo: 'Spray Team', purpose: 'Weed control' },
]

// Fertilizer Programs
export const mockFertilizerPrograms: FertilizerProgram[] = [
  { id: 'fert-1', fieldId: 'field-1', product: 'Urea', dose: 200, round: 1, scheduledDate: '2024-01-20', status: 'planned', cost: 15000 },
  { id: 'fert-2', fieldId: 'field-2', product: 'NPK 15-15-15', dose: 250, round: 1, scheduledDate: '2024-01-18', appliedDate: '2024-01-18', status: 'applied', cost: 20000 },
  { id: 'fert-3', fieldId: 'field-3', product: 'Urea', dose: 180, round: 2, scheduledDate: '2024-01-22', status: 'planned', cost: 13500 },
  { id: 'fert-4', fieldId: 'field-1', product: 'NPK 15-15-15', dose: 220, round: 2, scheduledDate: '2024-02-15', status: 'planned', cost: 18000 },
  { id: 'fert-5', fieldId: 'field-4', product: 'Urea', dose: 190, round: 1, scheduledDate: '2024-01-25', status: 'planned', cost: 14250 },
  { id: 'fert-6', fieldId: 'field-2', product: 'Potassium Sulphate', dose: 150, round: 3, scheduledDate: '2024-03-10', status: 'planned', cost: 12000 },
]

// Fertilizer Recommendations
export const mockFertilizerRecommendations: FertilizerRecommendation[] = [
  { id: 'rec-1', fieldId: 'field-1', product: 'Urea', recommendedRate: 200, basis: 'soil_test', soilTestDate: '2024-01-05', notes: 'Low nitrogen levels detected' },
  { id: 'rec-2', fieldId: 'field-2', product: 'NPK 15-15-15', recommendedRate: 250, basis: 'zone', zone: 'High fertility zone', notes: 'Based on zone analysis' },
  { id: 'rec-3', fieldId: 'field-3', product: 'Urea', recommendedRate: 180, basis: 'crop_age', cropAge: 3, notes: 'Young crop - reduced rate' },
  { id: 'rec-4', fieldId: 'field-4', product: 'NPK 15-15-15', recommendedRate: 230, basis: 'soil_test', soilTestDate: '2024-01-08', notes: 'Balanced nutrients required' },
  { id: 'rec-5', fieldId: 'field-1', product: 'Potassium Sulphate', recommendedRate: 150, basis: 'crop_age', cropAge: 5, notes: 'Mature crop - potassium boost' },
]

// Fertilizer Requisitions
export const mockFertilizerRequisitions: FertilizerRequisition[] = [
  { id: 'req-1', type: 'central_store', product: 'Urea', quantity: 5000, unit: 'kg', requestedBy: 'John Doe', requestedDate: '2024-01-10', status: 'approved', issuedDate: '2024-01-12', issuedTo: 'Division Store A', batchNumber: 'BATCH-001' },
  { id: 'req-2', type: 'supplier', product: 'NPK 15-15-15', quantity: 3000, unit: 'kg', requestedBy: 'Jane Smith', requestedDate: '2024-01-15', status: 'pending' },
  { id: 'req-3', type: 'division_store', product: 'Urea', quantity: 1000, unit: 'kg', requestedBy: 'Bob Wilson', requestedDate: '2024-01-18', status: 'issued', issuedDate: '2024-01-19', issuedTo: 'Field Team 1', batchNumber: 'BATCH-002', jobTicketId: 'JT-001' },
  { id: 'req-4', type: 'field', product: 'NPK 15-15-15', quantity: 500, unit: 'kg', requestedBy: 'Alice Brown', requestedDate: '2024-01-20', status: 'approved', jobTicketId: 'JT-002' },
  { id: 'req-5', type: 'central_store', product: 'Potassium Sulphate', quantity: 2000, unit: 'kg', requestedBy: 'Charlie Davis', requestedDate: '2024-01-22', status: 'pending' },
]

// Fertilizer Applications
export const mockFertilizerApplications: FertilizerApplication[] = [
  { id: 'app-1', fieldId: 'field-1', product: 'Urea', rate: 200, date: '2024-01-18', labour: ['Worker 1', 'Worker 2', 'Worker 3'], supervisor: 'Supervisor A', weatherCheck: { passed: true, temperature: 25, rainfall: 0, windSpeed: 5, notes: 'Ideal conditions' }, batchNumber: 'BATCH-001', status: 'completed' },
  { id: 'app-2', fieldId: 'field-2', product: 'NPK 15-15-15', rate: 250, date: '2024-01-19', labour: ['Worker 4', 'Worker 5'], supervisor: 'Supervisor B', weatherCheck: { passed: true, temperature: 23, rainfall: 0, windSpeed: 3, notes: 'Good weather' }, batchNumber: 'BATCH-002', status: 'completed' },
  { id: 'app-3', fieldId: 'field-3', product: 'Urea', rate: 180, date: '2024-01-20', labour: ['Worker 6', 'Worker 7', 'Worker 8'], supervisor: 'Supervisor A', weatherCheck: { passed: false, temperature: 28, rainfall: 0, windSpeed: 15, notes: 'High wind - postponed' }, status: 'pending_validation' },
  { id: 'app-4', fieldId: 'field-4', product: 'NPK 15-15-15', rate: 230, date: '2024-01-21', labour: ['Worker 9', 'Worker 10'], supervisor: 'Supervisor C', weatherCheck: { passed: true, temperature: 24, rainfall: 0, windSpeed: 4, notes: 'Optimal conditions' }, batchNumber: 'BATCH-003', status: 'completed' },
]

// Fertilizer Costing
export const mockFertilizerCosting: FertilizerCosting[] = [
  { id: 'cost-1', fieldId: 'field-1', period: 'January 2024', plannedCost: 15000, actualCost: 14800, variance: -200, variancePercent: -1.33, applications: 1, batchTraceability: [{ batchNumber: 'BATCH-001', product: 'Urea', quantity: 200, cost: 14800 }] },
  { id: 'cost-2', fieldId: 'field-2', period: 'January 2024', plannedCost: 20000, actualCost: 20500, variance: 500, variancePercent: 2.5, applications: 1, batchTraceability: [{ batchNumber: 'BATCH-002', product: 'NPK 15-15-15', quantity: 250, cost: 20500 }] },
  { id: 'cost-3', fieldId: 'field-3', period: 'January 2024', plannedCost: 13500, actualCost: 0, variance: -13500, variancePercent: -100, applications: 0, batchTraceability: [] },
  { id: 'cost-4', fieldId: 'field-4', period: 'January 2024', plannedCost: 17250, actualCost: 17500, variance: 250, variancePercent: 1.45, applications: 1, batchTraceability: [{ batchNumber: 'BATCH-003', product: 'NPK 15-15-15', quantity: 230, cost: 17500 }] },
]

// Spray Programs
export const mockSprayPrograms: SprayProgram[] = [
  {
    id: 'spray-1',
    fieldId: 'field-1',
    targetPestWeed: 'Tea Mosquito Bug',
    chemical: 'Dimethoate',
    dose: 1.5,
    doseUnit: 'L/ha',
    frequency: 'Every 14 days',
    scheduledDate: '2024-01-25',
    status: 'planned',
    compliance: {
      reEntryInterval: 24,
      preHarvestInterval: 7,
      ppeRequired: ['Gloves', 'Mask', 'Coverall'],
    },
  },
  {
    id: 'spray-2',
    fieldId: 'field-2',
    targetPestWeed: 'Weeds',
    chemical: 'Glyphosate',
    dose: 2.0,
    doseUnit: 'L/ha',
    frequency: 'As needed',
    scheduledDate: '2024-01-15',
    appliedDate: '2024-01-15',
    status: 'applied',
    compliance: {
      reEntryInterval: 12,
      preHarvestInterval: 0,
      ppeRequired: ['Gloves', 'Mask'],
    },
  },
  {
    id: 'spray-3',
    fieldId: 'field-3',
    targetPestWeed: 'Fungal Disease',
    chemical: 'Copper Oxychloride',
    dose: 3.0,
    doseUnit: 'kg/ha',
    frequency: 'Every 21 days',
    scheduledDate: '2024-01-28',
    status: 'planned',
    compliance: {
      reEntryInterval: 48,
      preHarvestInterval: 14,
      ppeRequired: ['Gloves', 'Mask', 'Coverall', 'Goggles'],
    },
  },
]

// Weeding Programs
export const mockWeedingPrograms: WeedingProgram[] = [
  {
    id: 'weed-1',
    fieldId: 'field-1',
    type: 'manual',
    method: 'Hand weeding',
    scheduledDate: '2024-01-20',
    status: 'completed',
    completedDate: '2024-01-20',
    area: 5.0,
    areaUnit: 'ha',
    notes: 'Completed by 10 workers',
  },
  {
    id: 'weed-2',
    fieldId: 'field-2',
    type: 'mechanical',
    method: 'Tractor-mounted weeder',
    scheduledDate: '2024-01-22',
    status: 'in_progress',
    area: 8.5,
    areaUnit: 'ha',
  },
  {
    id: 'weed-3',
    fieldId: 'field-3',
    type: 'chemical',
    method: 'Herbicide application',
    scheduledDate: '2024-01-25',
    status: 'planned',
    area: 12.0,
    areaUnit: 'ha',
  },
]

// Chemical Store Items
export const mockChemicalStoreItems: ChemicalStoreItem[] = [
  {
    id: 'chem-1',
    name: 'Dimethoate 40% EC',
    activeIngredient: 'Dimethoate',
    category: 'Insecticide',
    batchNumber: 'BATCH-2024-001',
    quantity: 150,
    unit: 'L',
    expiryDate: '2025-06-30',
    receivedDate: '2024-01-10',
    msdsUrl: '/msds/dimethoate.pdf',
    status: 'in_stock',
    location: 'Store A - Shelf 3',
  },
  {
    id: 'chem-2',
    name: 'Glyphosate 41% SL',
    activeIngredient: 'Glyphosate',
    category: 'Herbicide',
    batchNumber: 'BATCH-2024-002',
    quantity: 200,
    unit: 'L',
    expiryDate: '2025-12-31',
    receivedDate: '2024-01-12',
    msdsUrl: '/msds/glyphosate.pdf',
    status: 'in_stock',
    location: 'Store A - Shelf 1',
  },
  {
    id: 'chem-3',
    name: 'Copper Oxychloride 50% WP',
    activeIngredient: 'Copper Oxychloride',
    category: 'Fungicide',
    batchNumber: 'BATCH-2024-003',
    quantity: 50,
    unit: 'kg',
    expiryDate: '2025-03-15',
    receivedDate: '2024-01-08',
    msdsUrl: '/msds/copper.pdf',
    status: 'low_stock',
    location: 'Store B - Shelf 2',
  },
]

// Chemical Issues
export const mockChemicalIssues: ChemicalIssue[] = [
  {
    id: 'issue-1',
    itemId: 'chem-1',
    quantity: 25,
    unit: 'L',
    issuedTo: 'Spray Team A',
    purpose: 'Field 1 spraying operation',
    issuedDate: '2024-01-20',
    issuedBy: 'Chemical Storekeeper A',
    approvedBy: 'Estate Manager',
  },
  {
    id: 'issue-2',
    itemId: 'chem-2',
    quantity: 30,
    unit: 'L',
    issuedTo: 'Spray Team B',
    purpose: 'Weed control - Field 2',
    issuedDate: '2024-01-18',
    issuedBy: 'Chemical Storekeeper B',
  },
]

// Application Capture
export const mockApplicationCaptures: ApplicationCapture[] = [
  {
    id: 'app-1',
    fieldId: 'field-1',
    programId: 'spray-1',
    applicationDate: '2024-01-20',
    areaCovered: 5.0,
    areaUnit: 'ha',
    mixRate: '1.5 L per 200L water',
    operator: 'Operator A',
    supervisor: 'Spray Officer B',
    chemical: 'Dimethoate',
    target: 'Tea Mosquito Bug',
    weather: {
      temperature: 28,
      humidity: 65,
      windSpeed: 8,
      conditions: 'Clear',
    },
    ppeChecklist: {
      completed: true,
      items: [
        { name: 'Gloves', status: 'ok' },
        { name: 'Mask', status: 'ok' },
        { name: 'Coverall', status: 'ok' },
        { name: 'Goggles', status: 'ok' },
      ],
    },
    notes: 'Application completed successfully',
  },
  {
    id: 'app-2',
    fieldId: 'field-2',
    programId: 'spray-2',
    applicationDate: '2024-01-15',
    areaCovered: 8.5,
    areaUnit: 'ha',
    mixRate: '2.0 L per 200L water',
    operator: 'Operator B',
    chemical: 'Glyphosate',
    target: 'Weeds',
    weather: {
      temperature: 30,
      humidity: 55,
      windSpeed: 5,
      conditions: 'Partly cloudy',
    },
    ppeChecklist: {
      completed: true,
      items: [
        { name: 'Gloves', status: 'ok' },
        { name: 'Mask', status: 'ok' },
        { name: 'Coverall', status: 'damaged', notes: 'Minor tear, replaced' },
      ],
    },
  },
]

// REI/PHI Tracking
export const mockREIPHITracking: REIPHITracking[] = [
  {
    id: 'rei-1',
    fieldId: 'field-1',
    applicationId: 'app-1',
    chemical: 'Dimethoate',
    applicationDate: '2024-01-20',
    reEntryInterval: 24,
    reEntryIntervalUnit: 'hours',
    preHarvestInterval: 7,
    preHarvestIntervalUnit: 'days',
    reEntryAllowedDate: '2024-01-21',
    harvestAllowedDate: '2024-01-27',
    status: 'active',
  },
  {
    id: 'rei-2',
    fieldId: 'field-2',
    applicationId: 'app-2',
    chemical: 'Glyphosate',
    applicationDate: '2024-01-15',
    reEntryInterval: 12,
    reEntryIntervalUnit: 'hours',
    preHarvestInterval: 0,
    preHarvestIntervalUnit: 'days',
    reEntryAllowedDate: '2024-01-16',
    harvestAllowedDate: '2024-01-15',
    status: 'expired',
  },
]

// Incident Reports
export const mockIncidentReports: IncidentReport[] = [
  {
    id: 'inc-1',
    date: '2024-01-18',
    type: 'spill',
    location: 'Field 2 - Spraying area',
    fieldId: 'field-2',
    reportedBy: 'Operator C',
    description: 'Minor chemical spill during mixing, contained immediately',
    severity: 'low',
    status: 'resolved',
    actionsTaken: 'Area cleaned, PPE checked, no exposure',
    resolvedDate: '2024-01-18',
  },
  {
    id: 'inc-2',
    date: '2024-01-22',
    type: 'equipment_failure',
    location: 'Field 3',
    fieldId: 'field-3',
    reportedBy: 'Spray Officer A',
    description: 'Sprayer pump malfunction during operation',
    severity: 'medium',
    status: 'under_investigation',
  },
]

// No-Spray Zones
export const mockNoSprayZones: NoSprayZone[] = [
  {
    id: 'zone-1',
    name: 'Stream Buffer Zone - North',
    fieldId: 'field-1',
    type: 'water_body',
    bufferDistance: 10,
    bufferUnit: 'meters',
    geoLinked: true,
  },
  {
    id: 'zone-2',
    name: 'Residential Buffer - East',
    type: 'residential',
    bufferDistance: 50,
    bufferUnit: 'meters',
    geoLinked: true,
  },
  {
    id: 'zone-3',
    name: 'Protected Wetland Area',
    type: 'protected_area',
    bufferDistance: 100,
    bufferUnit: 'meters',
    geoLinked: true,
  },
]

// Forestry - Tree Inventory
export const mockTreeInventory: TreeInventory[] = [
  {
    id: 'tree-inv-1',
    fieldId: 'field-1',
    species: 'Grevillea robusta',
    density: 120,
    unit: 'trees/ha',
    lastUpdated: '2024-01-15',
    notes: 'Well established shade trees',
  },
  {
    id: 'tree-inv-2',
    fieldId: 'field-2',
    species: 'Erythrina indica',
    density: 95,
    unit: 'trees/ha',
    lastUpdated: '2024-01-10',
    notes: 'Some trees need replacement',
  },
  {
    id: 'tree-inv-3',
    fieldId: 'field-3',
    species: 'Albizia lebbeck',
    density: 110,
    unit: 'trees/ha',
    lastUpdated: '2024-01-12',
  },
]

// Forestry - Harvest/Pruning Permits
export const mockHarvestPruningPermits: HarvestPruningPermit[] = [
  {
    id: 'permit-1',
    type: 'harvest',
    fieldId: 'field-1',
    requestedDate: '2024-01-10',
    requestedBy: 'Forestry Officer A',
    purpose: 'Selective timber harvest for estate use',
    quantity: 15,
    unit: 'trees',
    status: 'approved',
    approvedBy: 'Estate Manager',
    approvedDate: '2024-01-12',
    legalDocuments: [
      {
        id: 'doc-1',
        name: 'Harvest Permit - Forest Department',
        url: '/documents/permit-1.pdf',
        uploadedDate: '2024-01-12',
      },
    ],
  },
  {
    id: 'permit-2',
    type: 'pruning',
    fieldId: 'field-2',
    requestedDate: '2024-01-18',
    requestedBy: 'Superintendent B',
    purpose: 'Routine shade tree pruning',
    quantity: 50,
    unit: 'trees',
    status: 'pending',
  },
  {
    id: 'permit-3',
    type: 'harvest',
    fieldId: 'field-3',
    requestedDate: '2024-01-20',
    requestedBy: 'Forestry Officer C',
    purpose: 'Firewood for estate use',
    quantity: 20,
    unit: 'trees',
    status: 'approved',
    approvedBy: 'Estate Manager',
    approvedDate: '2024-01-21',
  },
]

// Forestry - Conservation Areas
export const mockConservationAreas: ConservationArea[] = [
  {
    id: 'cons-1',
    name: 'Riparian Buffer Zone - North Stream',
    type: 'buffer_zone',
    fieldId: 'field-1',
    area: 2.5,
    areaUnit: 'ha',
    establishedDate: '2023-06-01',
    status: 'active',
    description: 'Protected buffer zone along stream to prevent erosion',
  },
  {
    id: 'cons-2',
    name: 'Reforestation Block A',
    type: 'reforestation_block',
    fieldId: 'field-4',
    area: 5.0,
    areaUnit: 'ha',
    establishedDate: '2023-08-15',
    status: 'active',
    description: 'Native species reforestation project',
  },
  {
    id: 'cons-3',
    name: 'Protected Wetland Area',
    type: 'protected_area',
    area: 1.2,
    areaUnit: 'ha',
    establishedDate: '2022-03-10',
    status: 'active',
    description: 'Wetland conservation area',
  },
]

// Forestry - Timber/Firewood Stock
export const mockTimberFirewoodStock: TimberFirewoodStock[] = [
  {
    id: 'stock-1',
    type: 'timber',
    species: 'Teak',
    quantity: 45,
    unit: 'cubic meters',
    location: 'Central Timber Yard',
    source: 'Field 1 Harvest',
    dateReceived: '2024-01-15',
    status: 'in_stock',
  },
  {
    id: 'stock-2',
    type: 'firewood',
    species: 'Mixed Hardwood',
    quantity: 120,
    unit: 'cubic meters',
    location: 'Firewood Storage',
    source: 'Field 3 Harvest',
    dateReceived: '2024-01-20',
    status: 'in_stock',
  },
  {
    id: 'stock-3',
    type: 'timber',
    species: 'Mahogany',
    quantity: 8,
    unit: 'cubic meters',
    location: 'Central Timber Yard',
    source: 'Field 2 Harvest',
    dateReceived: '2024-01-10',
    status: 'issued',
  },
]

// Forestry - Timber/Firewood Issues
export const mockTimberFirewoodIssues: TimberFirewoodIssue[] = [
  {
    id: 'issue-1',
    stockId: 'stock-3',
    quantity: 8,
    unit: 'cubic meters',
    issuedTo: 'Estate Maintenance',
    purpose: 'Building construction',
    issuedDate: '2024-01-22',
    issuedBy: 'Storekeeper A',
    notes: 'For new office building',
  },
  {
    id: 'issue-2',
    stockId: 'stock-2',
    quantity: 10,
    unit: 'cubic meters',
    issuedTo: 'Labour Quarters',
    purpose: 'Cooking fuel',
    issuedDate: '2024-01-21',
    issuedBy: 'Storekeeper B',
  },
]

// Forestry - Timber/Firewood Sales
export const mockTimberFirewoodSales: TimberFirewoodSale[] = [
  {
    id: 'sale-1',
    stockId: 'stock-1',
    quantity: 20,
    unit: 'cubic meters',
    buyer: 'Local Timber Merchant',
    price: 250000,
    saleDate: '2024-01-18',
    invoiceNumber: 'INV-2024-001',
    notes: 'Teak timber sale',
  },
]

// Forestry - Erosion/Drainage Projects
export const mockErosionDrainageProjects: ErosionDrainageProject[] = [
  {
    id: 'proj-1',
    name: 'Field A1 Bund Construction',
    type: 'bund',
    fieldId: 'field-1',
    location: 'North slope of Field A1',
    status: 'completed',
    startDate: '2024-01-05',
    completedDate: '2024-01-15',
    cost: 150000,
    description: 'Soil bund construction to prevent erosion',
    geoLinked: true,
  },
  {
    id: 'proj-2',
    name: 'Main Drainage Channel - Field B2',
    type: 'drain',
    fieldId: 'field-2',
    location: 'Eastern boundary',
    status: 'in_progress',
    startDate: '2024-01-20',
    cost: 200000,
    description: 'Deepening and widening drainage channel',
    geoLinked: true,
  },
  {
    id: 'proj-3',
    name: 'Culvert Installation - Access Road',
    type: 'culvert',
    fieldId: 'field-3',
    location: 'Main access road crossing',
    status: 'planned',
    cost: 80000,
    description: 'Install culvert for proper water flow',
    geoLinked: true,
  },
]

// Helper functions
export function getAllFields(): any[] {
  const fields: any[] = []
  mockOrganizations.forEach(org =>
    org.companies.forEach(comp =>
      comp.regions.forEach(reg =>
        reg.estates.forEach(est =>
          est.divisions.forEach(div =>
            div.fields.forEach(field => {
              fields.push({
                ...field,
                estateId: est.id,
                estateName: est.name,
                divisionId: div.id,
                divisionName: div.name,
              })
            })
          )
        )
      )
    )
  )
  return fields
}

export function getFieldById(id: string): any {
  return getAllFields().find(f => f.id === id)
}

export function getCropByFieldId(fieldId: string): Crop | undefined {
  return mockCrops.find(c => c.fieldId === fieldId)
}

export function getEstateById(id: string): any {
  for (const org of mockOrganizations) {
    for (const comp of org.companies) {
      for (const reg of comp.regions) {
        const estate = reg.estates.find(e => e.id === id)
        if (estate) return estate
      }
    }
  }
  return null
}

// Production Data
export const mockProduction: Production[] = [
  { id: 'prod-1', date: '2024-01-15', fieldId: 'field-1', pluckedKg: 1250, type: 'tea' },
  { id: 'prod-2', date: '2024-01-15', fieldId: 'field-2', pluckedKg: 1800, type: 'tea' },
  { id: 'prod-3', date: '2024-01-15', fieldId: 'field-4', latexKg: 450, type: 'rubber' },
  { id: 'prod-4', date: '2024-01-16', fieldId: 'field-5', latexKg: 520, type: 'rubber' },
]

// Alerts
export const mockAlerts: Alert[] = [
  { id: 'alert-1', type: 'low_stock', severity: 'high', title: 'Low Stock: Urea Fertilizer', description: 'Urea Fertilizer stock below 1000kg threshold', timestamp: new Date().toISOString(), status: 'active', category: 'Fertilizer', itemId: 'item-1' },
  { id: 'alert-2', type: 'maintenance', severity: 'medium', title: 'Overdue Maintenance: Tractor T-101', description: 'Preventive maintenance due 3 days ago', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'active' },
  { id: 'alert-3', type: 'weather', severity: 'high', title: 'Weather Risk: Heavy Rain Forecast', description: 'Heavy rain expected in next 24 hours', timestamp: new Date().toISOString(), status: 'active' },
  { id: 'alert-4', type: 'compliance', severity: 'medium', title: 'Compliance: Buffer Zone Violation', description: 'Spray application too close to buffer zone in Field A2', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'active' },
]

// Approvals
export const mockApprovals: Approval[] = [
  { id: 'appr-1', type: 'purchase', title: 'Purchase Request: Diesel Fuel', description: 'Request for 5000L diesel fuel', requestedBy: 'David Fernando', requestedDate: '2024-01-15', status: 'pending', amount: 450000, priority: 'high' },
  { id: 'appr-2', type: 'work_plan', title: 'Weekly Work Plan: Jan 15-21', description: 'Weekly work plan for North Division', requestedBy: 'Maria Perera', requestedDate: '2024-01-14', status: 'pending', priority: 'medium' },
  { id: 'appr-3', type: 'overtime', title: 'Overtime Request: Harvest Team', description: 'Overtime for 8 workers on Field B1', requestedBy: 'Sarah Jayawardena', requestedDate: '2024-01-15', status: 'pending', amount: 24000, priority: 'medium' },
  { id: 'appr-4', type: 'chemical', title: 'Chemical Issue: Glyphosate', description: 'Request to issue 50L Glyphosate for Field A3', requestedBy: 'David Fernando', requestedDate: '2024-01-16', status: 'pending', priority: 'high' },
]

// Reports
export const mockReports: Report[] = [
  { id: 'rpt-1', type: 'estate_performance', title: 'Estate Performance Report', period: 'December 2024', generatedDate: '2024-01-01', data: {} },
  { id: 'rpt-2', type: 'field_productivity', title: 'Field Productivity Ranking', period: 'Q4 2024', generatedDate: '2024-01-05', data: {} },
  { id: 'rpt-3', type: 'labour_efficiency', title: 'Labour Efficiency Report', period: 'December 2024', generatedDate: '2024-01-10', data: {} },
]

// Cost Snapshots
export const mockCostSnapshots: CostSnapshot[] = [
  { id: 'cost-1', fieldId: 'field-1', jobType: 'Plucking', cost: 12000, period: '2024-01-15', breakdown: { labour: 8000, materials: 0, machinery: 4000 } },
  { id: 'cost-2', fieldId: 'field-2', jobType: 'Weeding', cost: 9000, period: '2024-01-15', breakdown: { labour: 6000, materials: 2000, machinery: 1000 } },
  { id: 'cost-3', fieldId: 'field-4', jobType: 'Tapping', cost: 6000, period: '2024-01-16', breakdown: { labour: 5000, materials: 1000, machinery: 0 } },
]

// Geo Info Mock Data
import type {
  FieldBoundary,
  Road,
  Building,
  SoilZone,
  ForestryZone,
  RestrictedArea,
  FieldProfile,
  Route as RouteType,
} from '../types/geo'

export const mockFieldBoundaries: FieldBoundary[] = [
  {
    id: 'boundary-1',
    fieldId: 'field-1',
    coordinates: [
      [6.9497, 80.7891],
      [6.9505, 80.7900],
      [6.9490, 80.7910],
      [6.9480, 80.7895],
      [6.9497, 80.7891],
    ],
    area: 12.5,
    slope: 5.2,
    elevation: 1200,
  },
  {
    id: 'boundary-2',
    fieldId: 'field-2',
    coordinates: [
      [6.9510, 80.7920],
      [6.9520, 80.7930],
      [6.9505, 80.7940],
      [6.9495, 80.7925],
      [6.9510, 80.7920],
    ],
    area: 15.2,
    slope: 3.8,
    elevation: 1180,
  },
]

export const mockRoads: Road[] = [
  {
    id: 'road-1',
    name: 'Main Access Road',
    type: 'road',
    coordinates: [
      [6.9480, 80.7880],
      [6.9500, 80.7900],
      [6.9520, 80.7920],
    ],
  },
  {
    id: 'drain-1',
    name: 'North Drain',
    type: 'drain',
    coordinates: [
      [6.9490, 80.7890],
      [6.9500, 80.7900],
    ],
  },
]

export const mockBuildings: Building[] = [
  {
    id: 'building-1',
    name: 'Central Factory',
    type: 'factory',
    coordinates: [6.9485, 80.7885],
  },
  {
    id: 'building-2',
    name: 'Main Store',
    type: 'store',
    coordinates: [6.9500, 80.7895],
  },
]

export const mockSoilZones: SoilZone[] = [
  {
    id: 'soil-1',
    name: 'High Fertility Zone',
    type: 'loam',
    fertility: 'high',
    coordinates: [
      [6.9490, 80.7890],
      [6.9500, 80.7900],
      [6.9495, 80.7910],
      [6.9485, 80.7900],
      [6.9490, 80.7890],
    ],
  },
]

export const mockForestryZones: ForestryZone[] = [
  {
    id: 'forest-1',
    name: 'Shade Tree Zone A',
    type: 'shade_trees',
    density: 120,
    coordinates: [
      [6.9495, 80.7895],
      [6.9505, 80.7905],
      [6.9500, 80.7915],
      [6.9490, 80.7905],
      [6.9495, 80.7895],
    ],
  },
]

export const mockRestrictedAreas: RestrictedArea[] = [
  {
    id: 'restricted-1',
    name: 'Riparian Buffer Zone',
    type: 'riparian_buffer',
    coordinates: [
      [6.9480, 80.7880],
      [6.9490, 80.7890],
      [6.9485, 80.7900],
      [6.9475, 80.7890],
      [6.9480, 80.7880],
    ],
  },
]

export const mockFieldProfiles: FieldProfile[] = [
  {
    fieldId: 'field-1',
    crop: {
      type: 'Tea',
      variety: 'TRISL 2025',
      age: 3,
    },
    inputHistory: [
      { type: 'fertilizer', date: '2024-01-10', product: 'Urea', quantity: 500 },
      { type: 'spray', date: '2024-01-12', product: 'Glyphosate', quantity: 20 },
    ],
    yieldHistory: [
      { date: '2024-01-15', yield: 1250, unit: 'kg' },
    ],
    issues: [
      { type: 'disease', description: 'Tea mosquito bug detected', date: '2024-01-14', severity: 'medium' },
    ],
  },
]

// Crop Calendar
export const mockCropCalendars: CropCalendar[] = [
  {
    id: 'cal-1',
    fieldId: 'field-1',
    month: 1,
    year: 2024,
    operations: [
      { id: 'op-1', type: 'fertilize', plannedDate: '2024-01-20', status: 'planned' },
      { id: 'op-2', type: 'prune', plannedDate: '2024-01-25', status: 'planned' },
      { id: 'op-3', type: 'spray', plannedDate: '2024-01-15', actualDate: '2024-01-15', status: 'completed' },
    ],
  },
  {
    id: 'cal-2',
    fieldId: 'field-2',
    month: 1,
    year: 2024,
    operations: [
      { id: 'op-4', type: 'weed', plannedDate: '2024-01-18', actualDate: '2024-01-18', status: 'completed' },
      { id: 'op-5', type: 'fertilize', plannedDate: '2024-01-22', status: 'planned' },
    ],
  },
  {
    id: 'cal-3',
    fieldId: 'field-1',
    month: 4,
    year: 2026,
    operations: [
      { id: 'op-6', type: 'fertilize', plannedDate: '2026-04-05', status: 'planned' },
      { id: 'op-7', type: 'prune', plannedDate: '2026-04-12', status: 'planned' },
      { id: 'op-8', type: 'spray', plannedDate: '2026-04-18', status: 'planned' },
      { id: 'op-9', type: 'weed', plannedDate: '2026-04-22', status: 'planned' },
      { id: 'op-10', type: 'fertilize', plannedDate: '2026-04-28', status: 'planned' },
    ],
  },
  {
    id: 'cal-4',
    fieldId: 'field-2',
    month: 4,
    year: 2026,
    operations: [
      { id: 'op-11', type: 'spray', plannedDate: '2026-04-08', status: 'planned' },
      { id: 'op-12', type: 'prune', plannedDate: '2026-04-15', status: 'planned' },
      { id: 'op-13', type: 'weed', plannedDate: '2026-04-25', status: 'planned' },
    ],
  },
]

// Yield Records
export const mockYieldRecords: YieldRecord[] = [
  {
    id: 'yield-1',
    fieldId: 'field-1',
    date: '2024-01-15',
    yield: 1250,
    unit: 'kg',
    qualityMetrics: {
      teaLeafStandard: 'Premium',
    },
  },
  {
    id: 'yield-2',
    fieldId: 'field-4',
    date: '2024-01-10',
    yield: 450,
    unit: 'kg',
    qualityMetrics: {
      latexDRC: 35.5,
    },
  },
]

// Field Activities
export const mockFieldActivities: FieldActivity[] = [
  { id: 'act-1', fieldId: 'field-1', type: 'pruning', date: '2024-01-10', description: 'Light pruning completed', performedBy: 'Field Team A' },
  { id: 'act-2', fieldId: 'field-2', type: 'mulching', date: '2024-01-12', description: 'Mulching applied to entire field', performedBy: 'Field Team B' },
  { id: 'act-3', fieldId: 'field-1', type: 'infilling', date: '2024-01-08', description: '50 plants infilled', performedBy: 'Field Team A' },
  { id: 'act-4', fieldId: 'field-3', type: 'shade_management', date: '2024-01-14', description: 'Shade tree pruning', performedBy: 'Forestry Team' },
]

// Pest/Disease Records
export const mockPestDiseases: PestDisease[] = [
  {
    id: 'pest-1',
    fieldId: 'field-1',
    type: 'pest',
    name: 'Tea Mosquito Bug',
    observationDate: '2024-01-14',
    severity: 'medium',
    description: 'Tea mosquito bug detected in northern section',
    actionsTaken: ['Spray application scheduled', 'Monitoring increased'],
    status: 'active',
  },
  {
    id: 'disease-1',
    fieldId: 'field-2',
    type: 'disease',
    name: 'Blister Blight',
    observationDate: '2024-01-10',
    severity: 'high',
    description: 'Blister blight infection in 3 blocks',
    actionsTaken: ['Fungicide applied', 'Affected area isolated'],
    status: 'resolved',
  },
]

export const mockRoutes: RouteType[] = [
  {
    id: 'route-1',
    name: 'Spray Route A',
    type: 'spray',
    coordinates: [
      [6.9490, 80.7890],
      [6.9500, 80.7900],
      [6.9510, 80.7910],
    ],
    fields: ['field-1', 'field-2'],
    machineryAccess: 'suitable',
  },
  {
    id: 'route-2',
    name: 'Harvest Route B',
    type: 'harvest',
    coordinates: [
      [6.9485, 80.7885],
      [6.9495, 80.7895],
    ],
    fields: ['field-1'],
    machineryAccess: 'suitable',
  },
]

// Crop Monitoring - Scouting Observations
export const mockScoutingObservations: ScoutingObservation[] = [
  {
    id: 'scout-1',
    fieldId: 'field-1',
    type: 'weed_pressure',
    description: 'High weed density in eastern section, primarily broadleaf weeds',
    severity: 'high',
    date: '2024-01-20',
    observedBy: 'Field Officer A',
    photos: ['photo-1.jpg', 'photo-2.jpg'],
    location: 'Eastern section, Block A',
    notes: 'Requires immediate attention before next harvest cycle',
  },
  {
    id: 'scout-2',
    fieldId: 'field-2',
    type: 'pest_incidence',
    description: 'Tea mosquito bug infestation detected',
    severity: 'medium',
    date: '2024-01-19',
    observedBy: 'Field Officer B',
    photos: ['photo-3.jpg'],
    location: 'Northern section',
    notes: 'Monitoring increased, spray scheduled',
  },
  {
    id: 'scout-3',
    fieldId: 'field-3',
    type: 'disease_incidence',
    description: 'Blister blight symptoms observed on young leaves',
    severity: 'critical',
    date: '2024-01-18',
    observedBy: 'Superintendent C',
    photos: ['photo-4.jpg', 'photo-5.jpg'],
    location: 'Central area',
    notes: 'Urgent treatment required',
  },
  {
    id: 'scout-4',
    fieldId: 'field-1',
    type: 'nutrient_deficiency',
    description: 'Yellowing leaves indicating nitrogen deficiency',
    severity: 'medium',
    date: '2024-01-17',
    observedBy: 'Field Officer A',
    photos: ['photo-6.jpg'],
    location: 'Western section',
    notes: 'Fertilizer application recommended',
  },
  {
    id: 'scout-5',
    fieldId: 'field-4',
    type: 'weed_pressure',
    description: 'Moderate weed growth in shaded areas',
    severity: 'low',
    date: '2024-01-16',
    observedBy: 'Field Officer D',
    photos: ['photo-7.jpg'],
    location: 'Shaded zones',
    notes: 'Routine weeding scheduled',
  },
]

// Crop Monitoring - Health Index Maps
export const mockHealthIndexMaps: HealthIndexMap[] = [
  {
    id: 'health-1',
    fieldId: 'field-1',
    source: 'ndvi',
    date: '2024-01-20',
    healthIndex: 72,
    mapUrl: '/maps/field-1-ndvi.jpg',
    zones: [
      {
        id: 'zone-1',
        coordinates: [[7.2, 80.6], [7.21, 80.6], [7.21, 80.61], [7.2, 80.61]],
        healthIndex: 85,
        status: 'healthy',
      },
      {
        id: 'zone-2',
        coordinates: [[7.19, 80.6], [7.2, 80.6], [7.2, 80.61], [7.19, 80.61]],
        healthIndex: 65,
        status: 'moderate',
      },
    ],
  },
  {
    id: 'health-2',
    fieldId: 'field-2',
    source: 'drone',
    date: '2024-01-19',
    healthIndex: 68,
    mapUrl: '/maps/field-2-drone.jpg',
    zones: [
      {
        id: 'zone-3',
        coordinates: [[7.22, 80.62], [7.23, 80.62], [7.23, 80.63], [7.22, 80.63]],
        healthIndex: 75,
        status: 'healthy',
      },
      {
        id: 'zone-4',
        coordinates: [[7.21, 80.62], [7.22, 80.62], [7.22, 80.63], [7.21, 80.63]],
        healthIndex: 55,
        status: 'poor',
      },
    ],
  },
  {
    id: 'health-3',
    fieldId: 'field-3',
    source: 'satellite',
    date: '2024-01-18',
    healthIndex: 58,
    mapUrl: '/maps/field-3-satellite.jpg',
    zones: [
      {
        id: 'zone-5',
        coordinates: [[7.24, 80.64], [7.25, 80.64], [7.25, 80.65], [7.24, 80.65]],
        healthIndex: 45,
        status: 'critical',
      },
    ],
  },
]

// Crop Monitoring - Soil & Leaf Tests
export const mockSoilLeafTests: SoilLeafTest[] = [
  {
    id: 'test-1',
    fieldId: 'field-1',
    type: 'soil',
    samplePlan: {
      date: '2024-01-15',
      samples: 5,
      locations: ['Eastern section', 'Western section', 'Northern section', 'Southern section', 'Central area'],
    },
    labResults: {
      date: '2024-01-18',
      parameters: [
        { name: 'Nitrogen', value: 2.1, unit: '%', status: 'low' },
        { name: 'Phosphorus', value: 0.8, unit: 'ppm', status: 'normal' },
        { name: 'Potassium', value: 1.5, unit: '%', status: 'normal' },
        { name: 'pH', value: 5.2, unit: '', status: 'normal' },
      ],
    },
    recommendations: ['Apply nitrogen fertilizer (200 kg/ha)', 'Maintain current phosphorus levels'],
    status: 'recommendations_applied',
  },
  {
    id: 'test-2',
    fieldId: 'field-2',
    type: 'leaf',
    samplePlan: {
      date: '2024-01-16',
      samples: 3,
      locations: ['Young leaves', 'Mature leaves', 'Old leaves'],
    },
    labResults: {
      date: '2024-01-19',
      parameters: [
        { name: 'Nitrogen', value: 3.2, unit: '%', status: 'normal' },
        { name: 'Magnesium', value: 0.3, unit: '%', status: 'deficient' },
        { name: 'Iron', value: 120, unit: 'ppm', status: 'normal' },
      ],
    },
    recommendations: ['Apply magnesium foliar spray', 'Monitor iron levels'],
    status: 'results_received',
  },
  {
    id: 'test-3',
    fieldId: 'field-3',
    type: 'soil',
    samplePlan: {
      date: '2024-01-20',
      samples: 4,
      locations: ['Zone A', 'Zone B', 'Zone C', 'Zone D'],
    },
    status: 'sampled',
  },
]

// Crop Monitoring - Recommendations
export const mockMonitoringRecommendations: MonitoringRecommendation[] = [
  {
    id: 'rec-1',
    fieldId: 'field-1',
    type: 'spray',
    description: 'Apply fungicide for blister blight control',
    priority: 'urgent',
    suggestedAction: 'Spray with Copper-based fungicide at 2g/L, apply within 48 hours',
    estimatedCost: 15000,
    status: 'approved',
    createdDate: '2024-01-18',
    assignedTo: 'Spray Team A',
  },
  {
    id: 'rec-2',
    fieldId: 'field-1',
    type: 'fertilizer_adjustment',
    description: 'Increase nitrogen application based on soil test results',
    priority: 'high',
    suggestedAction: 'Apply additional 200 kg/ha Urea in next round',
    estimatedCost: 18000,
    status: 'assigned',
    createdDate: '2024-01-19',
    assignedTo: 'Fertilizer Team B',
  },
  {
    id: 'rec-3',
    fieldId: 'field-2',
    type: 'drainage_repair',
    description: 'Repair drainage channels in northern section',
    priority: 'medium',
    suggestedAction: 'Clear blocked drains and repair damaged channels',
    estimatedCost: 25000,
    status: 'in_progress',
    createdDate: '2024-01-17',
    assignedTo: 'Maintenance Team C',
  },
  {
    id: 'rec-4',
    fieldId: 'field-3',
    type: 'spray',
    description: 'Weed control spray for eastern section',
    priority: 'high',
    suggestedAction: 'Apply glyphosate-based herbicide at recommended rate',
    estimatedCost: 12000,
    status: 'pending',
    createdDate: '2024-01-20',
  },
]

// Crop Monitoring - Issues
export const mockMonitoringIssues: MonitoringIssue[] = [
  {
    id: 'issue-1',
    fieldId: 'field-1',
    observationId: 'scout-1',
    recommendationId: 'rec-1',
    title: 'Blister Blight Outbreak',
    description: 'Critical disease incidence detected, requires immediate intervention',
    correctiveAction: 'Apply fungicide spray within 48 hours, monitor daily',
    assignedTo: 'Spray Team A',
    status: 'in_progress',
    createdDate: '2024-01-18',
    dueDate: '2024-01-22',
  },
  {
    id: 'issue-2',
    fieldId: 'field-1',
    observationId: 'scout-4',
    recommendationId: 'rec-2',
    title: 'Nitrogen Deficiency',
    description: 'Soil test indicates low nitrogen levels, affecting crop health',
    correctiveAction: 'Apply additional nitrogen fertilizer in next application round',
    assignedTo: 'Fertilizer Team B',
    status: 'assigned',
    createdDate: '2024-01-19',
    dueDate: '2024-01-25',
  },
  {
    id: 'issue-3',
    fieldId: 'field-2',
    observationId: 'scout-2',
    title: 'Tea Mosquito Bug Infestation',
    description: 'Pest incidence detected, monitoring increased',
    correctiveAction: 'Apply recommended pesticide, continue monitoring',
    assignedTo: 'Spray Team A',
    status: 'completed',
    createdDate: '2024-01-19',
    completedDate: '2024-01-21',
    verifiedBy: 'Superintendent C',
    verifiedDate: '2024-01-22',
  },
  {
    id: 'issue-4',
    fieldId: 'field-2',
    recommendationId: 'rec-3',
    title: 'Drainage Channel Repair',
    description: 'Drainage channels need repair to prevent waterlogging',
    correctiveAction: 'Clear and repair drainage channels in affected area',
    assignedTo: 'Maintenance Team C',
    status: 'in_progress',
    createdDate: '2024-01-17',
    dueDate: '2024-01-24',
  },
]

export function resetMockData() {
  // This would reset data if we had state management
  // For now, it's just a placeholder
  console.log('Mock data reset - reload page to see changes')
  window.location.reload()
}
