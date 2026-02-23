import { AxiosRequestConfig } from "axios";

export const checkNetworkConnection = async (): Promise<boolean> => {
  // Mocking network check, in real app use @react-native-community/netinfo
  return true;
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
