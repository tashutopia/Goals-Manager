document.addEventListener("DOMContentLoaded", function() {
    // Load CSV data
    openTab(event, "view1")
});

function parseCSV(csv) {
    const parsedData = csv.split('\n').map(row => row.split(','));
    return parsedData;
}

function view1Table() {
    // Implement rendering logic based on the provided data
    // This function should update the UI to display the data for the current view
  // Fetch CSV data
  fetch('goals.csv')
    .then(response => response.text())
    .then(csvData => {
      // Parse CSV data
      const rows = csvData.trim().split('\n');
      const table = document.getElementById('csvTable');

      // Clear existing content of the table
      table.innerHTML = '';

      // Add table headers
      const headers = rows[0].split(',');
      let headerRow = table.insertRow();
      headers.forEach(headerText => {
        let headerCell = headerRow.insertCell();
        headerCell.textContent = headerText;
      });

      // Add table rows
      for (let i = 1; i < rows.length; i++) {
        let row = table.insertRow();
        let cells = rows[i].split(',');
        cells.forEach(cellText => {
          let cell = row.insertCell();
          cell.contentEditable = true; // Make cell editable
          cell.textContent = cellText;
          // Add event listener to detect changes in cell content
          cell.addEventListener('input', () => {
            // Update CSV data in local storage when cell content changes
            updateCSVData();
          });
        });
      }
    })
    .catch(error => console.error('Error loading CSV data:', error));
}

function updateCSVData() {
    // Get table and its rows
    const table = document.getElementById('csvTable');
    const rows = table.rows;
  
    // Initialize an empty array to store updated CSV data
    const updatedData = [];
  
    // Iterate over rows to construct updated CSV data
    for (let i = 0; i < rows.length; i++) {
      const rowData = [];
      const cells = rows[i].cells;
      for (let j = 0; j < cells.length; j++) {
        rowData.push(cells[j].textContent);
      }
      updatedData.push(rowData.join(','));
    }
  
    // Convert updated CSV data array to CSV string
    const csvData = updatedData.join('\n');
  
    // Save CSV data to local storage (or session storage)
    localStorage.setItem('csvData', csvData);
}
  
function exportToCSV() {
    // Retrieve CSV data from local storage
    const csvData = localStorage.getItem('csvData');
    if (csvData) {
      // Create a Blob object containing the CSV data
      const blob = new Blob([csvData], { type: 'text/csv' });
  
      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'exported_goals.csv';
      link.click();
    } else {
      console.error('No CSV data found.');
    }
}

document.getElementById('exportBtn').addEventListener('click', exportToCSV);

function openTab(event, tabName) {
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

    view1Table();

    // fetch('data.csv')
    //     .then(response => response.text())
    //     .then(data => {
    //         // Parse CSV data
    //         parsedData = parseCSV(data);
    //     })
    //     .catch(error => console.error('Error loading data:', error));

    // Render  view
    // renderView(parsedData); // Assuming the first view is default

    // Tab switching logic
    // const tabs = document.querySelectorAll('.tab');
    // tabs.forEach(tab => {
    //     tab.addEventListener('click', function() {
    //         // Remove active class from all tabs
    //         tabs.forEach(t => t.classList.remove('active'));
    //         // Add active class to the clicked tab
    //         this.classList.add('active');
    //         const viewIndex = parseInt(this.dataset.index);
    //         renderView(parsedData[viewIndex]);
    //     });
    // });
}

const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const uri = "mongodb+srv://tashugupta:datamanager@cluster0.rsdgrgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(uri)
// const db = mongoose.connection
// db.on('error', (error) => console.error(error))
// db.once('open', () => console.log('Connected to database!'))

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });