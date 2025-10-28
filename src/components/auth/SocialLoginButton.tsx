"use client";

import React from "react";

interface SocialLoginButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  bgColor: string;
}

export function SocialLoginButton({
  icon,
  label,
  onClick,
  bgColor,
}: SocialLoginButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full ${bgColor} text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-3 font-medium font-arabic`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
