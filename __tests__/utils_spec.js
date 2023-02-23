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


test("Seconds only", () => {
    expect(secondsToHHMMSS(22)).toBe("00:00:22");
});

test("Minutes:seconds", () => {
    expect(secondsToHHMMSS(300)).toBe("00:05:00");
});

test("Hours:Minutes:seconds", () => {
    expect(secondsToHHMMSS(3900)).toBe("01:05:00");
});