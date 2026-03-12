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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          DPR submitted successfully!
        </div>
      )}

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Daily Progress Report</h1>
        {selectedProject && (
          <p className="text-sm text-gray-500 mb-6">{selectedProject.name}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Dropdown */}
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
              Project
            </label>
            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-white ${
                errors.project ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project}</p>}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.date ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          {/* Weather */}
          <div>
            <label htmlFor="weather" className="block text-sm font-medium text-gray-700 mb-1">
              Weather
            </label>
            <select
              id="weather"
              name="weather"
              value={formData.weather}
              onChange={handleChange}
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 bg-white ${
                errors.weather ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Select weather</option>
              {weatherOptions.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            {errors.weather && <p className="text-red-500 text-xs mt-1">{errors.weather}</p>}
          </div>

          {/* Work Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Work Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the work done today..."
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 resize-y ${
                errors.description ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Worker Count */}
          <div>
            <label htmlFor="workerCount" className="block text-sm font-medium text-gray-700 mb-1">
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
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.workerCount ? 'border-red-400' : 'border-gray-300'
              }`}
            />
            {errors.workerCount && (
              <p className="text-red-500 text-xs mt-1">{errors.workerCount}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site Images (1-3)
            </label>
            <label
              className={`flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                errors.images
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              } ${images.length >= 3 ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <Upload className="w-6 h-6 text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">Click to upload images</span>
              <span className="text-xs text-gray-400">{images.length}/3 uploaded</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={images.length >= 3}
              />
            </label>
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}

            {images.length > 0 && (
              <div className="flex gap-3 mt-3">
                {images.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={img.url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
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
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Submit DPR
          </button>
        </form>
      </main>
    </div>
  );
}
