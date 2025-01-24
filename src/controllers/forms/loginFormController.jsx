import { showMessage } from '../../utils/messageAlert';

export const submitForm = async ({url, payload, alertContainerId}) => {
    console.log("submitForm called with url:", url, "payload:", payload);
  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include', 
    });
    console.log("response:", response);

    if (response.ok) {
        const data = await response.json();
        return { success: true, data };
    } else {
        const errorData = await response.json();
        showMessage(alertContainerId, errorData.error || 'Request failed', 'error');
        return { success: false, error: errorData };
    }
} catch (error) {
    console.error('Error:', error);
    showMessage(alertContainerId, 'An error occurred during the request', 'error');
    return { success: false, error };
}
};