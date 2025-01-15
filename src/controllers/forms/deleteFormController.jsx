import { showMessage } from '../../utils/messageAlert.jsx';

export const deleteSubmitForm = async ({url, payload, alertContainerId}) => {
  try {
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include', 
    });

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