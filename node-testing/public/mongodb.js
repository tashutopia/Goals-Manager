async function updateMongoDB(id, field, value) {
    try {
        const response = await fetch(`/data/update/${id}`, { // Adjusted URL path
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ field, value })
        });
        if (response.ok) {
            console.log('MongoDB data updated successfully');
        } else {
            console.error('Failed to update MongoDB data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating MongoDB data:', error);
    }
}

async function updateMongoDBarray(id, field, index, value) {
    try {
        const response = await fetch(`/data/update-array/${id}`, { // Adjusted URL path
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ field, index, value })
        });
        if (response.ok) {
            console.log('MongoDB data updated successfully');
        } else {
            console.error('Failed to update MongoDB data:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating MongoDB data:', error);
    }
}

async function deleteStep(id, index) {
    try {
        const response = await fetch(`/data/deleteStep/${id}/${index}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log('Step deleted successfully');
            // You might want to refresh the table or update the UI after deletion
        } else {
            console.error('Failed to delete step:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting step:', error);
    }
}
