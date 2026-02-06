const isDev = process.env.NODE_ENV === "development";

const logger = {
  info: (msg: string, data?: unknown) => console.log(`[INFO] ${msg}`, data ?? ""),
  warn: (msg: string, data?: unknown) => console.warn(`[WARN] ${msg}`, data ?? ""),
  error: (msg: string, data?: unknown) => console.error(`[ERROR] ${msg}`, data ?? ""),
  debug: (msg: string, data?: unknown) => {
    if (isDev) console.debug(`[DEBUG] ${msg}`, data ?? "");
  },
};

export default logger;
