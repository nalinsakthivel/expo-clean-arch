import { env } from '../config/env';
import { FetchArgs } from '@reduxjs/toolkit/query';
import * as Network from "expo-network";

export const checkNetworkConnection = async (): Promise<boolean> => {
  const networkState = await Network.getNetworkStateAsync();
  return (
    (networkState.isConnected && networkState.isInternetReachable) || false
  );
};

export const logCurlCommand = (args: string | FetchArgs) => {
  let url = '';
  let method = 'GET';
  let headers: Record<string, string> = {};
  let body: any = undefined;

  if (typeof args === 'string') {
    url = args;
  } else {
    url = args.url;
    method = args.method || 'GET';
    if (args.headers) {
      if (args.headers instanceof Headers) {
        args.headers.forEach((val, key) => { headers[key] = val; });
      } else {
        headers = args.headers as Record<string, string>;
      }
    }
    body = args.body;
  }

  // Prepend baseUrl if url is relative
  const fullUrl = url.startsWith('http') ? url : `${env.apiBaseUrl}${url}`;
  let curl = `curl -X ${method.toUpperCase()} "${fullUrl}"`;

  if (headers && Object.keys(headers).length > 0) {
    Object.keys(headers).forEach((key) => {
      curl += ` -H "${key}: ${headers[key]}"`;
    });
  }

  if (body) {
    curl += ` -d '${JSON.stringify(body)}'`;
  }

  console.log("CURL Command:\n", curl);
};
