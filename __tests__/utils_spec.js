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

function mergeAccountAndColors(accounts, colors) {
    let result = new Map()

    for (i = 0; i < colors.length; i++) {
        result.set(accounts[i], colors[i])
    }
    return result
}

test("Test Account and Colors merge", () => {
    result = mergeAccountAndColors(["a", "b", "c", "d"], ["red", "green", "blue"])

    expect(result.size).toEqual(3)
    expect(result.has("a")).toEqual(true)
    expect(result.has("b")).toEqual(true)
    expect(result.has("c")).toEqual(true)
    expect(result.has("d")).toEqual(false)

    expect(result.get("a")).toEqual("red")
    expect(result.get("b")).toEqual("green")
    expect(result.get("c")).toEqual("blue")


});

test("Merge of arrays with sum elements", () => {

    accounts = new Map()
    accounts.set("1", [0, 0, 0, 0, 0, 0, 0, 0, 109, 0])
    accounts.set("2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 3708])

    expect(mergeArrays(
        accounts
    )).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 109, 3708])
});


test("Seconds only", () => {
    expect(secondsToHHMMSS(22)).toBe("00:00:22");
});

test("Minutes:seconds", () => {
    expect(secondsToHHMMSS(300)).toBe("00:05:00");
});

test("Hours:Minutes:seconds", () => {
    expect(secondsToHHMMSS(3900)).toBe("01:05:00");
});