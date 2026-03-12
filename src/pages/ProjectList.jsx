import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const projects = [
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
];

const statusColors = {
  Progress: 'bg-blue-100 text-blue-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Done: 'bg-green-100 text-green-700',
};

export default function ProjectList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Projects</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/dpr/${project.id}`)}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 cursor-pointer hover:shadow-md hover:border-orange-300 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-800 leading-tight">
                  {project.name}
                </h2>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ml-2 ${statusColors[project.status]}`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{project.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{project.location}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center text-orange-600 text-sm font-medium">
                Fill DPR
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
