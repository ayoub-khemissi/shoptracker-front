export function convertMilliseconds(ms) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;

  if (ms < second) {
    return "less than a second";
  } else if (ms < minute) {
    let seconds = Math.floor(ms / second);
    return seconds + (seconds === 1 ? " second" : " seconds");
  } else if (ms < hour) {
    let minutes = Math.floor(ms / minute);
    return minutes + (minutes === 1 ? " minute" : " minutes");
  } else {
    let hours = Math.floor(ms / hour);
    return hours + (hours === 1 ? " hour" : " hours");
  }
}

export function formatMonthlyAnnuallyPrice(monthlyAnnually, price) {
  if (!price || price == 0) { return "0"; }
  const annuallyCalc = Math.round(price * 12 * 0.75) - 0.01;

  return String(monthlyAnnually ? annuallyCalc : price).replace(".", ",");
}