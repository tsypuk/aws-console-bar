var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);

accounts = new Map()
xlabels = []

function appendOrCreateArray(accountId, data) {
    console.log(accounts.get(accountId))
    if (accounts.has(accountId)) {
        accounts.get(accountId).push(data);
    } else {
        accounts.set(accountId, [data]);
        // change size based on other elements size
        for (let [key, value] of accounts) {
            if (key != accountId) {
                size = value.length
                for (let i = 0; i < size; i++) {
                    accounts.get(accountId).unshift(0)
                }
                break
            }
        }
    }
    for (let [key, value] of accounts) {
        if (key != accountId) {
            value.push(0)
        }
    }

}

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
            startPageIndex = 0
            pagingSize = 10

            result.history = result.history.sort((a, b) => b.StartTimeStamp - a.StartTimeStamp).slice(startPageIndex, pagingSize)
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
                sevenCell.textContent = secondsToHHMMSS(parseInt(item.Duration / 1000))

                newRow.appendChild(firstCell);
                newRow.appendChild(secondCell);
                newRow.appendChild(thirdCell);
                newRow.appendChild(forthdCell);
                newRow.appendChild(fifthdCell);
                newRow.appendChild(sixdCell);
                newRow.appendChild(sevenCell);
                tbody.appendChild(newRow);
            })

            result.history.reverse().forEach((item, index) => {
                appendOrCreateArray(item.Account, parseInt(item.Duration / 1000))
                // accounts[item.Account].datas.push(parseInt(item.Duration / 1000))
                xlabels.push(item.StartTime)
            })

            series = []
            for (let [key, value] of accounts) {
                series.push({
                    name: key, type: 'bar', data: value
                })
            }

            var option = {
                title: {
                    text: 'AWS console activity based on accounts by date'
                }, tooltip: {},

                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    }, data: xlabels
                },
                yAxis: {}, series: series
            };
            option && myChart.setOption(option);
        }
    })

    const awsHistoryDiv = document.getElementById('aws_history');
    awsHistoryDiv.appendChild(table);
}

function secondsToHHMMSS(seconds) {
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsRemainder = seconds % 60;

    minutes = String(minutes).padStart(2, '0');
    secondsRemainder = String(secondsRemainder).padStart(2, '0');

    return `${minutes}:${secondsRemainder}`;
}

render_history_table()
