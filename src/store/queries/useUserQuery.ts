import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  usersService,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ResetPasswordRequest,
  UserFilters,
} from "../services/usersService";
import type { QueryResponse } from "@/types/api";

export const useUsersQuery = (filters?: UserFilters) =>
  useQuery<QueryResponse<User[]>, Error>({
    queryKey: ["users", filters],
    queryFn: async () => {
      return await usersService.getAll(filters);
    },
  });

export const useUserQuery = (id: string) =>
  useQuery<User, Error>({
    queryKey: ["users", id],
    queryFn: async () => {
      return await usersService.getById(id);
    },
    enabled: Boolean(id),
  });

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateUserRequest) => usersService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUserRequest }) =>
      usersService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      queryClient.invalidateQueries({
        queryKey: ["users", variables.id],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ResetPasswordRequest;
    }) => usersService.resetPassword(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["users", variables.id],
      });
    },
  });
};

export const useBanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.ban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => usersService.unban(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
};
