export function formatTime(timeSeconds: number): string {
    const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor((timeSeconds % 3600) / 60);
    const seconds = (timeSeconds % 3600) % 60;
    return formatInDoubleDigit(hours.toString()) + ":" + formatInDoubleDigit(minutes.toString()) + ":" + formatInDoubleDigit(seconds.toString());
}

function formatInDoubleDigit(timeValue: string) {
    if (timeValue.length === 0) {
        return "00";
    } else if(timeValue.length === 1) {
        return "0" + timeValue;
    } else {
        return timeValue;
    }
}
