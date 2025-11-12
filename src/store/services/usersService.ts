import { mainApi } from "../api";
import type { QueryResponse } from "@/types/api";

export interface User {
  id: string;
  email: string;
  providerId?: string;
  source?: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  role?: "admin" | "user" | "moderator";
  status?: "active" | "inactive" | "banned";
  createdAt?: string;
  lastLogin?: string;
  name?: string;
  avatar?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "moderator";
  status?: "active" | "inactive" | "banned";
}

export interface UpdateUserRequest {
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
}

export interface ResetPasswordRequest {
  newPassword: string;
}

export interface UserFilters {
  page?: number;
  size?: number;
  search?: string;
  sort?: string;
  status?: string | null;
  role?: string | null;
}

export const usersService = {
  getAll: async (filters?: UserFilters): Promise<QueryResponse<User[]>> => {
    const params = new URLSearchParams();
    const queryString = params.toString();
    const url = `/api/admin/customers${queryString ? `?${queryString}` : ""}`;
    const { data } = await mainApi.get<QueryResponse<User[]>>(url);
    return data;
  },

  getById: async (id: string): Promise<User> => {
    const { data } = await mainApi.get<User>(`/api/admin/customers/${id}`);
    return data;
  },

  create: async (payload: CreateUserRequest): Promise<User> => {
    const { data } = await mainApi.post<User>("/api/admin/customers/", payload);
    return data;
  },

  update: async (id: string, payload: UpdateUserRequest): Promise<User> => {
    const { data } = await mainApi.put<User>(
      `/api/admin/customers/${id}`,
      payload
    );
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await mainApi.delete(`/api/admin/customers/${id}`);
  },

  resetPassword: async (
    id: string,
    payload: ResetPasswordRequest
  ): Promise<void> => {
    await mainApi.post(`/api/admin/customers/${id}/reset-password`, payload);
  },

  ban: async (id: string): Promise<User> => {
    const { data } = await mainApi.post<User>(`/api/admin/customers/${id}/ban`);
    return data;
  },

  unban: async (id: string): Promise<User> => {
    const { data } = await mainApi.post<User>(
      `/api/admin/customers/${id}/unban`
    );
    return data;
  },
};
