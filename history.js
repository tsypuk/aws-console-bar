function render_history_table() {
    const table = document.createElement('table');
    table.className = "table table-hover"
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>info</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    chrome.storage.sync.get(['history'], result => {
        if (result.history) {
            result.history.forEach((item, index) => {
                const newRow = document.createElement('tr');

                const firstCell = document.createElement('td');
                const inputElement = document.createElement('input');
                inputElement.type = 'checkbox';
                inputElement.id = item.name;
                inputElement.checked = item.checked
                firstCell.appendChild(inputElement);

                const secondCell = document.createElement('td');
                secondCell.textContent = item.name;

                const thirdCell = document.createElement('td');
                thirdCell.textContent = JSON.stringify(item);

                newRow.appendChild(firstCell);
                newRow.appendChild(secondCell);
                newRow.appendChild(thirdCell);
                tbody.appendChild(newRow);
            })
        }
    })

    const awsHistoryDiv = document.getElementById('aws_history');
    awsHistoryDiv.appendChild(table);
}

render_history_table()
