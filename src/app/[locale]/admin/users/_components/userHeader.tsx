"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { UserPageInputs } from "./userList";

export default function UserHeader() {
  const form = useFormContext<UserPageInputs>();
  const searchQuery = form.watch("search") || "";
  const statusFilter = form.watch("status");
  const roleFilter = form.watch("role");

  const displayStatus = statusFilter || "all";
  const displayRole = roleFilter || "all";

  const onStatusFilterChange = (value: string) => {
    form.setValue("status", value === "all" ? null : value);
    form.setValue("page", 1);
  };

  const onRoleFilterChange = (value: string) => {
    form.setValue("role", value === "all" ? null : value);
    form.setValue("page", 1);
  };

  return (
    <div className="flex md:flex-row flex-col w-full gap-4">
      <div className="relative flex-1 w-full min-w-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search users by name or email..."
          value={searchQuery}
          onChange={(e) => {
            form.setValue("search", e.target.value);
          }}
          className="pl-9 w-full"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 md:w-auto w-full md:flex-shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-auto justify-start",
                "sm:min-w-[140px]"
              )}
            >
              <Filter className="mr-2 h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Status: </span>
              <span className="capitalize">
                {displayStatus === "all" ? "All" : displayStatus}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange("active")}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange("inactive")}>
              Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusFilterChange("banned")}>
              Banned
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-auto justify-start",
                "sm:min-w-[140px]"
              )}
            >
              <Filter className="mr-2 h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Role: </span>
              <span className="capitalize">
                {displayRole === "all" ? "All" : displayRole}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem onClick={() => onRoleFilterChange("all")}>
              All
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleFilterChange("admin")}>
              Admin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleFilterChange("moderator")}>
              Moderator
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRoleFilterChange("user")}>
              User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
