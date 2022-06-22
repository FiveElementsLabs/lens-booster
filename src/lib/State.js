/*
 *  This is a helper to keep track of some state
 *  via local storage.
 */

export const setAuthenticationToken = (token) => {
  localStorage.setItem('auth_token', token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem('auth_token');
};

export const removeAuthenticationToken = () => {
  return localStorage.removeItem('auth_token');
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refresh_token', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};
