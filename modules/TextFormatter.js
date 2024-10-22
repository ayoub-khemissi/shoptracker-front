/**
 * @param {number} ms
 * @returns {string}
 * @description
 * Takes a number of milliseconds and converts it to a human-readable string.
 * If the input is not a number, it returns the input unchanged.
 * The output looks like this:
 * - Less than a second: "in a second"
 * - Less than a minute: "X seconds"
 * - Less than an hour: "X minutes"
 * - More than an hour: "X hours"
 * @example
 * convertMillisecondsToText(5000) // returns "in 5 seconds"
 */
export function convertMillisecondsToText(ms) {
  if (typeof ms !== "number") {
    return ms;
  }

  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;

  if (ms < second) {
    return "in a second";
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

/**
 * @param {number|string} price
 * @returns {string}
 * @description
 * Takes a number or a string, and returns a human-readable string.
 * The output is the number or string formatted as a price
 * with a comma as the decimal separator and spaces as the thousand separator.
 * @example
 * formatPrice(9.99) // returns "9,99"
 * formatPrice("9.99") // returns "9,99"
 */
export function formatPrice(price) {
  if (typeof price !== "number" && typeof price !== "string") {
    return price;
  }

  let [integerPart, decimalPart] = String(price).replace(".", ",").split(",");

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decimalPart ? `${integerPart},${decimalPart}` : integerPart;
}

/**
 * @param {string} str
 * @param {number} num
 * @returns {string}
 * @description
 * Takes a string and a number, and returns a new string.
 * If the length of the string is greater than the number, the output is the substring
 * from the start of the string to the number, followed by three dots.
 * If the length of the string is not greater than the number, the output is the string unchanged.
 * @example
 * truncateString("This is a very long string", 10) // returns "This is a..."
 */
export function truncateString(str, num) {
  if (typeof str !== "string") {
    return str;
  }

  return str.length > num ? str.slice(0, num) + "..." : str;
}

/**
 * @param {number} number
 * @returns {string}
 * @description
 * Takes a number and returns a human-readable string.
 * The output is the number formatted as a string with spaces as the thousand separator.
 * @example
 * formatNumberWithSpaces(1000) // returns "1 000"
 */
export function formatNumberWithSpaces(number) {
  if (typeof number !== "number") {
    return number;
  }

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
