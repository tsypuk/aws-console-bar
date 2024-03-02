function mergeJsonData(mergedData, newData) {
    newData.forEach(function (obj) {
        if (!mergedData.some(search => search.accountID === obj.accountID && search.color == obj.color && search.name == obj.name)) {
            mergedData.push(obj)
        }
    });
    return mergedData
}

describe('mergeJSONData', () => {
    test.each([[[], [{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }], [{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }]], [[{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }], [{
        "accountID": "3333-3333-3333", "color": "#e60a0a", "name": "Account-3"
    }], [{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }, {
        "accountID": "3333-3333-3333", "color": "#e60a0a", "name": "Account-3"
    }]], [[{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }], [{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }], [{
        "accountID": "2222-2222-2222", "color": "#eeca17", "name": "Account-1"
    }, {
        "accountID": "1111-1111-1111", "color": "#e60a0a", "name": "Account-2"
    }]]

    ])('merges arrays into a map', (mergedData, newData, expected) => {
        mergeJsonData(mergedData, newData);
        expect(mergedData.size).toEqual(expected.size);
        expect(mergedData).toEqual(expected)
    });
});