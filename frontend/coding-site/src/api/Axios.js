import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8006",
});

// =======================
// REQUEST INTERCEPTOR
// =======================
api.interceptors.request.use(
  (config) => {
    // user login token
    const user = JSON.parse(localStorage.getItem("user"));

    // admin login token
    const adminToken = localStorage.getItem("adminToken");

    // pick whichever exists
    const token = user?.token || adminToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;

    // 🔴 Logout ONLY when JWT is expired / invalid
    if (status === 401 && !window.location.pathname.includes("login")) {
      console.warn("Session expired. Logging out.");

      localStorage.removeItem("user");
      localStorage.removeItem("adminToken");

      window.location.href = "/login";
    }

    // 🟡 403 = forbidden / role / API not ready
    // IMPORTANT: do nothing here
    if (status === 403) {
      console.warn("403 Forbidden – access denied");
    }

    return Promise.reject(err);
  }
);

export default api;
