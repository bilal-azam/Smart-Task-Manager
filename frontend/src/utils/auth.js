export const isAuthenticated = () => !!localStorage.getItem('token');

export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
};
