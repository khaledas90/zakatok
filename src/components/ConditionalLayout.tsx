"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalLayoutProps {
  header: ReactNode;
  footer: ReactNode;
  scrollButtons: ReactNode;
  children: ReactNode;
}

export function ConditionalLayout({
  header,
  footer,
  scrollButtons,
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.includes("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      {children}
      {footer}
      {scrollButtons}
    </>
  );
}
