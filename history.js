function secondsToHHMMSS(seconds) {
    // get hours from seconds
    hours = 0
    if (seconds => 3600) {
        hours = Math.floor(seconds / 3600);
    }
    let minutes = Math.floor((seconds % 3600) / 60);
    let secondsRemainder = seconds % 60;

    minutes = String(minutes).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
    secondsRemainder = String(secondsRemainder).padStart(2, '0');

    return `${hours}:${minutes}:${secondsRemainder}`;
}

function mergeArrays(...arrays) {
    let result = []

    arrays.forEach(array => {
        array.forEach((value_array, idx) => {
            value_array.forEach((value, index) => {
                if (result[index] == undefined) {
                    result[index] = 0
                }
                result[index] += value
            })
        })
    })
    return result
}

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);

accounts = new Map()
xlabels = []

aws_accounts = new Map()

chrome.storage.sync.get(['aws_accounts'], result => {
    result.aws_accounts.forEach(item => {
        aws_accounts.set(item.accountID, item.name)
    })
    render_history_table()
})

function enrichAccountName(accountId) {
    if (aws_accounts.has(accountId)) {
        return aws_accounts.get(accountId)
    } else {
        return accountId
    }
}

function appendOrCreateArray(accountId, data) {
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
          <th>Alias</th>
          <th>AWSAccountID</th>
          <th>User</th>
          <th>Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Duration, min</th>
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

                const idCell = document.createElement('td');
                idCell.textContent = index

                const accountAliasCell = document.createElement('td');
                accountAliasCell.textContent = enrichAccountName(item.Account)

                const accountIdCell = document.createElement('td');
                accountIdCell.textContent = item.Account

                const iamUserCell = document.createElement('td');
                iamUserCell.textContent = item.IAMUser

                const typeCell = document.createElement('td');
                typeCell.textContent = item.type

                const sessionStartCell = document.createElement('td');
                sessionStartCell.textContent = item.StartTime

                const sessionEndCell = document.createElement('td');
                sessionEndCell.textContent = item.EndTime

                const sessionDurationCell = document.createElement('td');
                sessionDurationCell.textContent = secondsToHHMMSS(parseInt(item.Duration / 1000))

                newRow.appendChild(idCell);
                newRow.appendChild(accountAliasCell);
                newRow.appendChild(accountIdCell);
                newRow.appendChild(iamUserCell);
                newRow.appendChild(typeCell);
                newRow.appendChild(sessionStartCell);
                newRow.appendChild(sessionEndCell);
                newRow.appendChild(sessionDurationCell);
                tbody.appendChild(newRow);
            })

            result.history.reverse().forEach((item, index) => {
                appendOrCreateArray(item.Account, parseInt(item.Duration / 1000))
                // accounts[item.Account].datas.push(parseInt(item.Duration / 1000))
                xlabels.push(item.StartTime)
            })

            series = []
            data = []
            for (let [account, value] of accounts) {
                series.push({
                    name: account, type: 'bar', data: value
                })
                data.push(account)
            }

            series.push({
                name: 'AWS Session', type: 'line', data: mergeArrays(accounts)
            })

            data.push('AWS Session')

            const colors = ['#5470C6', '#91CC75', '#EE6666'];

            var option = {
                title: {
                    text: 'AWS console activity based on accounts by date'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data: data
                },

                xAxis: {
                    axisTick: {
                        alignWithLabel: true
                    }, data: xlabels
                }, yAxis: [
                    {
                        type: 'value',
                        name: 'Session',
                        position: 'right',
                        alignTicks: true,
                        offset: 5,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} sec'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Session',
                        position: 'left',
                        alignTicks: true,
                        offset: 5,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value} sec'
                        }
                    }
                ]
                , series: series
            };
            option && myChart.setOption(option);
        }
    })

    const awsHistoryDiv = document.getElementById('aws_history');
    awsHistoryDiv.appendChild(table);
}
