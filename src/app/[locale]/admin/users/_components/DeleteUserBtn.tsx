"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "@/store/services/usersService";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useDeleteUser } from "@/store/queries/useUserQuery";

interface DeleteUserBtnProps {
  user: User;
  onSuccess?: () => void;
}

export function DeleteUserBtn({ user, onSuccess }: DeleteUserBtnProps) {
  const { toast } = useToast();
  const deleteUserMutation = useDeleteUser();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteUserMutation.mutateAsync(user.id);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      handleClose();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Delete user"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone This will permanently delete the user{" "}
              <strong>
                {user.fullName ||
                  user.name ||
                  `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                  "this user"}
              </strong>{" "}
              and all associated data
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteUserMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteUserMutation.isPending}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteUserMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
