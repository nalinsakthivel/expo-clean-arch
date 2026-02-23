import { container } from "@/core/di/container";
import { getErrorMessage } from "@/core/errors/AppError";
import { GetUserUseCase } from "@/domain/usecases/GetUserUseCase";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// ViewModels map Domain state to UI state and expose interactions/use cases
// Now using TanStack Query as per skills.md guidelines
export const useUserViewModel = (userId: string) => {
  const getUserUseCase = useMemo(() => container.resolve(GetUserUseCase), []);

  const {
    data: user,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserUseCase.execute(userId),
    enabled: !!userId,
  });

  return {
    user: user ?? null,
    loading,
    error: error ? getErrorMessage(error) : null,
  };
};
