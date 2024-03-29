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

describe('mergeAccountAndColors', () => {
    test.each([
        [["0000-0000-0000", "0000-0000-0001", "0000-0000-0002", "0000-0000-0003"], ["red", "green", "blue"], new Map([
            ["0000-0000-0000", "red"],
            ["0000-0000-0001", "green"],
            ["0000-0000-0002", "blue"]
        ])],
        [["0000-0000-0000", "0000-0000-0001", "0000-0000-0002"], ["red", "green", "blue"], new Map([
            ["0000-0000-0000", "red"],
            ["0000-0000-0001", "green"],
            ["0000-0000-0002", "blue"]
        ])],
        [["0000-0000-0000", "0000-0000-0001"], ["red"], new Map([
            ["0000-0000-0000", "red"]
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
            mergeAccountAndColors(["0000-0000-0000", "0000-0000-0001", "0000-0000-0002"], ["red", "green", "blue", "yellow"]);
        }).toThrow('Colors and Accounts must have same length');
    });
});

describe('mergeArrays', () => {
    test.each([
        [
            new Map([
                ["1", [0, 0, 0, 0, 0, 0, 0, 0, 109, 0]],
                ["2", [0, 0, 0, 0, 0, 0, 0, 0, 0, 3708]]
            ]),
            [0, 0, 0, 0, 0, 0, 0, 0, 109, 3708]
        ],
        [
            new Map([
                ["1", [1, 2, 3]],
                ["2", [4, 5, 6]]
            ]),
            [5, 7, 9]
        ],
        [
            new Map([
                ["1", [0, 0, 0]],
                ["2", [0, 0, 0]]
            ]),
            [0, 0, 0]
        ],
        [
            new Map(),
            []
        ]
    ])('merges arrays with sum of elements', (accounts, expected) => {
        const result = mergeArrays(accounts);
        expect(result).toEqual(expected);
    });
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