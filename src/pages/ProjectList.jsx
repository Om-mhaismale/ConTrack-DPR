import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Search } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects, statusConfig, statusOptions } from '../constants/projects';

export default function ProjectList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredProjects =
    statusFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Page header band */}
      <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800/50 pt-8 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Your Projects</h1>
            <p className="text-slate-400 text-sm mt-1">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} &middot; Select one to fill a DPR
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-1.5 bg-slate-800 dark:bg-slate-900 rounded-lg p-1">
            {statusOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setStatusFilter(opt)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                  statusFilter === opt
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {opt === 'All' ? 'All' : statusConfig[opt]?.label || opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards grid — pulled up over the header */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10">
        {filteredProjects.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 p-16 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-400 text-base font-medium">No projects match this filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project, i) => {
              const s = statusConfig[project.status];
              return (
                <div
                  key={project.id}
                  onClick={() => navigate(`/dpr/${project.id}`)}
                  style={{ animationDelay: `${i * 70}ms` }}
                  className={`animate-card bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-l-4 ${s.border} p-5 cursor-pointer group hover:shadow-md dark:hover:shadow-slate-900 transition-all duration-200`}
                >
                  {/* Status + name */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <h2 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {project.name}
                    </h2>
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-md whitespace-nowrap ${s.bg} ${s.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="space-y-2 text-[13px] text-slate-400 dark:text-slate-500 mb-5">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{new Date(project.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                    <span className="text-orange-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Fill DPR
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[11px] text-slate-300 dark:text-slate-600 font-mono">#{project.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
