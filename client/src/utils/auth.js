// Centralized auth utilities

export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    // Notify listeners (contexts) that storage has changed
    window.dispatchEvent(new Event('storageUpdated'));
  } catch (e) {
    // noop
  }
  // Redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('token');
  } catch (e) {
    return null;
  }
};
