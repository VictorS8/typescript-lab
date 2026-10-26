const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

const totalSeconds = 3725;

const hours = Math.floor(totalSeconds / SECONDS_PER_HOUR);
const minutes = Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
const seconds = totalSeconds % SECONDS_PER_MINUTE;

console.log(`${hours}h ${minutes}min ${seconds}s`);
