import {
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
} from "../utils/Config";

const remoteApiUrl = `http${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "s" : ""}://${NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME}${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "" : `:${NEXT_PUBLIC_SHOPTRACKER_API_PORT}`}`;

/**
 * Make a request to the API.
 *
 * @param {string} path Path of the API route.
 * @param {"GET"|"POST"|"PUT"|"DELETE"} [method="GET"] HTTP request method.
 * @param {Object} [body=null] Request body.
 * @returns {Promise<Response>} A promise resolving the response object.
 * @throws {Error} If the request fails, the function throws an error.
 */
export const fetchData = async (path, method = "GET", body = null) => {
  try {
    const response = await fetch(remoteApiUrl + path, {
      method: method,
      body: body ? JSON.stringify(body) : null,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.status >= 500) {
      throw new Error(
        `Request failed: received a server error response with status ${response.status}.`,
      );
    }

    return response;
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
};

/**
 * Logout the user.
 *
 * @returns {Promise<boolean>} A promise resolving with the logout result.
 */
export const fetchLogout = async () => {
  const response = await fetchData("/logout", "POST");
  return response?.ok;
};
