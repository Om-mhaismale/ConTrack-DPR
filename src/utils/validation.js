export function validateDPRForm(formData, imageCount) {
  const errors = {};

  if (!formData.project) {
    errors.project = 'Please select a project';
  }
  if (!formData.date) {
    errors.date = 'Date is required';
  }
  if (!formData.weather) {
    errors.weather = 'Please select weather condition';
  }
  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Work description is required';
  }
  if (!formData.workerCount || Number(formData.workerCount) < 1) {
    errors.workerCount = 'Enter a valid worker count (minimum 1)';
  }
  if (imageCount === 0) {
    errors.images = 'Please upload at least 1 site image';
  }

  return errors;
}

export function validateLogin(email, password) {
  const errors = {};

  if (!email) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return errors;
}
