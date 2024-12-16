import { getCookie } from "./fetchCookie";
  
  export const FetchToken = async (url, options = {}) => {
    let token = getCookie('access_token');
    
    if (!token) {
      const refreshToken = getCookie('refresh_token');
  
      if (refreshToken) {
        const refreshResponse = await fetch('/refresh-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ refresh_token: refreshToken }),
        });
  
        if (refreshResponse.ok) {
          const data = await refreshResponse.json();
          token = data.access_token;
        } else {
          return handleAuthError();
        }
      } else {
        return handleAuthError();
      }
    }
  
    const defaultOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include',
    };
  
    if (!(options.body instanceof FormData)) {
      defaultOptions.headers['Content-Type'] = 'application/json';
    }
  
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      if (response.status === 403) {
        throw new Error('Admin access required');
      }
      throw new Error(errorData.error || 'Request failed');
    }
  
    return response;
  };
  
  const handleAuthError = () => {
    return `
      <div class="auth-error">
        <h2>Authentication Required</h2>
        <p>Please <a href="/users/login">login</a> to access this page.</p>
      </div>
    `;
  };