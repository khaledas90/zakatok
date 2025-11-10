"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Link } from "@/i18n/routing";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, FileText, LogOut } from "lucide-react";

export function UserMenuClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => { 
    const checkAuth = () => {
      if (typeof window === "undefined") return;
       
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));
      // Also check localStorage as fallback
      const localToken = localStorage.getItem("token");
      const hasToken = !!token || !!localToken;
      setIsLoggedIn(hasToken);
    };

    if (mounted) {
      checkAuth();
      
      // Listen for storage changes
      const handleStorageChange = () => checkAuth();
      window.addEventListener("storage", handleStorageChange);
      
      // Check periodically (but less frequently)
      const interval = setInterval(checkAuth, 2000);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [mounted, pathname]);

  const handleLogout = () => {
    // Clear auth tokens
    if (typeof window !== "undefined") {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("token");
    }
    setIsLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Only show menu if logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full hover:bg-gray-100"
        >
          <Avatar className="h-10 w-10 border-2 border-[#2c7242]">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
            <AvatarFallback className="bg-[#2c7242] text-white">U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User Account</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/news" className="flex items-center cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>My News</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 cursor-pointer focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

