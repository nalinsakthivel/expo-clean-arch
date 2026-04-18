import { env } from "@/core/config/env";
import { AppError } from "@/core/errors/AppError";
import { LocalStore } from "@/data/storage/LocalStore";
import { resetTo } from "@/presentation/navigation/RootNavigation";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { MyConstants } from "../constants/MyConstants";
import { DeviceInfoUtils } from "../utils/DeviceInfoUtils";
import { checkNetworkConnection, logCurlCommand } from "../utils/NetworkUtils";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBaseUrl,
  prepareHeaders: async (headers) => {
    const isNetworkConnected = await checkNetworkConnection();
    if (!isNetworkConnected) {
      throw new AppError("No network connection", "NETWORK_ERROR");
    }

    const token = await LocalStore.getToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    headers.set("Content-Type", "application/json");
    headers.set("Cache-Control", "no-cache");
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");
    return headers;
  },

  timeout: MyConstants.API_TIMEOUT,
});

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (DeviceInfoUtils.isDevMode()) {
    logCurlCommand(args);
  }

  let result = await rawBaseQuery(args, api, extraOptions);

  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 403)
  ) {
    try {
      await LocalStore.clearAll();
    } catch {
      // Intentionally ignored
    }
    setTimeout(() => {
      resetTo("/");
    }, 0);
  }

  return result;
};
