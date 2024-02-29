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
        view1();
    }
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