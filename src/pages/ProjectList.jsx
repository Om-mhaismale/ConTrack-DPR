import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects, statusColors, statusOptions } from '../constants/projects';

export default function ProjectList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects =
    statusFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Projects</h1>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white outline-none focus:ring-2 focus:ring-orange-500"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? 'All Statuses' : opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No projects match the selected filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
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
        )}
      </main>
    </div>
  );
}
