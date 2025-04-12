/**
 * @param {string} base64String
 * @returns {Uint8Array}
 * @description
 * Converts a base64 string to a Uint8Array.
 * The output is the base64 string converted to a Uint8Array.
 * @example
 * urlBase64ToUint8Array("SGVsbG8gV29ybGQh") // returns Uint8Array(13) [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]
 */
export const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);

  // eslint-disable-next-line no-undef
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};
