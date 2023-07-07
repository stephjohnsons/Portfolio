// Fetch the JSON data
fetch('database.json')
  .then(response => response.json())
  .then(data => {
    const table1Data = data['Table 1']; // Access the Table 1 data from the JSON
    const table1Body = document.querySelector('#table1 tbody'); // Get a reference to the table1 body

    table1Data.forEach(row => { // Populate the table with data from Table 1
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.Index}</td><td>${row.Value}</td>`;
      table1Body.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Error:', error);
});
