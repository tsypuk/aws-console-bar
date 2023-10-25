function render_history_table() {
    const table = document.createElement('table');
    table.className = "table table-hover"
    table.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>account</th>
          <th>user</th>
          <th>type</th>
          <th>start</th>
          <th>end</th>
          <th>duration, min</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Populate the table with data from the accounts array
    chrome.storage.local.get(['history'], result => {
        if (result.history) {
            result.history.forEach((item, index) => {
                const newRow = document.createElement('tr');

                const firstCell = document.createElement('td');
                firstCell.textContent = index

                const secondCell = document.createElement('td');
                secondCell.textContent = item.Account

                const thirdCell = document.createElement('td');
                thirdCell.textContent = item.IAMUser

                const forthdCell = document.createElement('td');
                forthdCell.textContent = item.type

                const fifthdCell = document.createElement('td');
                fifthdCell.textContent = item.StartTime

                const sixdCell = document.createElement('td');
                sixdCell.textContent = item.EndTime

                const sevenCell = document.createElement('td');
                sevenCell.textContent = item.Duration / 1000 / 60

                newRow.appendChild(firstCell);
                newRow.appendChild(secondCell);
                newRow.appendChild(thirdCell);
                newRow.appendChild(forthdCell);
                newRow.appendChild(fifthdCell);
                newRow.appendChild(sixdCell);
                newRow.appendChild(sevenCell);
                tbody.appendChild(newRow);
            })
        }
    })

    const awsHistoryDiv = document.getElementById('aws_history');
    awsHistoryDiv.appendChild(table);
}

render_history_table()
