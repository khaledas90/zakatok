"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/store/services/usersService";
import { Eye } from "lucide-react";
import { format } from "date-fns";

interface ViewUserBtnProps {
  user: User;
  onEdit?: () => void;
}

const getStatusBadge = (status?: User["status"]) => {
  if (!status) return null;
  const variants = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    banned: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <Badge variant="outline" className={variants[status]}>
      {status}
    </Badge>
  );
};

const getRoleBadge = (role?: User["role"]) => {
  if (!role) return null;
  const variants = {
    admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    moderator: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    user: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };
  return (
    <Badge variant="outline" className={variants[role]}>
      {role}
    </Badge>
  );
};

const getUserDisplayName = (user: User) => {
  return user.fullName || user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown";
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

export function ViewUserBtn({ user, onEdit }: ViewUserBtnProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setOpen(false);
    onEdit?.();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="View user details"
      >
        <Eye className="h-4 w-4 text-green-500" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed information about {getUserDisplayName(user)}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={getUserAvatar(user)} />
                <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{getUserDisplayName(user)}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="grid gap-2">
              {user.firstName && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">First Name:</span>
                  <span className="text-sm">{user.firstName}</span>
                </div>
              )}
              {user.lastName && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Name:</span>
                  <span className="text-sm">{user.lastName}</span>
                </div>
              )}
              {user.source && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Source:</span>
                  <span className="text-sm capitalize">{user.source}</span>
                </div>
              )}
              {user.providerId && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Provider ID:</span>
                  <span className="text-sm font-mono text-xs">{user.providerId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Role:</span>
                <span>{getRoleBadge(user.role) || <span className="text-sm text-muted-foreground">N/A</span>}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Status:</span>
                <span>{getStatusBadge(user.status) || <span className="text-sm text-muted-foreground">N/A</span>}</span>
              </div>
              {user.createdAt && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Joined:</span>
                  <span className="text-sm">
                    {format(new Date(user.createdAt), "MMM dd, yyyy")}
                  </span>
                </div>
              )}
              {user.lastLogin && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last Login:
                  </span>
                  <span className="text-sm">
                    {format(new Date(user.lastLogin), "MMM dd, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            {onEdit && (
              <Button onClick={handleEdit}>Edit User</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

