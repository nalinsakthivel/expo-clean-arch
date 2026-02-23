import axios, { AxiosError, HttpStatusCode } from "axios";

export type AppErrorCode =
  | "NETWORK_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "BAD_REQUEST"
  | "CONFLICT"
  | "SERVER_ERROR"
  | "UNKNOWN_ERROR";

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly status?: number;
  readonly details?: unknown;

  constructor(
    message: string,
    code: AppErrorCode = "UNKNOWN_ERROR",
    status?: number,
    details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

const extractMessage = (data: unknown): string | undefined => {
  if (!data) return undefined;
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (typeof obj.message === "string") return obj.message;
    if (Array.isArray(obj.failures) && typeof obj.failures[0] === "string") {
      return obj.failures[0];
    }
    if (Array.isArray(obj.errors) && typeof obj.errors[0] === "string") {
      return obj.errors[0];
    }
  }
  return undefined;
};

export const toAppError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const serverMessage = extractMessage(axiosError.response?.data);

    if (!status) {
      return new AppError(
        serverMessage ?? "Network error. Please check your connection.",
        "NETWORK_ERROR",
        undefined,
        axiosError.response?.data,
      );
    }

    switch (status) {
      case HttpStatusCode.BadRequest:
        return new AppError(
          serverMessage ?? "Bad request.",
          "BAD_REQUEST",
          status,
          axiosError.response?.data,
        );
      case HttpStatusCode.Unauthorized:
        return new AppError(
          serverMessage ?? "Unauthorized request.",
          "UNAUTHORIZED",
          status,
          axiosError.response?.data,
        );
      case HttpStatusCode.Forbidden:
        return new AppError(
          serverMessage ?? "Forbidden request.",
          "FORBIDDEN",
          status,
          axiosError.response?.data,
        );
      case HttpStatusCode.NotFound:
        return new AppError(
          serverMessage ?? "Resource not found.",
          "NOT_FOUND",
          status,
          axiosError.response?.data,
        );
      case HttpStatusCode.Conflict:
        return new AppError(
          serverMessage ?? "Conflict error.",
          "CONFLICT",
          status,
          axiosError.response?.data,
        );
      default:
        return new AppError(
          serverMessage ?? "Unexpected server error.",
          "SERVER_ERROR",
          status,
          axiosError.response?.data,
        );
    }
  }

  if (error instanceof Error) {
    return new AppError(error.message, "UNKNOWN_ERROR");
  }

  return new AppError("Unknown error occurred.", "UNKNOWN_ERROR");
};

export const getErrorMessage = (error: unknown): string => toAppError(error).message;
