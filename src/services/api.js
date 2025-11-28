// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.VUE_APP_API_BASE_URL ||
    "https://api-chat-bot.erpcpanel.com/api",
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const method = (config.method || "get").toLowerCase();

    // Không bao giờ gửi X-Session-Id (tránh preflight/CORS)
    if (config.headers) {
      delete config.headers["X-Session-Id"];
      delete config.headers["x-session-id"];
    }

    // GET: bỏ các header có thể kích hoạt preflight
    if (method === "get") {
      if (config.headers) {
        delete config.headers["Content-Type"];
        delete config.headers["X-Requested-With"];
      }
    } else {
      // Non-GET: đảm bảo JSON
      if (config.headers && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

export default api;
