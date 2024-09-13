import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;  // Current time in seconds
  return decoded.exp < currentTime;  // Check if the token has expired
};

export const isTokenNearExpiry = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;  // Current time in seconds
  const timeToExpiry = decoded.exp - currentTime;
  return timeToExpiry < 300;  // Check if token is expiring in less than 5 minutes
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');  // Assume you store refresh token in local storage
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.access_token);  // Update the access token
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error refreshing token', err);
    return false;
  }
};
