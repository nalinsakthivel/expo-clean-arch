import { AxiosRequestConfig } from "axios";
import * as Network from "expo-network";

export const checkNetworkConnection = async (): Promise<boolean> => {
  const networkState = await Network.getNetworkStateAsync();
  return (
    (networkState.isConnected && networkState.isInternetReachable) || false
  );
};

export const logCurlCommand = (config: AxiosRequestConfig) => {
  if (!config.url) return;

  let curl = `curl -X ${config.method?.toUpperCase()} "${config.url}"`;

  if (config.headers) {
    Object.keys(config.headers).forEach((key) => {
      curl += ` -H "${key}: ${config.headers?.[key]}"`;
    });
  }

  if (config.data) {
    curl += ` -d '${JSON.stringify(config.data)}'`;
  }

  console.log("CURL Command:\n", curl);
};
