import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, X, CheckCircle, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import { projects, weatherOptions } from '../constants/projects';
import { validateDPRForm } from '../utils/validation';

export default function DPRForm() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    project: projectId || '',
    date: '',
    weather: '',
    description: '',
    workerCount: '',
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(false);

  const selectedProject = projects.find((p) => String(p.id) === String(formData.project));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      setErrors((prev) => ({ ...prev, images: 'Maximum 3 images allowed' }));
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: '' }));
    }
    e.target.value = '';
  };

  const removeImage = (index) => {
    setImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateDPRForm(formData, images.length);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setToast(true);
    setTimeout(() => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
      navigate('/projects');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white pl-4 pr-5 py-3 rounded-lg shadow-lg flex items-center gap-2.5 animate-toast">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">DPR submitted successfully!</span>
        </div>
      )}

      {/* Header band */}
      <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-800/50 pt-8 pb-14 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white dark:hover:text-slate-200 mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-white tracking-tight">Daily Progress Report</h1>
          {selectedProject && (
            <p className="text-slate-400 text-sm mt-1">{selectedProject.name}</p>
          )}
        </div>
      </div>

      {/* Form card — pulled up */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 -mt-8 pb-12">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Dropdown */}
            <div>
              <label htmlFor="project" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Project
              </label>
              <select
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white transition-all duration-200 ${
                  errors.project ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/40' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-orange-500 dark:bg-slate-700 dark:text-slate-100'
                }`}
              >
                <option value="">Select a project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              {errors.project && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.project}</p>}
            </div>

            {/* Date & Weather row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 ${
                    errors.date ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/40' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 focus:border-orange-500'
                  }`}
                />
                {errors.date && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="weather" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Weather
                </label>
                <select
                  id="weather"
                  name="weather"
                  value={formData.weather}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none bg-white transition-all duration-200 ${
                    errors.weather ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/40' : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500 focus:border-orange-500 dark:bg-slate-700 dark:text-slate-100'
                  }`}
                >
                  <option value="">Select weather</option>
                  {weatherOptions.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
                {errors.weather && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.weather}</p>}
              </div>
            </div>

            {/* Work Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Work Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the work completed today..."
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none resize-y transition-all duration-200 ${
                  errors.description ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/40' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 focus:border-orange-500 dark:placeholder-slate-500'
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.description}</p>
              )}
            </div>

            {/* Worker Count */}
            <div>
              <label htmlFor="workerCount" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Worker Count
              </label>
              <input
                id="workerCount"
                type="number"
                name="workerCount"
                min="1"
                value={formData.workerCount}
                onChange={handleChange}
                placeholder="e.g. 25"
                className={`w-full border rounded-lg px-4 py-2.5 text-sm outline-none transition-all duration-200 ${
                  errors.workerCount ? 'border-red-300 bg-red-50/50 dark:bg-red-900/20 dark:border-red-500/40' : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-slate-100 hover:border-slate-300 dark:hover:border-slate-500 focus:border-orange-500'
                }`}
              />
              {errors.workerCount && (
                <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.workerCount}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Site Photos <span className="font-normal text-slate-400 dark:text-slate-500">(1–3 images)</span>
              </label>
              <label
                className={`flex flex-col items-center justify-center w-full py-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                  errors.images
                    ? 'border-red-300 bg-red-50/30 dark:bg-red-900/10 dark:border-red-500/30'
                    : 'border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/30 hover:bg-orange-50/30 dark:hover:bg-orange-900/10 hover:border-orange-300 dark:hover:border-orange-700'
                } ${images.length >= 3 ? 'opacity-40 pointer-events-none' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-600 flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5 text-slate-400" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300 font-medium">Click to upload</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">{images.length}/3 &middot; JPG, PNG up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={images.length >= 3}
                />
              </label>
              {errors.images && <p className="text-red-500 text-xs mt-1.5 pl-1">{errors.images}</p>}

              {images.length > 0 && (
                <div className="flex gap-3 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group/thumb">
                      <img
                        src={img.url}
                        alt={`Upload ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Submit Report
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
