const get = jest.fn()
const set = jest.fn()
global.chrome = {
    storage: {
        local: {
            set,
            get
        },
        sync: {
            set,
            get,
        }
    }
}
document = {
    getElementById: () => {
    }
}

echarts = {
    init: jest.fn()
}

const {secondsToHHMMSS, mergeAccountAndColors, mergeArrays} = require('../history');

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