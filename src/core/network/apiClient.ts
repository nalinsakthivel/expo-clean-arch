import { env } from "@/core/config/env";
import { toAppError } from "@/core/errors/AppError";
import axios, { AxiosError, AxiosHeaders } from "axios";

type AuthTokenProvider = () => Promise<string> | string;
type UnauthorizedHandler = () => Promise<void> | void;

let authTokenProvider: AuthTokenProvider = () => "";
let unauthorizedHandler: UnauthorizedHandler | undefined;
let isHandlingUnauthorized = false;

export const setAuthTokenProvider = (provider: AuthTokenProvider): void => {
  authTokenProvider = provider;
};

export const setUnauthorizedHandler = (
  handler?: UnauthorizedHandler,
): void => {
  unauthorizedHandler = handler;
};

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await authTokenProvider();

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (
      (status === 401 || status === 403) &&
      unauthorizedHandler &&
      !isHandlingUnauthorized
    ) {
      isHandlingUnauthorized = true;
      try {
        await unauthorizedHandler();
      } finally {
        isHandlingUnauthorized = false;
      }
    }

    return Promise.reject(toAppError(error));
  },
);
