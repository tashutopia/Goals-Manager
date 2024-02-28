document.addEventListener("DOMContentLoaded", function() {
    // Load CSV data
    openTab(event, "view1")
});

async function openTab(event, tabName) {
    // Get all elements with class="tabcontent" and hide them
    const tabContents = document.querySelectorAll('.tabcontent');
    tabContents.forEach(tabContent => {
        tabContent.style.display = 'none';
    });

    // Get all elements with class="tablinks" and remove the class "active"
    const tabLinks = document.querySelectorAll('.tablinks');
    tabLinks.forEach(tabLink => {
        tabLink.classList.remove('active');
    });

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    if (event && event.type === 'DOMContentLoaded') {
        document.querySelector('.tablinks').classList.add('active');
    } else {
        event.currentTarget.classList.add('active');
    }

    if (tabName === 'view1') {
        try {
            const response = await fetch('/data'); // Assuming this endpoint returns MongoDB data
            const data = await response.json();
            renderTable(data);
        } catch (error) {
            console.error('Error fetching MongoDB data:', error);
        }
    }
}

function renderTable(data) {
    const table = document.getElementById('csvTable');
    table.innerHTML = ''; // Clear existing content

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = headerText;
    });

    // Create table rows
    data.forEach(rowData => {
        const row = table.insertRow();
        headers.forEach(header => {
            const cell = row.insertCell();
            cell.contentEditable = true; // Make cell editable
            cell.textContent = rowData[header];
            cell.addEventListener('input', () => {
                // Update MongoDB data when cell content changes
                updateMongoDB(rowData._id, header, cell.textContent);
            });
        });
    });
}

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
