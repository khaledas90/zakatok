import React from "react";
import { AdminLayoutClient } from "@/app/[locale]/admin/_components/layout/AdminLayoutClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
