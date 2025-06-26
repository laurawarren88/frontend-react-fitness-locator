const isActivityUser = async (activityId) => {
  try {
    const token = document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
    console.log("User Cookie:", token);
    if (!token) return false;

    const response = await fetch(`/api/activities/${activityId}/check-ownership`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) return false;
    
    const data = await response.json();
    return data.isOwner;
} catch (error) {
    console.error('Error checking activity ownership:', error);
    return false;
}
};

export default isActivityUser;