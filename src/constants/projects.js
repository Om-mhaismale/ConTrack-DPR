export const projects = [
  {
    id: 1,
    name: 'Highway Bridge Expansion',
    status: 'Progress',
    startDate: '2026-01-15',
    location: 'Mumbai, Maharashtra',
  },
  {
    id: 2,
    name: 'Commercial Complex Tower B',
    status: 'Pending',
    startDate: '2026-03-01',
    location: 'Bangalore, Karnataka',
  },
  {
    id: 3,
    name: 'Metro Station Phase II',
    status: 'Done',
    startDate: '2025-06-20',
    location: 'Delhi, NCR',
  },
  {
    id: 4,
    name: 'Residential Township',
    status: 'Progress',
    startDate: '2025-11-10',
    location: 'Pune, Maharashtra',
  },
  {
    id: 5,
    name: 'Flyover Construction NH-48',
    status: 'Pending',
    startDate: '2026-04-01',
    location: 'Hyderabad, Telangana',
  },
];

export const statusConfig = {
  Progress: { label: 'In Progress', bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500', border: 'border-l-sky-500' },
  Pending:  { label: 'Pending',     bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', border: 'border-l-amber-500' },
  Done:     { label: 'Completed',   bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-l-emerald-500' },
};

export const weatherOptions = ['Sunny', 'Cloudy', 'Rainy'];

export const statusOptions = ['All', 'Progress', 'Pending', 'Done'];
