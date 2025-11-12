"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, UpdateUserRequest } from "@/store/services/usersService";
import { UserForm } from "./UserForm";
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useUpdateUser } from "@/store/queries/useUserQuery";

interface UpdateUserBtnProps {
  user: User;
  onSuccess?: () => void;
}

export function UpdateUserBtn({ user, onSuccess }: UpdateUserBtnProps) {
  const { toast } = useToast();
  const updateUserMutation = useUpdateUser();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (data: UpdateUserRequest) => {
    try {
      await updateUserMutation.mutateAsync({
        id: user.id,
        payload: data,
      });
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      handleClose();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Edit user"
      >
        <Pencil className="h-4 w-4 text-blue-500" />
      </Button>

      <UserForm
        open={open}
        onOpenChange={setOpen}
        user={user}
        onSubmit={handleSubmit}
      />
    </>
  );
}
