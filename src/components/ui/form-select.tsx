"use client";

import type React from "react";

import { forwardRef } from "react";
import { Label } from "@/components/ui/label";

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, required, options, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label className="text-[#202121] text-sm font-medium flex items-center gap-1">
          {label}
          {required && <span className="text-[#e52836]">*</span>}
        </Label>
        <select
          ref={ref}
          className={`w-full px-3 py-2 border rounded-md bg-white text-right transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? "border-[#e52836] focus:border-[#e52836] focus:ring-[#e52836]"
              : "border-[#d9d9d9] focus:border-[#2c7242] focus:ring-[#2c7242]"
          } ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-[#e52836] text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";
