// Fetch the JSON data
function calculate() {
  fetch('database.json')
  .then(response => response.json())
  .then(data => {
    // Acquire data from both tables.
    const table1Data = data["Table 1"];
    const table2Data = data["Table 2"];

    // Select #table2 from HTML.
    const table2Body = document.querySelector('#table2 tbody'); 

    // Declare Index No. variables for math operator later, 
    // then find its respective values. 
    let a5Value, a7Value, a12Value, a13Value, a15Value, a20Value;
    
    for (const row of table1Data) {
      switch (row.Index) {
        case "A5":
          a5Value = row.Value;
          break;
        case "A7":
          a7Value = row.Value;
          break;
        case "A12":
          a12Value = row.Value;
          break;
        case "A13":
          a13Value = row.Value;
          break;
        case "A15":
          a15Value = row.Value;
          break;
        case "A20":
          a20Value = row.Value;
          break;
        default:
          break;
      }
    }

    // Amend the JSON values of Table 2 before appending DOM.
    for (const row of table2Data) {
    switch (row.Category) {
        case "Alpha":
        row.Value = (parseInt(a5Value) + parseInt(a20Value)).toString();
        break;
        case "Beta":
        row.Value = (parseInt(a15Value) / parseInt(a7Value)).toString();
        break;
        case "Charlie":
        row.Value = (parseInt(a13Value) * parseInt(a12Value)).toString();
        break;
        default:
        break;
    }
    }

    // Populate data.
    table2Data.forEach(row => { 
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.Category}</td><td>${row.Value}</td>`;
        table2Body.appendChild(tr);
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });
  document.getElementById('btn').disabled = true;
}