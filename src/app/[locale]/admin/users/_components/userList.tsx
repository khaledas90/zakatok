"use client";

import {
  GlobalTable,
  type TableRowData,
} from "@/app/[locale]/admin/_components/table/GlobalTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DeleteUserBtn } from "./DeleteUserBtn";
import { UpdateUserBtn } from "./UpdateUserBtn";
import { ViewUserBtn } from "./ViewUserBtn";
import { User } from "@/store/services/usersService";
import { format } from "date-fns";
import { useUsersQuery } from "@/store/queries/useUserQuery";
import { useForm, FormProvider, type UseFormReturn } from "react-hook-form";
import type { BasePageInputs } from "@/types/common";
import { useEffect, useState } from "react";
import UserHeader from "./userHeader";

export interface UserPageInputs extends BasePageInputs {
  search: string;
  status: string | null;
  role: string | null;
}

export default function UserList() {
  const userPageInputs = useForm<UserPageInputs>({
    defaultValues: {
      page: 1,
      size: 10,
      search: "",
      status: null as string | null,
      role: null as string | null,
      sort: "id,desc",
    },
  });
  const { watch, setValue } = userPageInputs;

  const searchValue = watch("search");
  const statusValue = watch("status");
  const roleValue = watch("role");

  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setValue("page", 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, setValue]);

  useEffect(() => {
    setValue("page", 1);
  }, [statusValue, roleValue, setValue]);

  const apiFilters = {
    page: watch("page") || 1,
    size: watch("size") || 10,
    search: debouncedSearch,
    sort: watch("sort") || "id,desc",
    status: statusValue,
    role: roleValue,
  };

  const { data, isLoading, isError } = useUsersQuery(apiFilters);

  const getUserDisplayName = (user: User) => {
    return (
      user.fullName ||
      user.name ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      "Unknown"
    );
  };

  const getUserAvatar = (user: User) => {
    return user.profilePictureUrl || user.avatar || undefined;
  };

  const getUserInitials = (user: User) => {
    const name = getUserDisplayName(user);
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const headerCells: Omit<TableRowData, "id"> = {
    fullName: "User",
    email: "Email",
    source: "Source",
    createdAt: "Joined",
    actions: "actions",
  };

  const rows: TableRowData[] =
    data?.content.map((user) => ({
      id: user.id.toString(),
      fullName: (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={getUserAvatar(user)} />
            <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{getUserDisplayName(user)}</span>
        </div>
      ),
      email: <span className="text-muted-foreground">{user.email}</span>,
      source: (
        <span className="text-muted-foreground">
          {user.source ? (
            <Badge variant="outline" className="capitalize">
              {user.source}
            </Badge>
          ) : (
            "N/A"
          )}
        </span>
      ),

      createdAt: (
        <span className="text-muted-foreground">
          {user.createdAt
            ? format(new Date(user.createdAt), "MMM dd, yyyy")
            : "N/A"}
        </span>
      ),
      actions: (
        <div className="flex items-center gap-1">
          <ViewUserBtn user={user} />
          <UpdateUserBtn user={user} />
          <DeleteUserBtn user={user} />
        </div>
      ),
    })) || [];

  return (
    <FormProvider {...userPageInputs}>
      <div className="space-y-6">
        <UserHeader />
        <div className="rounded-md py-2 px-2 border overflow-hidden">
          <GlobalTable
            headerCells={headerCells}
            rows={rows}
            isLoading={isLoading}
            basePageInputs={
              userPageInputs as unknown as UseFormReturn<
                UserPageInputs,
                unknown,
                undefined
              >
            }
            error={isError ? "Failed to load users" : undefined}
            page={watch("page")}
            meta={data?.page}
            setPage={(page) => setValue("page", page)}
            setSize={(size) => setValue("size", size)}
            emptyMessage="No users found"
          />
        </div>
      </div>
    </FormProvider>
  );
}
