export const isAdmin = () => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    console.log("Admin Cookie:", token);
    if (!token) return false;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("Decoded Payload:", payload);
    return payload?.isAdmin || false;
  } catch {
    return false;
  }
};
