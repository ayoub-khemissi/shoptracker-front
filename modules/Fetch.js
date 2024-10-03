import {
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
} from "../utils/Config";

const apiUrl = `http${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "s" : ""}://${NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME}${NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE ? "" : `:${NEXT_PUBLIC_SHOPTRACKER_API_PORT}`}`;

export const fetchData = async (path, method = "GET", body = null, authentified = false) => {
  try {
    const response = await fetch(apiUrl + path, {
      method: method,
      body: body ? JSON.stringify(body) : null,
      headers: { "Content-Type": "application/json" },
      credentials: authentified ? "include" : "omit",
    });

    if (response.status === 401) {
      await fetchLogout();
    }

    return response;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const fetchLogout = async () => {
  await fetch(apiUrl + "/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
