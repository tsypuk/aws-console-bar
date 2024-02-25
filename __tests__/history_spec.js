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

describe('mergeAccountAndColors', () => {
    test.each([
        [["a", "b", "c", "d"], ["red", "green", "blue"], new Map([
            ["a", "red"],
            ["b", "green"],
            ["c", "blue"]
        ])],
        [["x", "y", "z"], ["red", "green", "blue"], new Map([
            ["x", "red"],
            ["y", "green"],
            ["z", "blue"]
        ])],
        [["p", "q"], ["red"], new Map([
            ["p", "red"]
        ])],
        [[], [], new Map()],
    ])('merges arrays into a map', (accounts, colors, expected) => {
        const result = mergeAccountAndColors(accounts, colors);
        expect(result.size).toEqual(expected.size);
        expected.forEach((value, key) => {
            expect(result.get(key)).toEqual(value);
        });
    });

    test('throws error if arrays have different lengths', () => {
        expect(() => {
            mergeAccountAndColors(["a", "b", "c"], ["red", "green", "blue", "yellow"]);
        }).toThrow('Colors and Accounts must have same length');
    });
});

test("Merge of arrays with sum elements", () => {

    accounts = new Map()
    accounts.set("1", [0, 0, 0, 0, 0, 0, 0, 0, 109, 0])
    accounts.set("2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 3708])

    expect(mergeArrays(
        accounts
    )).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 109, 3708])
});

describe('secondsToHHMMSS', () => {
    test.each([
        [22, '00:00:22'],
        [60, '00:01:00'],
        [300, '00:05:00'],
        [3600, '01:00:00'],
        [3661, '01:01:01'],
        [86399, '23:59:59'],
        [0, '00:00:00'],
    ])('converts %i seconds to %s format', (seconds, expected) => {
        expect(secondsToHHMMSS(seconds)).toBe(expected);
    });
});