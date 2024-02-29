async function view1() {
    try {
        const response = await fetch('/data'); // Assuming this endpoint returns MongoDB data
        const data = await response.json();
        // renderTable(data);
        renderView1(data);
    } catch (error) {
        console.error('Error fetching MongoDB data:', error);
    }
}


async function renderView1(data) {
    // Get all unique categories
    const categories = new Set(data.map(row => row.Category));

    // Render a table for each unique category
    categories.forEach(category => {
        const categoryData = data.filter(row => row.Category === category);

        titleHeader = renderCategoryTitle(category);
        renderCategoryTable(titleHeader, categoryData);
    });
}

function renderCategoryTitle(category) {
    // Create a button element for the clickable title header
    const titleHeader = document.createElement('button');

    titleHeader.textContent = category;
    titleHeader.classList.add('table-title');

    // Append the title header to the document body
    document.body.appendChild(titleHeader);

    return titleHeader;
}

function renderCategoryTable(titleHeader, categoryData) {

    const table = document.createElement('table');

    // add a row to the table with headings "Goal" and "Priority"
    const headerRow = table.insertRow();
    headerRow.classList.add('table-header');

    // add an event listener to toggle visibility of the table
    titleHeader.addEventListener('click', function() {
        table.style.display = table.style.display === 'none' ? 'table' : 'none';
    });

    // add a row to the table for each goal
    categoryData.forEach(rowData => {
        const row = table.insertRow();
        
        const priorityCell = row.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = rowData.Completed;
        priorityCell.appendChild(checkbox);
        checkbox.addEventListener('change', () => {
            updateMongoDB(rowData._id, 'Completed', checkbox.checked);
        });

        const arrowCell = row.insertCell();
        arrowCell.textContent = '➤';
        arrowCell.classList.add('dropdown-arrow');
        arrowCell.style.width = 20;
        // arrowCell.style.display = 'inline-block';
        arrowCell.addEventListener('click', () => {
            toggleDropdown(rowData._id);
        });

        const goalCell = row.insertCell();
        goalCell.classList.add('goal-cell');
        goalCell.contentEditable = true;
        goalCell.textContent = rowData.Goal;
        goalCell.addEventListener('input', () => {
            updateMongoDB(rowData._id, 'Goal', goalCell.textContent);
        });

        renderStepsTable(rowData, table);
    });

    document.body.appendChild(table);
}

function renderStepsTable(rowData, table) {
    const dropdownRow = table.insertRow();
    dropdownRow.style.display = 'none';
    dropdownRow.id = `dropdown-${rowData._id}`;
    dropdownRow.insertCell();
    dropdownRow.insertCell();
    dropdownCell = dropdownRow.insertCell();

    dropdownCell.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Date</th>
                        <th>✓</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowData.Steps.map((step, index) => `
                        <tr>
                            <td contenteditable="true" id="step-${rowData._id}-${index}">${step}</td>
                            <td contenteditable="true" id="date-${rowData._id}-${index}">${new Date(rowData.Dates[index]).toLocaleDateString()}</td>
                            <td contenteditable="false">
                                <input type="checkbox" ${rowData.Completed[index] ? 'checked' : ''} id="completed-${rowData._id}-${index}" />
                            </td>
                            <td contenteditable="false">
                                <i class="fas fa-trash" id="trash-${rowData._id}-${index}" onclick="deleteStep('${rowData._id}', ${index})"></i>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    
        setTimeout(() => {
            rowData.Steps.forEach((step, index) => {
                const stepCell = document.getElementById(`step-${rowData._id}-${index}`);
                stepCell.addEventListener('input', () => {
                    updateMongoDBarray(rowData._id, 'Steps', index, stepCell.textContent);
                });

                const dateCell = document.getElementById(`date-${rowData._id}-${index}`);
                dateCell.addEventListener('input', () => {
                    updateMongoDBarray(rowData._id, 'Dates', index, dateCell.textContent);
                });

                const completedCheckbox = document.getElementById(`completed-${rowData._id}-${index}`);
                completedCheckbox.addEventListener('change', () => {
                    updateMongoDBarray(rowData._id, 'Completed', index, completedCheckbox.checked);
                });
            });
        }, 0);
}

function toggleDropdown(id) {
    const dropdownRow = document.getElementById(`dropdown-${id}`);
    if (dropdownRow) { // Check if the dropdownRow exists
        if (dropdownRow.style.display === 'none') {
            dropdownRow.style.display = 'table-row';
        } else {
            dropdownRow.style.display = 'none';
        }
    } else {
        console.error(`Dropdown row with ID ${id} not found.`);
    }
}